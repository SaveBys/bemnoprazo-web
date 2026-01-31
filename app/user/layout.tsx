import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function TesteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className='my-4'>
        {children}
      </div>
      <Footer/>
    </>
  );
}