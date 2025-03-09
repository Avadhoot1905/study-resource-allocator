'use client';

import { useState } from "react";
import { Home, Calendar, Clock, Users, Grid, Share, Bolt, BarChart, Eye, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar";

const SidebarMenu = () => {
  const [selected, setSelected] = useState("Event Types");
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Bookings", icon: Calendar },
    { name: "Availability", icon: Clock },
    { name: "Team meetings", icon: Users }
  ];

  return (
    <div className="h-screen w-64 bg-black text-white p-4 flex flex-col gap-4">
      <Sidebar>
        <SidebarHeader className="flex items-center gap-2 translate-y-9 text-lg font-semibold">
          <span>Calandar</span>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-6 translate-y-10 mt-4">
          <SidebarGroup>
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selected === item.name ? "bg-gray-700" : "hover:bg-gray-200"
                }`}
                onClick={() => setSelected(item.name)}
              >
                <item.icon size={20} />
                {item.name}
              </div>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mt-auto -translate-y-10"> 
          <Card className="bg-gray-100 p-3">
            <h3 className="text-black text-sm font-semibold">Calandar</h3>
            <p className="text-gray-400 text-xs">User details</p>
            <button className="text-blue-400 text-xs cursor-pointer hover:text-blue-700 mt-2">Edit</button>
          </Card>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
