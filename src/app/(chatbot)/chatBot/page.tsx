/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
// THÊM IMPORT: Thư viện để hiển thị Markdown
import ReactMarkdown from "react-markdown";

// Định nghĩa kiểu dữ liệu cho tin nhắn
type ChatMessage = { role: "user" | "assistant"; content: string };

// --- CÁC COMPONENT ICON (SVG) ---
const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const AssistantIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M19.97 10.49c.5-2.9-1.3-5.5-3.8-6.6-1.5-.6-3.1-.6-4.6 0-2.5 1.1-4.3 3.7-3.8 6.6.2 1.4.9 2.7 1.9 3.7.8.8 1.8 1.4 2.9 1.7 1 .3 2.1.3 3.1 0 1.1-.3 2.1-.9 2.9-1.7.9-1 1.6-2.3 1.9-3.7zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);
const StopIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M6 6h12v12H6z" />
  </svg>
);

// --- COMPONENT HIỂN THỊ TIN NHẮN ---
const ChatMessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";
  return (
    <div className={`mb-6 flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
          <AssistantIcon />
        </div>
      )}
      {/* SỬA ĐỔI CHÍNH: Hiển thị Markdown */}
      <div
        className={`prose dark:prose-invert max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm
          ${isUser
            ? "bg-sky-600 text-white rounded-br-none prose-strong:text-white prose-p:text-white"
            : "bg-white dark:bg-slate-800 dark:text-slate-100 rounded-bl-none"}`}
      >
        {message.content ? (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        ) : (
          <span className="w-1 h-4 bg-slate-400 inline-block animate-pulse rounded-sm" />
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

// --- COMPONENT TRANG CHATBOT CHÍNH ---
export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Chào bạn! Mình là chatbot AI của PASCS. Hãy hỏi mình bất kỳ điều gì 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    // SỬA LỖI LOGIC: Dùng biến `newMessages` để gửi đi lịch sử chat mới nhất
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantIndex = newMessages.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const aborter = new AbortController();
    setController(aborter);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        // SỬA LỖI LOGIC: Gửi đi `newMessages` thay vì `messages` cũ
        body: JSON.stringify({ history: newMessages, prompt: trimmed }),
        signal: aborter.signal,
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulatedResponse += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const next = [...prev];
          next[assistantIndex] = { role: "assistant", content: accumulatedResponse };
          return next;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = { role: "assistant", content: "⚠️ Đã xảy ra lỗi hoặc yêu cầu đã bị hủy." };
        return next;
      });
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const stop = () => {
    controller?.abort();
    setController(null);
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="p-4 border-b dark:border-slate-700 shadow-sm text-center">
        <h1 className="text-xl font-semibold">PASCS Chatbot</h1>
      </header>
      <div ref={viewportRef} className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 overflow-y-auto">
        {messages.map((m, i) => (
          <ChatMessageBubble key={i} message={m} />
        ))}
      </div>
      <div className="w-full max-w-4xl mx-auto p-4 md:p-6 border-t dark:border-slate-700">
        <form onSubmit={sendMessage} className="flex items-center gap-3">
          <input
            className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-sky-500 transition"
            placeholder="Hỏi chatbot bất cứ điều gì..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <button type="button" onClick={stop} className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-600 transition">
              <StopIcon />
            </button>
          ) : (
            <button type="submit" disabled={!input.trim()} className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-sky-700 transition">
              <SendIcon />
            </button>
          )}
        </form>
        <div className="mt-2 text-center text-xs text-slate-500">
          Gợi ý: “Viết một đoạn văn về tương lai của AI”, “Tạo công thức nấu ăn…”
        </div>
      </div>
    </div>
  );
}