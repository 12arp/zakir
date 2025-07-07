"use client";
import { useEffect, useState } from "react";

// Global count configuration
const START_TIMESTAMP = new Date("2025-07-07T00:00:00Z").getTime(); // UTC
const BASE_COUNT = 5000;

// Stats array
const stats = [
  {
    count: 10000, // Only this will be dynamically updated
    label: "Customers we have served",
    icon: "/handshake.png",
    isDynamic: true,
  },
  {
    count: 97,
    label: "Of our clients recommend us",
    icon: "/thumbs-up.png",
    isDynamic: false,
  },
  {
    count: 35,
    label: "Years of meeting client needs",
    icon: "/biceps.png",
    isDynamic: false,
  },
];

// Live customer count calculation
const getLiveCount = () => {
  const now = Date.now();
  const elapsedMinutes = Math.floor((now - START_TIMESTAMP) / (1000 * 600));
  return BASE_COUNT + elapsedMinutes;
};

// Counter Component
const AnimatedCounter = ({ index }: { index: number }) => {
  const [count, setCount] = useState(BASE_COUNT);
  const [isVisible, setIsVisible] = useState(false);

  // Animate only the first (index 0) counter
  useEffect(() => {
    if (index !== 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById(`counter-${index}`);
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [index]);

  useEffect(() => {
    if (!isVisible || index !== 0) return;

    const finalCount = getLiveCount();
    const duration = 2000;
    const steps = 60;
    const increment = (finalCount - BASE_COUNT) / steps;
    let current = BASE_COUNT;
    let step = 0;

    const animation = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setCount(finalCount);
        clearInterval(animation);

        const liveTimer = setInterval(() => {
          setCount(getLiveCount());
        }, 60 * 1000);

        return () => clearInterval(liveTimer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(animation);
  }, [isVisible, index]);

  return (
    <div className="text-4xl font-bold text-green-600" id={`counter-${index}`}>
      {count}+
    </div>
  );
};

export const TestimonialSection = () => {
  return (
    <section className="pt-0 pb-16 mb-20 bg-white" id="testimonials">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8">
        Why Farmers Trust Sahu Metals
      </h2>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-6xl">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <img
                src={stat.icon}
                alt="stat-icon"
                className="w-8 h-8 object-contain"
              />
            </div>
            {stat.isDynamic ? (
              <AnimatedCounter index={index} />
            ) : (
              <div className="text-4xl font-bold text-green-600">
                {stat.count}+
              </div>
            )}
            <p className="mt-2 text-sm text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
