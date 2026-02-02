import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TesteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col justify-center items-center'>
      <Header />
      <div className='w-fit my-4'>
        {children}
      </div>
      <Footer />
    </main>
  );
}