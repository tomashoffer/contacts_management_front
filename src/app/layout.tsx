import type { Metadata } from "next";
import Header from './components/Header';
import { Red_Hat_Display } from 'next/font/google';
import  { Providers } from '@/redux/providers'
import "./globals.css";



export const metadata: Metadata = {
  title: "Contacts Management App",
  description: "Next js app for manage contacts",
};

const redHatDisplay = Red_Hat_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={redHatDisplay.className}>
        <Header />
        <main className='container mx-auto'>
          <Providers>
            {children}  
          </Providers>
          </main>
      </body>
    </html>
  );
}
