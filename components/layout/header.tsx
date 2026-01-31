import Image from "next/image";

export default function Header() {
    return (
        <header className='box-content md:box-border gap-4'>
            <nav className='width-barrier m-auto'>
                <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={90} />
            </nav>
            <hr className='border-gray-300 my-4' />
        </header>
    );
}