'use client';

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SidebarMenu />
        <div className="flex flex-col flex-1 max-w-2xl max mx-auto p-4 items-center justify-center">
          <Card className="w-full max-w-lg flex-1 overflow-auto p-6 space-y-2">
            <CardContent>
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet...</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className="p-3 bg-gray-100 rounded-lg text-center">
                    {msg}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <div className="mt-4 flex items-center gap-2 w-full max-w-lg">
            <Textarea
              className="flex-1 resize-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
