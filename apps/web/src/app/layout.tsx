import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Braxxis Finance',
  description: 'Institutional-grade analytics and portfolio management for modern investors.',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=JSON.parse(localStorage.getItem('braxxis-theme')||'{}');if(t.state&&t.state.theme){document.documentElement.setAttribute('data-theme',t.state.theme);document.documentElement.style.colorScheme=t.state.theme}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
