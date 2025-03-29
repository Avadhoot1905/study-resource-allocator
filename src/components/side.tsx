"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Clock, Users, FileQuestion, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";

const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Menu items configuration
  const menuItems = [
    { name: "Home", icon: Home, path: "/home" },
    { name: "My Maps", icon: Map, path: "/maps" },
    { name: "Quizzes", icon: FileQuestion, path: "/quizzes" },
    { name: "Chat", icon: Users, path: "/chat" },
    { name: "Pomodoro", icon: Clock, path: "/pomodoro" }
  ];

  // Determine the selected item based on the current path
  const [selected, setSelected] = useState("");
  
  useEffect(() => {
    const currentPath = menuItems.find(item => pathname === item.path || pathname.startsWith(item.path + "/"));
    setSelected(currentPath?.name || "Home");
  }, [pathname]);

  // First-time animation flag - only animate on initial mount
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -64, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  // Handle navigation
  const handleNavigation = (path: string, name: string) => {
    setSelected(name);
    router.push(path);
  };

  return (
    <motion.div 
      className="h-screen flex-shrink-0 w-64 text-black p-4 flex flex-col gap-4 border-r"
      initial={hasAnimated ? "visible" : "hidden"}
      animate="visible"
      variants={sidebarVariants}
    >
      <Sidebar>
        <SidebarHeader className="flex items-center gap-2 text-lg font-semibold">
          <motion.span variants={logoVariants}>study.ai</motion.span>
        </SidebarHeader>
        
        <SidebarContent className="flex flex-col gap-6 mt-10">
          <SidebarGroup>
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                className="mb-1"
                initial={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  delay: hasAnimated ? 0 : 0.1 * menuItems.indexOf(item)
                }}
              >
                <motion.div
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all relative ${
                    selected === item.name ? "bg-blue-50 font-medium text-blue-600" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.path, item.name)}
                  whileHover={{ backgroundColor: selected === item.name ? "rgba(219, 234, 254, 0.8)" : "rgba(243, 244, 246, 0.8)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={selected === item.name ? "text-blue-600" : "text-gray-500"}
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <span>{item.name}</span>
                  
                  {/* Conditional pill indicator instead of line */}
                  {selected === item.name && (
                    <motion.div
                      className="absolute right-2 h-2 w-2 rounded-full bg-blue-600"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto"> 
          <motion.div
            initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: hasAnimated ? 0 : 0.6,
              duration: 0.5
            }}
          >
            <motion.div
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Card className="bg-gray-100 p-3">
                <h3 className="text-black text-sm font-semibold">study.ai</h3>
                <p className="text-gray-400 text-xs">User details</p>
                <motion.button 
                  className="text-blue-400 text-xs cursor-pointer hover:text-blue-700 mt-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
              </Card>
            </motion.div>
          </motion.div>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  );
};

export default SidebarMenu;