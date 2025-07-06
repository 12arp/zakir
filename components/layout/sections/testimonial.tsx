"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";//dynamic counter fgtrrtytr

interface ReviewProps {
  image: string;
  name: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png",
    name: "Ramesh Kumar",
    comment:
      "The tractor I bought from Sahu Metals is powerful and fuel-efficient. It has made ploughing my fields much easier and faster.",
    rating: 5.0,
  },
  {
    image: "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png",
    name: "Sunita Devi",
    comment:
      "The rotavator and seed drill are of excellent quality. The team guided me well and the equipment is easy to use.",
    rating: 4.9,
  },
  {
    image: "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png",
    name: "Ajay Singh",
    comment:
      "I am very happy with the after-sales service. The spare parts are genuine and delivered quickly.",
    rating: 4.8,
  },
];

const DynamicCounter = () => {
  const [count, setCount] = useState(500);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("testimonials");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const target = Math.floor(Math.random() * 501) + 500; // Random number between 500-1000
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 500;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  return <span className="text-primary">{count}+</span>;
};

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container pt-0 pb-24 sm:pt-0 sm:pb-32 mb-16 sm:mb-24">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear What Our <DynamicCounter /> Clients Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={review.image} alt={review.name} />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
