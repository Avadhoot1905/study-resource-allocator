"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (message === "signin_required") {
      setShowPopup(true);
    }
  }, [message]);

//   const handleSignIn = async () => {
//     try {
//       await signIn("google");
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

  return (
    <div>
      {/* Popup for Sign-in Required Message
      {showPopup && (
        <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg z-50 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-4">You need to sign in to view this page.</p>
          <Button onClick={() => setShowPopup(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
            OK
          </Button>
        </div>
      )} */}


      <div className="max-w-6xl mx-auto flex justify-center">
        <NavBar
          className={`fixed top-0 transition-all duration-300 ${
            scrolled ? "bg-white/80 backdrop-blur-md shadow-md rounded-xl p-2" : "bg-transparent"
          }`}
        />
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-xl p-6 text-center bg-white shadow-lg rounded-lg">
          <p className="text-sm text-gray-500 mb-2">Cal.com launches v5.0</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The better way to schedule your meetings
          </h1>
          <p className="text-gray-600 mb-6">
            A fully customizable scheduling experience for individuals, businesses taking calls, and developers building scheduling platforms where users meet users.
          </p>

          <Button className="w-full bg-black text-white hover:bg-gray-800 mb-3">  
            Sign up with Google
          </Button>

          <Button variant="outline" className="w-full">
            Sign up with email
          </Button>
          <p className="text-xs text-gray-500 mt-3">No credit card required</p>
        </Card>
      </div>

      {/* New Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">With us, scheduling is easy</h2>
          <p className="text-gray-600 mt-2">
            Effortless scheduling for individuals, powerful solutions for fast-growing modern companies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex justify-center gap-6 mt-8 px-6">
          <Card className="w-1/3 p-6 bg-white shadow-md rounded-lg text-center">
            <span className="text-gray-500 text-sm font-bold">01</span>
            <h3 className="text-xl font-semibold mt-2">Get personalised study materials</h3>
            <p className="text-gray-600 mt-2">
              We'll handle all researching to find the best materials for you to study from.
            </p>
          </Card>

          <Card className="w-1/3 p-6 bg-white shadow-md rounded-lg text-center">
            <span className="text-gray-500 text-sm font-bold">02</span>
            <h3 className="text-xl font-semibold mt-2">Set your own study routes</h3>
            <p className="text-gray-600 mt-2">
              Roadmaps for all topics made by AIs for your convenience.
            </p>
          </Card>

          <Card className="w-1/3 p-6 bg-white shadow-md rounded-lg text-center">
            <span className="text-gray-500 text-sm font-bold">03</span>
            <h3 className="text-xl font-semibold mt-2">Create your own quizzes</h3>
            <p className="text-gray-600 mt-2">
              Practice made easier by self-assessment quizzes
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
