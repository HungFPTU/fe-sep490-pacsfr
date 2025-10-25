// app/api/chat/route.ts
import { NextRequest } from "next/server"; // Thêm import NextRequest

export const runtime = "nodejs";

// --- Định nghĩa các kiểu dữ liệu để tránh 'any' ---
type ChatMessage = { role: "user" | "assistant"; content: string };

type ModelItem = {
  name: string;
  supportedGenerationMethods?: string[];
};

// Thêm kiểu cho các phần nội dung trả về từ Gemini
type GeminiPart = {
  text?: string;
};

// --- Phần code logic (giữ nguyên) ---
const PREFER = [
  "gemini-1.5-flash-8b-latest",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

async function listModels(apiKey: string) {
  for (const ver of ["v1", "v1beta"]) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/${ver}/models?key=${apiKey}`
    );
    if (res.ok) {
      const data = (await res.json()) as { models: ModelItem[] };
      return { version: ver, models: data.models || [] };
    }
  }
  throw new Error("Cannot list models via v1/v1beta");
}

function pickModel(models: ModelItem[]) {
  const byName = new Map(models.map((m) => [m.name, m]));
  for (const short of PREFER) {
    const full = `models/${short}`;
    if (byName.has(full)) return byName.get(full)!;
  }
  return (
    models.find((m) =>
      m.supportedGenerationMethods?.includes("generateContent")
    ) || models[0]
  );
}

function toContents(history: ChatMessage[], prompt: string) {
  return [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: prompt }] },
  ];
}

export async function GET() {
  return new Response("OK /api/chat", { status: 200 });
}

// --- HÀM POST ĐÃ SỬA LỖI ---
export async function POST(req: NextRequest) { // Sửa Request thành NextRequest
  try {
    const { history = [], prompt = "" }: { history?: ChatMessage[]; prompt?: string } = await req.json();
    if (!prompt) return new Response("Invalid 'prompt'", { status: 400 });

    const apiKey = "AIzaSyDEotv1pTlrNNHMwYAPvLmKKcMYZU63i6U";
    if (!apiKey) return new Response("Missing GEMINI_API_KEY", { status: 500 });

    const { version, models } = await listModels(apiKey);
    if (!models?.length)
      return new Response("No models available for this key", { status: 500 });

    const model = pickModel(models);
    const modelPath = model.name;
    const modelShort = model.name.replace(/^models\//, "");
    const supportsStream = model.supportedGenerationMethods?.includes("streamGenerateContent");

    const body = JSON.stringify({ contents: toContents(history, prompt) });

    if (supportsStream) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${version}/${modelPath}:streamGenerateContent?alt=sse&key=${apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body }
      );

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Gemini stream ${res.status}: ${errText || res.statusText}`);
      }

      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          const reader = res.body!.getReader();
          let buf = "";
          const push = (t: string) => t && controller.enqueue(encoder.encode(t));
          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              buf += decoder.decode(value, { stream: true });
              const lines = buf.split(/\r?\n/);
              buf = lines.pop() || "";
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                const json = line.slice(5).trim();
                if (!json || json === "[DONE]") continue;
                try {
                  const obj = JSON.parse(json);
                  const parts = obj?.candidates?.[0]?.content?.parts ?? [];
                  for (const p of parts) if (typeof p.text === "string") push(p.text);
                } catch { /* Bỏ qua lỗi parse JSON */ }
              }
            }
          } catch (e: unknown) { // SỬA ĐỔI: Dùng 'unknown' thay cho 'any'
            const error = e instanceof Error ? e : new Error(String(e));
            push(`\n[Stream error] ${error.message}`);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "x-gemini-model": modelShort, "x-gemini-api-version": version },
      });
    } else {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/${version}/${modelPath}:generateContent?key=${apiKey}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body }
      );

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          `Gemini ${res.status}: ${json?.error?.message ?? JSON.stringify(json) ?? res.statusText}`
        );
      }

      // SỬA ĐỔI: Dùng kiểu 'GeminiPart' đã định nghĩa
      const text = json?.candidates?.[0]?.content?.parts
        ?.map((p: GeminiPart) => p?.text || "")
        .join("") ?? "";

      return new Response(text || "[Empty response]", {
        headers: { "Content-Type": "text/plain; charset=utf-8", "x-gemini-model": modelShort, "x-gemini-api-version": version },
      });
    }
  } catch (e: unknown) { // SỬA ĐỔI: Dùng 'unknown' thay cho 'any'
    const error = e instanceof Error ? e : new Error(String(e));
    return new Response(
      `[Server] ${error.message}`,
      { status: 500 }
    );
  }
}