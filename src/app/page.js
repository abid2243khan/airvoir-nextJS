"use client";

import { useEffect, useState } from "react";

const contentArray = [
  {
    no: "01",
    title: "Access World-Class Raffles",
    content:
      "Use CapRelic tokens to enter raffles for premium items like supercars, yachts, and more. Your tokens unlock a world of exclusive prizes.",
  },
  {
    no: "02",
    title: "Burn to Win, Burn to Earn",
    content:
      "Every time tokens are used for a raffle, they are burned, reducing supply and creating scarcity that benefits all holders over time.",
  },
  {
    no: "03",
    title: "Stake for Exclusive Access",
    content:
      "Stake CapRelic tokens to gain access to exclusive raffles, reduced burn rates, and VIP perks, giving you a long-term edge.",
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  let scrollTimeout = null;
  let isScrolling = false;

  useEffect(() => {
    const handleWheel = (event) => {
        if (event.deltaY > 20 && !isScrolling) {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;  // Reset scroll state
                setCurrentStep(prev => (prev === contentArray.length - 1) ? 0 : prev + 1)
            }, 500);
        }else if (event.deltaY < -20 && !isScrolling) {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;  // Reset scroll state
                setCurrentStep(prev => (prev === 0) ? contentArray.length-1 : prev - 1)
            }, 500);
        }
    }

    document.addEventListener('wheel',handleWheel);

    return ()=>{
        document.removeEventListener('wheel', handleWheel);
    }
}, []);


  return (
    <div className="stepsWrapper">
      {contentArray?.map(({ no, title, content }, index) => (
        <StepContent
          key={no}
          content={content}
          isActive={index === currentStep}
          no={no}
          title={title}
        />
      ))}
    </div>
  );
}

function StepContent({ isActive, title, content, no }) {
  return (
    <div className={`stepContentWrapper ${isActive ? "active" : ""}`}>
      <span className="no">{no}</span>
      <div className="body">
        <span className="title">{title}</span>
        <span className="content">{content}</span>
      </div>
    </div>
  );
}
