import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const roboto_mono = Roboto_Mono({ 
  subsets: ['latin'], 
  variable: '--font-roboto-mono', 
  display: 'swap' 
});

export const metadata = {
  title: 'Ada Love',
  description: '…'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto_mono.variable}>
      <body>{children}</body>
    </html>
  )
}
