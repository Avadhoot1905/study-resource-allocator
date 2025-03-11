"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Clock, Users, FileQuestion, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar";

const SidebarMenu = () => {
  const [selected, setSelected] = useState("Home");
  const router = useRouter();

  const menuItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "My Maps", icon: Map, path: "/maps" },
    { name: "Quizes", icon: FileQuestion, path: "/quizzes" },
    { name: "Chat", icon: Users, path: "/chat" },
    { name: "Pomodoro", icon: Clock, path: "/pomodoro" }
  ];

  return (
    <div className="h-screen flex-shrink-0 w-64 text-white p-4 flex flex-col gap-4 border-r">
      <Sidebar>
        <SidebarHeader className="flex items-center gap-2 translate-y-9 text-lg font-semibold">
          <span>study.ai</span>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-6 translate-y-10 mt-4">
          <SidebarGroup>
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selected === item.name ? "bg-gray-100" : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelected(item.name);
                  router.push(item.path); // Navigate to the respective page
                }}
              >
                <item.icon size={20} />
                {item.name}
              </div>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto -translate-y-10"> 
          <Card className="bg-gray-100 p-3">
            <h3 className="text-black text-sm font-semibold">study.ai</h3>
            <p className="text-gray-400 text-xs">User details</p>
            <button className="text-blue-400 text-xs cursor-pointer hover:text-blue-700 mt-2">Edit</button>
          </Card>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;