'use client'
import AppBar from "@/components/AppBar/AppBar";
import "./globals.css";
import Providers from "@/components/Providers";
import { Open_Sans } from 'next/font/google'
import React from "react";

export const metadata = {
  title: "Метроэлектротранс",
  description: "Сервис по просмотру проходов через турникет",
};

interface Props {
  children: React.ReactNode;
}

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout(props: Props) {

 return (
    <html translate="no">
      <body className={openSans.className}>
        <Providers>
          <header>
          <AppBar />
          </header>
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
