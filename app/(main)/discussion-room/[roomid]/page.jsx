"use client";

import { api } from "@/convex/_generated/api";
import { CoachingExpert } from "@/services/Options";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AIModel,
  ConvertTextToSpeech,
  getToken
} from "@/services/GlobalServices";
import ChatBox from "./_components/ChatBox";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { CameraIcon } from '@heroicons/react/24/outline';

function DiscussionRoom() {
  const { roomid } = useParams();
  const discussionRoom = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const [enableMic, setEnableMic] = useState(false);
  const [expert, setExpert] = useState(null);
  const [transcribe, setTranscribe] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [enableFeedbackNotes, setEnableFeedbackNotes] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const UpdateConversation = useMutation(api.DiscussionRoom.UpdateConversation);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);


  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    let timeout;
    if (showWebcam) {
      timeout = setTimeout(() => setShowWebcam(false), 60000); // 60 seconds
    }
    return () => clearTimeout(timeout);
  }, [showWebcam]);

  const toggleWebcam = () => {
    setShowWebcam(prev => !prev);
  };

  useEffect(() => {
    if (discussionRoom) {
      const matchedExpert = CoachingExpert.find(
        (item) => item.name === discussionRoom.expertName
      );
      setExpert(matchedExpert);
    }
  }, [discussionRoom]);

  const startRecording = async () => {
    recordedChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = mediaRecorder;

    return new Promise((resolve) => {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        resolve(audioBlob);
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 2000); // auto-stop after 5 seconds (adjust if needed)
    });
  };

  const processUserSpeech = async () => {
    if (!isSessionActive) return;

    const audioBlob = await startRecording();

    const res = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "audio/webm",
      },
      body: audioBlob,
    });

    const data = await res.json();
    if (!res.ok || !data.transcription) {
      console.error("Transcription error:", data.error);
      return;
    }

    const userText = data.transcription;
    setTranscribe(""); // clear the live text
    setConversation((prev) => [...prev, { role: "user", content: userText }]);

    const aiResponse = await AIModel(
      discussionRoom.topic,
      discussionRoom.coachingOption,
      [...conversation.slice(-8), { role: "user", content: userText }]
    );

    const url = await ConvertTextToSpeech(aiResponse, discussionRoom.expertName);
    setAudioUrl(url);

    setConversation((prev) => [
      ...prev,
      { role: "assistant", content: aiResponse },
    ]);

    await UpdateConversation({
      id: discussionRoom._id,
      conversation: [
        ...conversation,
        { role: "user", content: userText },
        { role: "assistant", content: aiResponse },
      ],
    });

    if (isSessionActive) {
      setTimeout(processUserSpeech, 1000); // small pause before next mic start
    }
  };

  const connectToServer = async () => {
    setEnableMic(true);
    setLoading(true);
    toast('Connected...')

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });

    mediaRecorderRef.current.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const blob = new Blob([event.data], { type: "audio/webm" });

        const res = await fetch("/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "audio/webm" },
          body: blob,
        });

        const data = await res.json();
        if (!res.ok || !data.transcription) return;

        const audioUrl = await ConvertTextToSpeech(aiResponse, discussionRoom.expertName);
        setAudioUrl(audioUrl);
        setTranscribe(`🤖 ${discussionRoom.expertName}: ${aiResponse}`);
        setConversation((prev) => [...prev, { role: "assistant", content: aiResponse }]);

        const userText = data.transcription;
        setTranscribe(`🧑‍💻 You: ${userText}`);
        setConversation((prev) => [...prev, { role: "user", content: userText }]);

        const aiResponse = await AIModel(
          discussionRoom.topic,
          discussionRoom.coachingOption,
          [...conversation.slice(-8), { role: "user", content: userText }]
        );


        await UpdateConversation({
          id: discussionRoom._id,
          conversation: [
            ...conversation,
            { role: "user", content: userText },
            { role: "assistant", content: aiResponse }
          ]
        });
      }
    };

    // Start recording chunks every 2 seconds
    mediaRecorderRef.current.onstop = () => {
      if (enableMic) {
        mediaRecorderRef.current.start();
        setTimeout(() => {
          if (mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
          }
        }, 2000); // 2 seconds
      }
    };

    mediaRecorderRef.current.start();
    setTimeout(() => {
      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    }, 2000); // First chunk duration

    setLoading(false);
  };

  const disconnect = async () => {
    setEnableMic(false);
    toast('Disconnecetd...')
    setEnableFeedbackNotes(true);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };


  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    setConversation((prev) => [...prev, { role: "user", content: text }]);

    const aiResponse = await AIModel(
      discussionRoom.topic,
      discussionRoom.coachingOption,
      [...conversation.slice(-8), { role: "user", content: text }]
    );

    const url = await ConvertTextToSpeech(aiResponse, discussionRoom.expertName);
    setAudioUrl(url);

    setConversation((prev) => [
      ...prev,
      { role: "assistant", content: aiResponse },
    ]);

    await UpdateConversation({
      id: discussionRoom._id,
      conversation: [
        ...conversation,
        { role: "user", content: text },
        { role: "assistant", content: aiResponse },
      ],
    });
  };

  return (
    <div className="px-2 py-2 md:px-4 lg:px-6 bg-gradient-to-br from-purple-50 via-violet-100 to-indigo-50 rounded-xl shadow-sm w-fit max-w-full transition-all duration-500 ease-in-out">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-purple-800 tracking-wide animate-fade-in">
        {discussionRoom?.coachingOption || "Loading..."}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-10 mt-4">
        <div className="space-y-6 h-[65vh] flex flex-col justify-between">
          {/* Expert Card */}
          <div className="relative bg-white/80 backdrop-blur-md border border-purple-100 shadow-xl rounded-3xl p-6 flex flex-col items-center animate-fade-in-down">
            {expert?.avatar ? (
              <div className="relative w-[120px] h-[120px] rounded-full ring-4 ring-purple-300 shadow-lg animate-pulse hover:scale-105 transition-transform duration-300">
                <Image
                  src={expert.avatar}
                  alt={expert.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-[80px] h-[80px] rounded-full bg-gray-300 animate-pulse" />
            )}
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              {expert?.name || "Loading..."}
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              {discussionRoom?.topic || "No topic defined"}
            </p>
            <audio src={audioUrl} type="audio/mp3" autoPlay />

            <div className="absolute bottom-5 right-5 cursor-pointer" onClick={toggleWebcam}>
              {showWebcam ? (
                <Webcam
                  audio={false}
                  height={80}
                  width={120}
                  className="rounded-2xl shadow-md"
                />
              ) : (
                <div className="relative w-12 h-12">
                  {user?.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full border shadow"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.charAt(0) || 'G'}
                    </div>
                  )}

                  {/* Webcam icon overlay */}
                  <CameraIcon className="absolute top-0 right-0 w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-0.5" />
                </div>
              )}
            </div>
          </div>

          {/* Connect / Disconnect + Live Transcript */}
          <div className="flex flex-col items-center space-y-2">
            {transcribe && (
              <div className="bg-white/90 px-4 py-2 text-sm text-purple-800 rounded-xl shadow border border-purple-200 max-w-xs text-center">
                {transcribe}
              </div>
            )}

            {!enableMic ? (
              <Button
                onClick={connectToServer}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2"
              >
                {loading && <Loader2Icon className="animate-spin w-4 h-4" />}
                Connect
              </Button>
            ) : (
              <Button
                onClick={disconnect}
                disabled={loading}
                variant="destructive"
                className="flex items-center gap-2"
              >
                {loading && <Loader2Icon className="animate-spin w-4 h-4" />}
                Disconnect
              </Button>
            )}

            {!transcribe && (
              <p className="text-xs text-gray-500 italic">
                Start speaking to see live transcription...
              </p>
            )}
          </div>
        </div>

        {/* Chat Section */}
        <div>
          <ChatBox
            conversation={conversation}
            enableFeedbackNotes={enableFeedbackNotes}
            coachingOption={discussionRoom?.coachingOption}
            onSendMessage={handleSendMessage}
            discussionRoom={discussionRoom}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscussionRoom;
