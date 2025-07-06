"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DESKTOP_IMAGES = [
  "/farm-equipment-3247630_1280.jpg",
  "/tractor-5102202_1280.jpg",
  "/harvester-3562476_1280.jpg",
  "/turnip-8266093_1280.jpg",
];

const MOBILE_IMAGES = [
  "/mobile-hero/1.jpg",
  "/mobile-hero/2.jpg",
  "/mobile-hero/3.jpg",
  "/mobile-hero/HD-wallpaper-farming-industrial-john-deere-tractor.jpg",
];

const TRANSITION_DURATION = 700;
const BACKGROUND_STYLE = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const HeroSection = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % DESKTOP_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section className="w-full min-h-screen relative overflow-hidden mb-4 md:mb-16 lg:mb-24">
      {/* Background Image - Desktop */}
      <div
        className="absolute inset-0 z-[-2] transition-all duration-700 hidden md:block -mt-3"
        style={{
          backgroundImage: `url(${DESKTOP_IMAGES[bgIndex]})`,
          ...BACKGROUND_STYLE,
        }}
      />

      {/* Background Image - Mobile */}
      <div
        className="absolute inset-0 z-[-2] transition-all duration-700 md:hidden -mt-3"
        style={{
          backgroundImage: `url(${MOBILE_IMAGES[bgIndex]})`,
          ...BACKGROUND_STYLE,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[-1] transition-opacity duration-700" />



      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="text-center lg:text-left space-y-8 w-full max-w-3xl pt-20 md:pt-0 md:mt-32">
          <div className="max-w-screen-md text-center lg:text-left text-2xl sm:text-3xl md:text-6xl font-bold">
            <h1 className="drop-shadow-lg text-white">
              Welcome to
              <span className="text-transparent px-2 bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text drop-shadow-lg">
                Sahu Metals
              </span>
              <br />Your trusted agriculture equipment manufacturer
            </h1>
          </div>

          <p className="max-w-screen-sm text-center lg:text-left text-base sm:text-lg md:text-xl text-white drop-shadow-md">
            We supply top quality tractors planters harvesters and more. We offer reliable sales leasing and maintenance for all your farming needs.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 text-center lg:text-left">
            <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link href="/products">
                Explore Equipment
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link href="#contact" target="_self">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
