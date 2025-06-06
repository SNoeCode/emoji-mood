"use client";

import React from "react";
import { useMoodContext } from "./MoodContext";
import StatisticsBar from "./StatisticsBar";
import type { StatusType } from "./StatisticsBar";

export default function Statistics() {
  const { entries } = useMoodContext();
  const total = entries.length; // Correct total of all entries

  // Define a type for moods
  type Mood = "Excellent" | "Good" | "Neutral" | "Sad" | "Very Sad";

  // Count each of the five moods
  const counts: Record<Mood, number> = {
    Excellent: 0,
    Good: 0,
    Neutral: 0,
    Sad: 0,
    "Very Sad": 0,
  };
  entries.forEach((e) => {
    counts[e.mood as Mood] = (counts[e.mood as Mood] || 0) + 1;
  });

  // Display order
  const ORDER: Mood[] = [
    "Excellent",
    "Good",
    "Neutral",
    "Sad",
    "Very Sad",
  ];

  // Map mood to status type
  const mapMoodToStatus = (m: Mood): StatusType => {
    switch (m) {
      case "Excellent":
        return "excellent";
      case "Good":
        return "good";
      case "Neutral":
        return "neutral";
      case "Sad":
        return "sad";
      case "Very Sad":
        return "verySad";
      default:
        return "neutral"; // Fallback for undefined values
    }
  };

  // Emoji for each mood
  const emojiMap: Record<Mood, string> = {
    Excellent: "😄",
    Good: "😊",
    Neutral: "😐",
    Sad: "😔",
    "Very Sad": "😢",
  };

  // Gradients for each status type
  const gradientMap: Record<string, string> = {
    excellent: "from-green-400 to-green-600",
    good: "from-blue-400 to-cyan-500",
    neutral: "from-yellow-400 to-orange-500",
    sad: "from-orange-400 to-red-500",
    verySad: "from-pink-400 to-pink-600",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
        Mood Statistics
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Overview of your mood patterns
      </p>

      <div className="space-y-6">
        {ORDER.map((moodKey) => {
          const count = counts[moodKey] || 0;
          const status: StatusType = mapMoodToStatus(moodKey);
          const gradient = gradientMap[status] || "from-gray-400 to-gray-600"; // Default fallback
          const pct = total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={moodKey} className="space-y-1">
              {/* Label + count on one line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{emojiMap[moodKey]}</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {moodKey}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {count} {count === 1 ? "time" : "times"}
                </div>
              </div>

              {/* The bar */}
              <StatisticsBar
                status={status}
                percentage={pct} // Correct computed percentage
                gradient={gradient} // Correct gradient classes
                animated={false}
                ariaLabel={`${moodKey} percentage`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}