'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // For App Router (Next.js 13+)
// OR import { useRouter } from "next/router"; // For Pages Router (older Next.js)

const SubmitButton = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // Navigate to the quiz results page
    router.push('/quiz-results'); // Replace with your actual results page path
  };

  return (
    <Button 
      className="px-3 py-1 text-sm"
      onClick={handleSubmit}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;