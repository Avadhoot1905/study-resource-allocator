'use client';

import React from 'react';
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";

const recentlyViewedItems = [
  { title: "Math", date: "Today, 2:30 PM" },
  { title: "Physics", date: "Yesterday, 10:15 AM" },
  { title: "Chemistry", date: "2 days ago" },
  { title: "History", date: "Last week" }
];

const HomePage: React.FC = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <SidebarMenu />
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold mb-12">Welcome Back</h1>
                        
                        {/* Previously Viewed Section */}
                        <section className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Previously Viewed</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {recentlyViewedItems.map((item, index) => (
                                    <Card 
                                        key={index}
                                        className="transition-all hover:shadow-md hover:bg-gray-50 cursor-pointer"
                                    >
                                        <CardContent className="p-4">
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                        
                        {/* Quick Stats Section */}
                        <section className="mt-10">
                            <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="p-4 bg-blue-50">
                                    <CardContent>
                                        <h3 className="text-lg font-medium">Study Time</h3>
                                        <p className="text-3xl font-bold mt-2">3.5 hrs</p>
                                        <p className="text-sm text-gray-500 mt-1">This week</p>
                                    </CardContent>
                                </Card>
                                <Card className="p-4 bg-green-50">
                                    <CardContent>
                                        <h3 className="text-lg font-medium">Quiz Score</h3>
                                        <p className="text-3xl font-bold mt-2">85%</p>
                                        <p className="text-sm text-gray-500 mt-1">Average</p>
                                    </CardContent>
                                </Card>
                                <Card className="p-4 bg-purple-50">
                                    <CardContent>
                                        <h3 className="text-lg font-medium">Mind Maps</h3>
                                        <p className="text-3xl font-bold mt-2">7</p>
                                        <p className="text-sm text-gray-500 mt-1">Created</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default HomePage;