"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/shared/components/manager/ui/sidebar";

// Định nghĩa lại Props, giờ chỉ cần `onNewChat`
interface ChatbotSidebarProps {
  onNewChat: () => void;
}

// Giữ lại các Icon cần thiết
const PlusIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MessageIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const ChatbotSidebarContent: React.FC<ChatbotSidebarProps> = ({
  onNewChat,
}) => {
  return (
        <Sidebar className="bg-yellow-50/80 backdrop-blur-xl border-red-200/60">
         <SidebarHeader 
           className="
        p-4 
        bg-white/50 
        backdrop-blur-sm 
        border-b border-red-200/60"
         >
        <div className="flex items-center gap-3">
         <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-md text-white">
            <MessageIcon />
          </div>
             <h2 className="text-lg font-bold text-red-800">PASCS Chat</h2>
         </div>
      </SidebarHeader>

      <SidebarContent>

        <div className="p-2 flex justify-center">
          <button
            onClick={onNewChat}
            className="inline-flex items-center justify-center gap-2 
                       px-3.5 py-2.5 bg-red-600 text-white rounded-lg 
                       hover:bg-red-700 transition-colors font-medium shadow-sm 
                       hover:shadow-md transform hover:-translate-y-0.5">
         <PlusIcon />
         <span className="text-sm">Cuộc trò chuyện mới</span>
           </button>
        </div>

        <div className="px-2 mt-4 flex-1">
          <div className="text-center py-8 px-4 h-full flex flex-col justify-center items-center bg-yellow-100/40 rounded-lg border border-dashed border-yellow-300/80">
            <div className="w-16 h-16 mb-4 rounded-full bg-yellow-200/70 flex items-center justify-center text-yellow-700">
              <MessageIcon />
            </div>
            <p className="text-yellow-800/90 text-sm font-medium">Lịch sử trò chuyện</p>
            <p className="text-yellow-700/80 text-xs mt-1">
              Các cuộc hội thoại của bạn sẽ được hiển thị ở đây.
            </p>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter
      className="
      p-4 
      bg-white/50 
      backdrop-blur-sm 
      border-b border-red-200/60">

        <div className="flex items-center gap-3 p-3 bg-red-50/50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">P</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">PASCS AI</p>
            <p className="text-xs text-slate-500">Trợ lý ảo thông minh</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export const ChatbotSidebar: React.FC<ChatbotSidebarProps> = (props) => {
  return <ChatbotSidebarContent {...props} />;
};