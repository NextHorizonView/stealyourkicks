import localFont from "next/font/local";
import "./globals.css";
import AnimatedCursor from "react-animated-cursor";
import AuthContextProvider from "./lib/contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Steal Your Kicks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContextProvider>
          <AnimatedCursor
            innerSize={15}
            outerSize={20}
            color="0, 0, 0"
            outerAlpha={0.2}
            innerScale={0.5}
            outerScale={5}
          />
          {/* Your main content */}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
