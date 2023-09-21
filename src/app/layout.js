import './globals.css'

export const metadata = {
  title: 'Filter Editor for BinMaster',
  description: 'A simple app to create and modify BinMaster filters',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
