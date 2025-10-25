import axios from "axios";
import OpenAI from "openai";
import { ExpertsList } from "./Options";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

//  console.log("Loaded API Key:", process.env.OPEN_API_KEY ? "Found ✅" : "Missing ❌");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const AIModel = async (topic, coachingOption, lastTwoConversation) => {
  const option = ExpertsList.find((item) => item.name === coachingOption);

  if (!option) throw new Error("Invalid coaching option");

  const PROMPT = option.prompt.replace("{user_topic}", topic);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: PROMPT }, ...lastTwoConversation],
  });

  return completion.choices[0].message.content;
};

export const AIModelToGenerateFBandNotes = async (coachingOption, conversation) => {
  const option = ExpertsList.find((item) => item.name === coachingOption);
  const PROMPT = (option.summeryPrompt);

  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324:free",
    messages: [
      { role: "system", content: PROMPT }, 
       ...conversation],
  });
  return completion?.choices[0]?.message;
}

export const ConvertTextToSpeech = async (text, expertName) => {
  const expertToVoiceMap = {
    Joanna: "Joanna",   
    David: "Matthew",   
    Sallie: "Salli",    
  };

  const pollyVoiceId = expertToVoiceMap[expertName] || "Joanna"; // fallback

  const pollyClient = new PollyClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    },
  });

  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: "mp3",
    VoiceId: pollyVoiceId, 
  });

  try {
    const { AudioStream } = await pollyClient.send(command);
    const audioArrayBuffer = await AudioStream.transformToByteArray();
    const audioBlob = new Blob([audioArrayBuffer], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (e) {
    console.error("Polly error:", e);
  }
};
