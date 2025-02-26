"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/components/Message";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, currentResponse]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Save the previous response before any other state changes
    if (currentResponse) {
      setMessages(prev => [...prev, { role: 'bot', text: currentResponse }]);
    }

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setCurrentResponse("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Stream error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5);
            if (data === '[DONE]') {
              setMessages(prev => [...prev, { role: 'bot', text: currentResponse }]);
              setCurrentResponse("");
              break;
            }
            try {
              const { text } = JSON.parse(data);
              setCurrentResponse(prev => prev + text);
            } catch (e) {
              // Ignore JSON parse errors for [DONE] marker
              if (!data.includes('DONE')) {
                console.error('Error parsing chunk:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages(prev => [...prev, {
        role: "bot",
        text: "Sorry, I encountered an error. Please try again in a moment."
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
        <div className="h-[500px] overflow-y-auto border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))}
          {currentResponse && (
            <Message role="bot" text={currentResponse} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} loading={loading} />
      </div>
    </div>
  );
}