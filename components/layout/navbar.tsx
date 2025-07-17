"use client";
import { Menu, Phone, Languages, LogOut as LogoutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,//arpit yadav
} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { setTranslateCookie } from "@/lib/utils";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Product" },
  { href: "/about", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

const featureList: FeatureProps[] = [
  {
    title: "Quality Products",
    description: "Premium quality metal products for all your needs.",
  },
  {
    title: "Expert Service",
    description: "Professional service and support for all your requirements.",
  },
  {
    title: "Quick Delivery",
    description: "Fast and reliable delivery across the country.",
  },
];

const WHATSAPP_LINK = "https://wa.me/919829961487?text=I%20have%20enquiry";
const PHONE_NUMBER = "+919829961487";
const LOGO_PATH = "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png";
const WHATSAPP_ICON = "/wh491wad6-whatsapp-icon-logo-whatsapp-icon-whatsapp-logo-call-logo-instagram-logo-new.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClose = React.useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const googtransCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('googtrans='));
    setCurrentLang(googtransCookie ? 'hi' : 'en');
    setIsLoggedIn(document.cookie.includes('adminAuth=true'));
  }, []);

  const handleLogout = () => {
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    setTranslateCookie(newLang);
  };

  const renderNavigationLinks = (onClick?: () => void) => (
    routeList.map(({ href, label }) => (
      <Button
        key={href}
        asChild
        variant="ghost"
        className="justify-start text-base transition hover:translate-x-1"
        onClick={onClick}
      >
        <Link href={href}>{label}</Link>
      </Button>
    ))
  );

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 flex justify-between items-center px-4 py-2 shadow-sm sticky top-0 z-50">
        <Link
          href="/"
          className="font-bold text-lg flex items-center space-x-2 hover:scale-105 transition-transform md:ml-8 lg:ml-16"
        >
          <Image src={LOGO_PATH} alt="Sahu Metals Logo" width={36} height={36} className="rounded-lg" />
          <span className="text-foreground">Sahu Metals</span>
        </Link>

        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
            >
              <div className="flex flex-col h-full">
                <SheetHeader className="mb-4 ml-4">
                  <SheetTitle className="flex items-center">
                    <Link href="/" className="flex items-center" onClick={handleClose}>
                      <Image src={LOGO_PATH} alt="Sahu Metals Logo" width={36} height={36} className="rounded-lg" />
                      <span className="ml-2 font-semibold text-lg">Sahu Metals</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 px-4">
                  {renderNavigationLinks(handleClose)}
                </div>

                {isLoggedIn && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                    className="justify-start text-base text-destructive hover:text-destructive/90 hover:bg-destructive/10 mt-2"
                  >
                    <LogoutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>

              <div className="mt-auto border-t border-secondary">
                <div className="flex flex-col gap-2 p-4 md:pr-16 lg:pr-24">
                  <Link
                    href={WHATSAPP_LINK}
                    target="_blank"
                    className="flex items-center gap-2 text-sm hover:text-primary transition bg-muted/50 p-3 rounded-lg"
                  >
                    <Image
                      src={WHATSAPP_ICON}
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="rounded-md"
                    />
                    <span>WhatsApp Support</span>
                  </Link>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-2 text-sm hover:text-primary transition bg-muted/50 p-3 rounded-lg"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>

              <SheetFooter className="flex-col items-start p-4 border-t border-secondary">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="w-full justify-start"
                >
                  <Languages className="h-5 w-5 mr-2" />
                  {currentLang === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu className="hidden lg:block mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                  <Image
                    src={LOGO_PATH}
                    alt="Sahu Metals"
                    className="h-full w-full rounded-md object-cover"
                    width={600}
                    height={600}
                  />
                  <ul className="flex flex-col gap-2">
                    {featureList.map(({ title, description }) => (
                      <li
                        key={title}
                        className="rounded-md p-3 text-sm hover:bg-muted"
                      >
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          {title}
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          {description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {routeList.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="text-base px-2 text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-4 mr-16">
          <Link
            href={WHATSAPP_LINK}
            target="_blank"
            className="flex items-center gap-2 text-sm hover:text-primary transition bg-muted/50 p-3 rounded-lg"
          >
            <Image
              src={WHATSAPP_ICON}
              alt="WhatsApp"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span>WhatsApp Support</span>
          </Link>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 text-sm hover:text-primary transition bg-muted/50 p-3 rounded-lg"
          >
            <Phone className="h-5 w-5" />
            <span>Call Us</span>
          </a>
        </div>
      </header>

      <Button
        variant="secondary"
        size="sm"
        onClick={toggleLanguage}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
      >
        <Languages className="h-5 w-5" />
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </Button>

      <div id="google_translate_element" style={{ display: 'none' }} />
    </>
  );
};
