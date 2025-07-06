"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
import Image from "next/image";

interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "Crown",
    name: "Acmebrand",
  },
  {
    icon: "Vegan",
    name: "Acmelogo",
  },
  {
    icon: "Ghost",
    name: "Acmesponsor",
  },
  {
    icon: "Puzzle",
    name: "Acmeipsum",
  },
  {
    icon: "Squirrel",
    name: "Acme",
  },
  {
    icon: "Cookie",
    name: "Accmee",
  },
  {
    icon: "Drama",
    name: "Acmetech",
  },
];

export const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="w-full flex justify-center items-center pt-8 md:pt-8 pb-8 mb-4 sm:mb-24"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="flex flex-row flex-nowrap justify-center items-center gap-2 sm:gap-6 md:gap-8 w-full max-w-4xl overflow-x-auto px-0 sm:px-1">
        <Image
          src="/ee0e326d-4353-4b9e-b9aa-402f71880b4f.png"
          alt="Badge 1"
          width={96}
          height={96}
          className="h-8 sm:h-12 md:h-16 lg:h-20 object-contain"
        />
        <Image
          src="/image.png"
          alt="Badge 2"
          width={96}
          height={96}
          className="h-8 sm:h-12 md:h-16 lg:h-20 object-contain"
        />
        <Image
          src="/imagecopy.png"
          alt="Badge 3"
          width={96}
          height={96}
          className="h-8 sm:h-12 md:h-16 lg:h-20 object-contain"
        />
        <Image
          src="/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png"
          alt="Badge 4"
          width={96}
          height={96}
          className="h-8 sm:h-12 md:h-16 lg:h-20 object-contain"
        />
      </div>
    </section>
  );
};
