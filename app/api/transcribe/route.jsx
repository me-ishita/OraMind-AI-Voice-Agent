import { NextResponse } from "next/server";
import { SpeechClient } from "@google-cloud/speech";
import path from "path";
import { readFile } from "fs/promises";

export async function POST(req) {
  try {
    // Read audio buffer from incoming request
    const arrayBuffer = await req.arrayBuffer();
    const audioBytes = Buffer.from(arrayBuffer).toString("base64");

    // Ensure key file is accessible and read it safely
    const keyPath = path.join(process.cwd(), "credentials/ai-voice-agent.json");

    const client = new SpeechClient({ keyFilename: keyPath });

    // Call the Google Cloud Speech-to-Text API
    const [response] = await client.recognize({
      audio: { content: audioBytes },
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "en-US"
      }

    });

    const transcription = response.results
      .map(r => r.alternatives[0].transcript)
      .join(" ")
      .trim();

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("❌ Transcription failed:", error);
    return NextResponse.json(
      { error: error.message || "Transcription failed" },
      { status: 500 }
    );
  }
}
