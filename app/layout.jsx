"use client";

import "./globals.css";
import Provider from "./Provider";
import { Quicksand } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "600"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "736e3c17-35ed-4cf9-a2b7-bd58f727c849",
    });
  });

    return () => {
      window.OneSignalDeferred = undefined;
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
      </head>
      <body style={quicksand.style}>
        <video
          id="bgVideo"
          src="https://res.cloudinary.com/andy-company/video/upload/v1714498186/bg_yjf9nj.mp4"
          autoPlay
          loop
          muted
        ></video>
        <Provider>
          <header className="sticky top-0 z-10 mb-5">
            <Navbar />
          </header>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
