"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Giả định bạn import component Sidebar từ đúng đường dẫn
import { ChatbotSidebar } from "./ui/ChatBotSideBar"; 
import { SidebarProvider, SidebarTrigger } from "@/shared/components/manager/ui/sidebar"; 

// Định nghĩa kiểu dữ liệu cho tin nhắn
type ChatMessage = { role: "user" | "assistant"; content: string };


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
      <div className={`mb-4 md:mb-6 flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
            <AssistantIcon />
          </div>
        )}
        <div
          className={`prose max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm border
            ${isUser
              ? "bg-red-600 text-white border-red-600 rounded-br-none prose-strong:text-white prose-p:text-white"
              : "bg-white/95 text-slate-900 rounded-bl-none border-red-100"}`}
        >
          {message.content ? (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          ) : (
            <span className="w-1 h-4 bg-red-300 inline-block animate-pulse rounded-sm" />
          )}
        </div>
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm">
            <UserIcon />
          </div>
        )}
      </div>
    );
};

// --- COMPONENT TRANG CHATBOT CHÍNH ---
export default function ChatbotPage() {
  const initialChat: ChatMessage[] = [
    {
      role: "assistant",
      content: "Chào bạn! Mình là chatbot AI của PASCS. Hãy hỏi mình bất kỳ điều gì 👋",
    },
  ];

  // State quản lý TẤT CẢ các cuộc trò chuyện
  const [allChats, setAllChats] = useState<ChatMessage[][]>([initialChat]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);

  // State cho input, loading, và abort controller
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);


  const currentMessages = useMemo(
    () => allChats[selectedChatIndex] || [],
    [allChats, selectedChatIndex]
  );
  

  // const allMessagesForSidebar = useMemo(() => allChats.flat(), [allChats]);


  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: "smooth" });
  }, [currentMessages]);


  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmedInput };
    const newMessagesForCurrentChat = [...currentMessages, userMessage];

    const newAllChats = [...allChats];
    newAllChats[selectedChatIndex] = newMessagesForCurrentChat;
    setAllChats(newAllChats);
    setInput("");
    setLoading(true);

    const assistantPlaceholderIndex = newMessagesForCurrentChat.length;
    newAllChats[selectedChatIndex] = [...newMessagesForCurrentChat, { role: "assistant", content: "" }];
    setAllChats([...newAllChats]);

    const aborter = new AbortController();
    setController(aborter);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          history: newMessagesForCurrentChat, 
          prompt: trimmedInput
        }),
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

        setAllChats((prevAllChats) => {
          const updatedAllChats = [...prevAllChats];
          const chatToUpdate = [...updatedAllChats[selectedChatIndex]];
          chatToUpdate[assistantPlaceholderIndex] = { role: "assistant", content: accumulatedResponse };
          updatedAllChats[selectedChatIndex] = chatToUpdate;
          return updatedAllChats;
        });
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setAllChats((prevAllChats) => {
          const updatedAllChats = [...prevAllChats];
          const chatToUpdate = [...updatedAllChats[selectedChatIndex]];
          chatToUpdate[assistantPlaceholderIndex] = { role: "assistant", content: " Đã xảy ra lỗi hoặc yêu cầu đã bị hủy." };
          updatedAllChats[selectedChatIndex] = chatToUpdate;
          return updatedAllChats;
        });
      }
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const stop = () => {
    controller?.abort();
  };
  
  const handleNewChat = () => {
    stop();
    setAllChats((prev) => [...prev, initialChat]);
    setSelectedChatIndex(allChats.length);
  };
  
  // const handleSelectChat = (index: number) => {
  //   stop();
  //   setSelectedChatIndex(index);
  // };
  
  // const handleDeleteChat = (indexToDelete: number) => {
  //   stop();
  //   if (allChats.length <= 1) {
  //       setAllChats([initialChat]);
  //       setSelectedChatIndex(0);
  //       return;
  //   }
    
  //   const newAllChats = allChats.filter((_, index) => index !== indexToDelete);
  //   setAllChats(newAllChats);

  //   if (selectedChatIndex === indexToDelete) {
  //       setSelectedChatIndex(Math.max(0, newAllChats.length - 1));
  //   } else if (selectedChatIndex > indexToDelete) {
  //       setSelectedChatIndex(selectedChatIndex - 1);
  //   }
  // };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-50">
        <ChatbotSidebar
          onNewChat={handleNewChat}
        />

        <div className="flex-1 flex flex-col h-screen">
          <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-red-200 flex-shrink-0">
          <SidebarTrigger />
            <div className="mx-auto w-full max-w-4xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg md:text-xl font-semibold text-red-700">PASCS Chatbot</h1>
                </div>
            </div>
          </header>

          <div className="relative flex-1 flex flex-col">
            <div className="pointer-events-none select-none absolute inset-0 z-0">
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="/assets/image/background/trong-dong.jpg" // Cập nhật đường dẫn ảnh của bạn
                  alt="Hình nền trống đồng"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-yellow-50/70" />
            </div>

            <div ref={viewportRef} className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-6 overflow-y-auto">
              {currentMessages.map((m, i) => (
                <ChatMessageBubble key={`${selectedChatIndex}-${i}`} message={m} />
              ))}
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 pb-5 flex-shrink-0">
              <form onSubmit={sendMessage} className="flex items-center gap-2 md:gap-3">
                <input
                  className="flex-1 rounded-2xl border border-red-300 bg-white/95 px-5 py-3 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-slate-400 shadow-sm"
                  placeholder="Hỏi chatbot bất cứ điều gì..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                {loading ? (
                  <button type="button" onClick={stop} className="flex-shrink-0 w-12 h-12 rounded-xl bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition shadow-sm">
                    <StopIcon />
                  </button>
                ) : (
                  <button type="submit" disabled={!input.trim()} className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-red-700 transition shadow-sm">
                    <SendIcon />
                  </button>
                )}
              </form>
              <div className="mt-2 text-center text-xs text-red-800/70">
                Gợi ý: Các giấy tờ cần thiết để làm thủ tục công chứng, Thủ tục đăng ký giấy kết hôn
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}