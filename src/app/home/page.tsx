'use client';

import React from 'react';
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const recentlyViewedItems = [
  { title: "Math", date: "Today, 2:30 PM" },
  { title: "Physics", date: "Yesterday, 10:15 AM" },
  { title: "Chemistry", date: "2 days ago" },
  { title: "History", date: "Last week" }
];

const HomePage: React.FC = () => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardHover = {
        rest: { scale: 1, y: 0 },
        hover: { 
            scale: 1.03, 
            y: -5,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
            }
        }
    };

    const statCardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i: number) => ({ 
            opacity: 1, 
            scale: 1,
            transition: { 
                delay: 0.3 + (i * 0.15),
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        })
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <SidebarMenu />
                <motion.main 
                    className="flex-1 p-6 overflow-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-4xl mx-auto">
                        <motion.h1 
                            className="text-4xl font-bold mb-12"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Welcome Back
                        </motion.h1>
                        
                        {/* Previously Viewed Section */}
                        <motion.section 
                            className="mt-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                        >
                            <motion.h2 
                                className="text-2xl font-semibold mb-4"
                                variants={fadeIn}
                                custom={0}
                            >
                                Previously Viewed
                            </motion.h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {recentlyViewedItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeIn}
                                        custom={index + 1}
                                        whileHover="hover"
                                        initial="rest"
                                    >
                                        <motion.div variants={cardHover}>
                                            <Card 
                                                className="transition-all hover:shadow-md hover:bg-gray-50 cursor-pointer"
                                            >
                                                <CardContent className="p-4">
                                                    <h3 className="font-medium">{item.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                        
                        {/* Quick Stats Section */}
                        <motion.section 
                            className="mt-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.h2 
                                className="text-2xl font-semibold mb-4"
                                variants={fadeIn}
                                custom={0}
                            >
                                Your Progress
                            </motion.h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { title: "Study Time", value: "3.5 hrs", subtitle: "This week", color: "bg-blue-50" },
                                    { title: "Quiz Score", value: "85%", subtitle: "Average", color: "bg-green-50" },
                                    { title: "Mind Maps", value: "7", subtitle: "Created", color: "bg-purple-50" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        variants={statCardVariants}
                                        custom={index}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        whileHover={{ 
                                            scale: 1.05,
                                            transition: { 
                                                type: "spring", 
                                                stiffness: 400, 
                                                damping: 17 
                                            }
                                        }}
                                    >
                                        <Card className={`p-4 ${stat.color}`}>
                                            <CardContent>
                                                <motion.h3 
                                                    className="text-lg font-medium"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                                >
                                                    {stat.title}
                                                </motion.h3>
                                                <motion.p 
                                                    className="text-3xl font-bold mt-2"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ 
                                                        delay: 0.7 + (index * 0.1),
                                                        type: "spring",
                                                        stiffness: 300
                                                    }}
                                                >
                                                    {stat.value}
                                                </motion.p>
                                                <motion.p 
                                                    className="text-sm text-gray-500 mt-1"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.9 + (index * 0.1) }}
                                                >
                                                    {stat.subtitle}
                                                </motion.p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </motion.main>
            </div>
        </SidebarProvider>
    );
};

export default HomePage;