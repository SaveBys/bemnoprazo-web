import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header isAuthenticated={true} />
      {children}
      <Footer />
    </>
  )
}
