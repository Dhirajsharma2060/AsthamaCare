import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: {
    content: string;
    severity?: string;
    resources?: { title: string; url: string }[];
  };
  isBot: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  // Function to convert URLs to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/bot-avatar.png" alt="Bot" />
          <AvatarFallback className="bg-gradient-to-br from-indian-green to-saffron">
            Bot
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3",
        isBot ? "bg-gray-100" : "bg-indian-green/10"
      )}>
        <div className="whitespace-pre-wrap">
          {renderTextWithLinks(message.content)}
        </div>
        <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
