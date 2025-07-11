import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import Image from "next/image";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Tractor",
    title: "Made in India",
    description:
      "Proudly manufactured in India, supporting local innovation and growth.",
  },
  {
    icon: "UserCheck",
    title: "Government Subsidy",
    description:
      "Our products are eligible for government subsidy, so you save more whenever you buy from us.",
  },
  {
    icon: "CreditCard",
    title: "Increased Efficiency",
    description:
      "Our equipment helps you get more done in less time, with less effort.",
  },
  {
    icon: "Wrench",
    title: "Improved Productivity",
    description:
      "Boost your agricultural output and maximize your harvest with our advanced solutions.",
  },
  {
    icon: "ShieldCheck",
    title: "ISI Marked",
    description:
      "Highest quality, tested and ISI marked for reliability and peace of mind.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container pt-4 pb-16 sm:pt-6 sm:pb-24 mb-16 sm:mb-24 bg-white">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Why Choose Sahu Metals?
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        We deliver quality, reliability, and service excellence for all your agricultural equipment needs.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4 group-hover:ring-primary/20 transition-all duration-300">
                  {icon === "Tractor" ? (
                    <Image
                      src="/made-in-india.webp"
                      alt="Made in India"
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  ) : icon === "UserCheck" ? (
                    <Image
                      src="/government-subsidy.jpg"
                      alt="Government Subsidy"
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  ) : icon === "CreditCard" ? (
                    <Image
                      src="/credit-card.jpg"
                      alt="Credit Card"
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  ) : icon === "ShieldCheck" ? (
                    <Image
                      src="/isi-mark.jpg"
                      alt="ISI Mark"
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  ) : icon === "Wrench" ? (
                    <Image
                      src="/wrench.jpg"
                      alt="Wrench"
                      width={64}
                      height={64}
                      className="object-contain rounded-full"
                    />
                  ) : (
                    <Icon
                      name={icon as keyof typeof icons}
                      size={24}
                      color="hsl(var(--primary))"
                      className="text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>

                <CardTitle className="group-hover:text-primary transition-colors duration-300 text-center w-full text-lg sm:text-2xl">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
