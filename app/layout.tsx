import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahu Metals - Agricultural Equipment Manufacturer",
  description: "top quality rotavators planters harvesters and other farming machines with trusted sales and service across Kota, Rajasthan and North India.",
  icons: {
    icon: '/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png',
    apple: '/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png',
  },
  openGraph: {
    type: "website",
    url: "https://sahumetals.com/",
    title: "Sahu Metals - Agricultural Equipment Manufacturer",
    description: "top quality rotavators planters harvesters and other farming machines with trusted sales and service across Kota, Rajasthan and North India",
    images: [
      {
        url: "/61ee283f-278d-43e8-8c23-8e0cdbbc61d6.png",
        width: 1200,
        height: 630,
        alt: "Sahu Metals Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          .skiptranslate {
            display: none !important;
          }
          .goog-te-banner-frame {
            display: none !important;
          }
          .goog-te-menu-value:hover {
            text-decoration: none !important;
          }
          .goog-te-gadget {
            color: transparent !important;
          }
          .goog-te-gadget .goog-te-combo {
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            top: 0 !important;
          }
          .goog-tooltip {
            display: none !important;
          }
          .goog-tooltip:hover {
            display: none !important;
          }
          .goog-text-highlight {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .goog-te-spinner-pos {
            display: none !important;
          }
          .goog-te-spinner-animation {
            display: none !important;
          }
          .goog-te-spinner {
            display: none !important;
          }
          .goog-te-spinner-img {
            display: none !important;
          }
          .goog-te-balloon-frame {
            display: none !important;
          }
          .goog-te-balloon-frame:hover {
            display: none !important;
          }
          .goog-te-balloon-frame:active {
            display: none !important;
          }
          .goog-te-balloon-frame:focus {
            display: none !important;
          }
          .goog-te-balloon-frame:visited {
            display: none !important;
          }
          .goog-te-balloon-frame:link {
            display: none !important;
          }
          .goog-te-balloon-frame:before {
            display: none !important;
          }
          .goog-te-balloon-frame:after {
            display: none !important;
          }
          .goog-te-balloon-frame * {
            display: none !important;
          }
          .goog-te-balloon-frame *:hover {
            display: none !important;
          }
          .goog-te-balloon-frame *:active {
            display: none !important;
          }
          .goog-te-balloon-frame *:focus {
            display: none !important;
          }
          .goog-te-balloon-frame *:visited {
            display: none !important;
          }
          .goog-te-balloon-frame *:link {
            display: none !important;
          }
          .goog-te-balloon-frame *:before {
            display: none !important;
          }
          .goog-te-balloon-frame *:after {
            display: none !important;
          }
        `}</style>
        <Script
          id="google-translate"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </head>
      <body className={cn("min-h-screen bg-white", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
