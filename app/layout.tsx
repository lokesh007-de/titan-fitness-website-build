import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Titan Fitness — Built for the next set',
    template: '%s | Titan Fitness',
  },
  description:
    'Explore Titan Fitness classes, coaches, training services, and membership options. Find your people, build strength, and make every visit count.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Titan Fitness',
    title: 'Titan Fitness — Built for the next set',
    description: 'A welcoming gym for classes, coaching, strength, and your next personal best.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titan Fitness — Built for the next set',
    description: 'Explore classes, coaches, training services, and memberships at Titan Fitness.',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
