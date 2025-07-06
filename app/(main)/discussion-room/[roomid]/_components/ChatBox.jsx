"use client"

import { AIModelToGenerateFBandNotes } from "@/services/GlobalServices";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { AIModel } from "@/services/GlobalServices";
import { useRouter } from 'next/navigation';
import { Send } from "lucide-react";

function ChatBox({ conversation, onSendMessage, enableFeedbackNotes, coachingOption, discussionRoom }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const router = useRouter();

  const handleSend = () => {
    if (input.trim() !== "") {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const [loading, setLoading] = useState(false);
  const UpdateSummery = useMutation(api.DiscussionRoom.UpdateSummery);
  const { roomid } = useParams();

  const GenerateFeedbackNotes = async () => {
    setLoading(true);

    try {
      // Generate summary from conversation — you can replace this with your AI call
      const generatedSummary = await AIModel(
        discussionRoom.topic,
        discussionRoom.coachingOption,
        [
          { role: "system", content: "Generate a summary of the following conversation" },
          ...conversation,
        ]
      );

      await UpdateSummery({
        id: discussionRoom._id,
        summery: generatedSummary,
      });

      router.push(`/view-feedback/${discussionRoom._id}`);
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast.error("Failed to generate feedback. Try again.");
    }

    setLoading(false);
  };


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);


  return (
    <div className="bg-white/80 border border-indigo-100 backdrop-blur-md rounded-3xl shadow-xl p-4 animate-fade-in-up flex flex-col justify-between h-full min-h-[300px]">
      <div>
        <h2 className="text-lg font-semibold text-indigo-800 mb-4">
          Chat Section
        </h2>
        <div className="bg-gray-100 rounded-xl p-4 h-[48vh] text-sm text-gray-800 overflow-y-auto shadow-inner">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`p-2 mt-2 rounded-md max-w-[80%] ${item.role === "user"
                  ? "bg-purple-200 text-right"
                  : "bg-purple-600 text-white"
                  }`}
              >
                {item.content}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Box */}
      <div className="flex mt-4 items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question..."
          className="flex-1 px-4 py-2 border border-purple-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-800 hover:bg-purple-500 text-white px-4 py-2 rounded-xl shadow"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {!enableFeedbackNotes ? (
        <p className="text-xs text-gray-600 mt-4">
          💡 At the end of your conversation, feedback/notes will be automatically generated.
        </p>
      ) : (
        <Button
          onClick={GenerateFeedbackNotes}
          disabled={loading}
          className="mt-7 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition-all duration-300"
        >
          {loading && <LoaderCircle className="animate-spin mr-2" />}
          Generate Feedback/Notes
        </Button>
      )}

    </div>
  );
}

export default ChatBox;
