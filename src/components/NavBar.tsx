'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all ${isScrolled ? "bg-white shadow-md bg-opacity-90" : "bg-transparent"} ${className}`}
    >
      <div className="flex justify-between items-center w-full py-4 px-6">
        {/* Logo */}
        <div className="text-xl font-semibold">study.ai</div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6 text-sm font-medium text-gray-700">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Option 1
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Option 2
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Docs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      API
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-md rounded-md p-2">
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Community
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Pricing & Go to app button */}
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/home">Go to app</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
