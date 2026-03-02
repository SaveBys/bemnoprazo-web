import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function TesteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <div className="my-4 w-fit">{children}</div>
      <Footer />
    </main>
  )
}
