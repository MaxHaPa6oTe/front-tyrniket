import AppBar from "@/components/AppBar/AppBar";
import "./globals.css";
import Providers from "@/components/Providers";
import { Athiti } from 'next/font/google'
import React from "react";

export const metadata = {
  title: "Метроэлектротранс",
  description: "Сервис по просмотру проходов через турникет",
};

interface Props {
  children: React.ReactNode;
}

const srift = Athiti({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout(props: Props) {
  
  return (
    <html translate="no">
      <body className={srift.className}>
        <Providers>
          <header>
          <AppBar />
          </header>
          <main>
          {props.children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
