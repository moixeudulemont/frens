import "./globals.css";
import Provider from "./Provider";
import { Quicksand } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "frens",
  description: "social web named frens :)",
  charset: "utf-8",
};

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "600"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
