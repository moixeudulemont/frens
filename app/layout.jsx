import "./globals.css";
import Provider from './Provider';
import { Quicksand } from 'next/font/google';
import Navbar from '@/components/Navbar';
import 'atropos/css';

export const metadata = {
  title: "frens",
  description: "social web named frens :)",
  charset: "utf-8"
};

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '600'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={quicksand.style}>
        <Provider>
        <header>
          <Navbar/>
        </header>
          {children}
        </Provider>
      </body>
    </html>
  );
}
