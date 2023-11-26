import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  metadataBase: new URL("https://carlosazaustre.es"),
  title: {
    default: 'Carlos Azaustre - Formación y Divulgación en Programación Web y JavaScript',
    template: "%s | Carlos Azaustre"
  },
  description: 'Developer Content Creator. Google Developer Expert (GDE) en Tecnologías Web. Microsoft MVP.',
  openGraph: {
    title: "Carlos Azaustre",
    description: "Developer Content Creator. GDE & MVP",
    url: "https://carlosazaustre.es",
    siteName: "Carlos Azaustre",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Carlos Azaustre",
    card: "summary_large_image",
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable,
      )}>
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 mx-4 flex flex-col px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  )
}
