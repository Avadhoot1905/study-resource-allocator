"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Popup for Sign-in Required Message */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg z-50 flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-4">You need to sign in to view this page.</p>
            <Button 
              onClick={() => setShowPopup(false)} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              OK
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NavBar
            className={`fixed top-0 transition-all duration-300 ${
              scrolled ? "bg-white/80 backdrop-blur-md shadow-md rounded-xl p-2" : "bg-transparent"
            }`}
          />
        </motion.div>
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full max-w-xl p-6"
        >
          <Card className="p-6 text-center bg-white shadow-lg rounded-lg overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.p 
                className="text-sm text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Cal.com launches v5.0
              </motion.p>
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                The better way to schedule your meetings
              </motion.h1>
              <motion.p 
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                A fully customizable scheduling experience for individuals, businesses taking calls, and developers building scheduling platforms where users meet users.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button onClick={handleSignIn} className="w-full bg-black text-white hover:bg-gray-800 mb-3">  
                    Sign up with Google
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full">
                    Sign up with email
                  </Button>
                </motion.div>
                <motion.p 
                  className="text-xs text-gray-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  No credit card required
                </motion.p>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* New Section */}
      <div className="bg-gray-100 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-gray-900">With us, scheduling is easy</h2>
          <p className="text-gray-600 mt-2">
            Effortless scheduling for individuals, powerful solutions for fast-growing modern companies.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 mt-8 px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div 
            className="w-full md:w-1/3 mb-4 md:mb-0"
            variants={fadeIn}
            whileHover="hover"
            initial="rest"
          >
            <motion.div variants={cardHover}>
              <Card className="p-6 bg-white shadow-md rounded-lg text-center h-full">
                <span className="text-gray-500 text-sm font-bold">01</span>
                <h3 className="text-xl font-semibold mt-2">Get personalised study materials</h3>
                <p className="text-gray-600 mt-2">
                  We'll handle all researching to find the best materials for you to study from.
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/3 mb-4 md:mb-0"
            variants={fadeIn}
            whileHover="hover"
            initial="rest"
          >
            <motion.div variants={cardHover}>
              <Card className="p-6 bg-white shadow-md rounded-lg text-center h-full">
                <span className="text-gray-500 text-sm font-bold">02</span>
                <h3 className="text-xl font-semibold mt-2">Set your own study routes</h3>
                <p className="text-gray-600 mt-2">
                  Roadmaps for all topics made by AIs for your convenience.
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/3"
            variants={fadeIn}
            whileHover="hover"
            initial="rest"
          >
            <motion.div variants={cardHover}>
              <Card className="p-6 bg-white shadow-md rounded-lg text-center h-full">
                <span className="text-gray-500 text-sm font-bold">03</span>
                <h3 className="text-xl font-semibold mt-2">Create your own quizzes</h3>
                <p className="text-gray-600 mt-2">
                  Practice made easier by self-assessment quizzes
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;