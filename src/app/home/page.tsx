'use client';

import React from 'react';
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";

const HomePage: React.FC = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <SidebarMenu />
                <div className="flex-1 p-6">
                    <h1 className="text-4xl font-bold translate-y-10">Welcome Back</h1>
                    {/* Add more content here */}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default HomePage;
