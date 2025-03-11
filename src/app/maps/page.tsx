'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";

const subjects = ["Math", "Science", "History", "Geography", "Computer Science", "Physics", "Chemistry"];

const MapsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <SidebarMenu />

        {/* Main Content */}
        <div className="flex flex-col items-center w-full p-6 mt-6 space-y-6">
          {/* If a subject is selected, show subject page */}
          {selectedSubject ? (
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-center">{selectedSubject}</h2>
              <p className="mt-4 text-center text-gray-600">This is the page for {selectedSubject}. You can add content specific to this subject here.</p>
              <Button className="mt-6 w-full" onClick={() => setSelectedSubject(null)}>Back to Subjects</Button>
            </div>
          ) : (
            <>
              {/* Centered Heading */}
              <h1 className="text-3xl font-bold text-center">Maps</h1>

              {/* Search Bar with Create New Button */}
              <div className="flex items-center gap-2 w-full max-w-lg">
                <Input type="text" placeholder="Search..." className="flex-1" />
                <Button> Create New + </Button>
              </div>

              {/* Subject Cards (Clickable to Open Individual Pages) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <Card
                    key={subject}
                    className="p-4 text-center shadow-md transition-all rounded-lg cursor-pointer hover:bg-gray-200 hover:shadow-lg active:scale-95"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <CardContent className="font-semibold">{subject}</CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MapsPage;
