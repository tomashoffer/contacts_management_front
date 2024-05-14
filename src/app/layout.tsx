import type { Metadata } from "next";
import Header from './components/Header';
import { Red_Hat_Display } from 'next/font/google';
import  { Providers } from '@/redux/providers'
import "./globals.css";
import { getSession } from "@/action";

export const metadata: Metadata = {
  title: "Contacts Management App",
  description: "Next js app for manage contacts",
};

const redHatDisplay = Red_Hat_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();
  const isLoggedIn = session.isLoggedIn;
  
  return (
          <Providers>
            <html lang='en'>
              <body className={redHatDisplay.className}>
                <Header isLoggedIn={isLoggedIn} />
                <main className='container mx-auto'>
                    {children}  
                  </main>
              </body>
            </html>
          </Providers>
  );
}
