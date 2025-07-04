"use client";
import React from "react";

import TrackerForm from "@/components/TrackerForm";

export default function Home(): React.ReactElement {
  return (
    <>
      <div className="space-y-8">
        <TrackerForm />
      </div>
      <div>
     
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {/* Add content here if needed */}
        </main>
      </div>
    </>
  );
}