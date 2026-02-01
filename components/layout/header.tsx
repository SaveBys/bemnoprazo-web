import Image from "next/image";

export default function Header() {
  return (
    <header className='w-full gap-4 px-20 py-8 shadow-sm'>
      <nav className='width-barrier m-auto'>
        <Image className='ps-8' src="/img/LogoBemnoprazo.png" alt="logo Bem no prazo" width={200} height={88.25} />
      </nav>
    </header>
  );
}