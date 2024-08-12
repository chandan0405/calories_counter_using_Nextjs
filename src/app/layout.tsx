
export const metadata = {
  title: 'Calorie counter webApp',
  description: 'Developed by Chandan Kumar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
