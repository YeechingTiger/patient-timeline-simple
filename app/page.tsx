"use client"

// pages/timeline.js
import dynamic from 'next/dynamic';

// Dynamically import the Timeline component to avoid SSR issues
const TimelineComponent = dynamic(() => import('../components/Timeline'), {
  ssr: false,
});

const TimelinePage = () => {
  return (
    <div>
      <h1>Timeline</h1>
      <TimelineComponent />
    </div>
  );
};

export default TimelinePage;
