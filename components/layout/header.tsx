import Image from "next/image";

export default function Header() {
    return (
        <header className='box-content md:box-border gap-4'>
            <nav className='width-barrier m-auto'>
                <Image className='ps-8' src="/img/LogoBemnoprazo.png" alt="logo" width={250} height={150} />
            </nav>
            <hr className='border-gray-300 my-4' />
        </header>
    );
}