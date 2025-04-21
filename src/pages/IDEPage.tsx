
import React from "react";
import Navbar from "@/components/Navbar";
// Footer import removed
import IDE from "@/components/IDE";

const IDEPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <main className="flex-1 flex justify-center items-start p-0 m-0">
        <div className="w-full max-w-5xl mx-auto mt-12">
          <IDE />
        </div>
      </main>
      {/* <Footer /> removed */}
    </div>
  );
};

export default IDEPage;
