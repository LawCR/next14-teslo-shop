import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/config/fonts';
import Script from 'next/script';
import Providers from './Providers';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description:
    'Tienda de todo tipo de productos, desde electrónicos hasta ropa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <head>
        <Script
          id='dark-mode-script'
          // strategy=""
          dangerouslySetInnerHTML={{
            __html: `
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
