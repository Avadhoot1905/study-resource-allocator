'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Button hover animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all ${
        isScrolled ? "bg-white shadow-md bg-opacity-90" : "bg-transparent"
      } ${className}`}
    >
      <motion.div 
        variants={contentVariants}
        className="flex justify-between items-center w-full py-4 px-6"
      >
        {/* Logo with animation */}
        <motion.div 
          variants={itemVariants}
          className="text-xl font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          study.ai
        </motion.div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6 text-sm font-medium text-gray-700">
            <motion.div variants={itemVariants}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                  <motion.ul 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Option 1
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Option 2
                      </Link>
                    </motion.li>
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
              </NavigationMenuItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                  <motion.ul 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Docs
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        API
                      </Link>
                    </motion.li>
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                  <motion.ul 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Blog
                      </Link>
                    </motion.li>
                    <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Community
                      </Link>
                    </motion.li>
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </motion.div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Pricing & Go to app button */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center space-x-4"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/home">Go to app</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;