import './globals.css';
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat'
});

export const metadata = {
  title: 'Déluxara - Elegance, Intelligently Designed',
  description: 'Déluxara crafts intelligent luxury experiences through digital branding, immersive websites, and strategic marketing.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
