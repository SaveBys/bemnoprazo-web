import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";

export default function Footer() {
    return (
        <footer>
            <div className='width-barrier m-auto font-family'>
                <div className='flex flex-col gap-6'>
                    <hr className='border-orange-300 my-4 border-2 ' />
                    <div className='flex flex-col gap-16 items-center'>
                        <div className='flex justify-center gap-16' >
                            <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={90} />
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-subtitle flex flex-col items-center text-[#595959]'>Redes Sociais</h2>
                                <div className='flex gap-4'>
                                    <a href=""><FacebookLogoIcon color="#fcfcfc" className='bg-base-3 box-content md:box-border size-8 rounded-lg p-1' /></a>
                                    <a href=""><InstagramLogoIcon color="#fcfcfc" className='bg-base-3 box-content md:box-border size-8 rounded-lg p-1' /></a>
                                    <a href=""><LinkedinLogoIcon color="#fcfcfc" className='bg-base-3 box-content md:box-border size-8 rounded-lg p-1' /></a>
                                </div>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <h2 className='text-subtitle text-[#595959]'>Suporte</h2>
                                <p className='text-content text-[#595959] '>suporte@bemnoprazo.com.br</p>
                            </div>
                        </div>
                        <p className='text-content text-[#595959]'>Copyright ©2026 BemNoPrazo - Medicamento sem desperdício</p>
                        <div className='flex flex-col items-center gap-2'>
                            <Image className='' src="/img/LogoSavebys.png" alt="logo" width={100} height={50} />
                            <p className='text-legend text-[#595959]'>Powered by savebys.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}