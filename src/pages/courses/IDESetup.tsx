
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IDELesson from "@/components/courses/IDELesson";

const IDESetup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <IDELesson />
      </main>
      <Footer />
    </div>
  );
};

export default IDESetup;
