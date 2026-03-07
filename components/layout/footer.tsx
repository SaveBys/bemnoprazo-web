import Image from "next/image";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-11 py-8">
      <div className="width-barrier m-auto flex flex-col items-center gap-6">
        <hr className="border-primary-2 w-full border-2" />

        <div className="flex flex-col items-center gap-16">
          <div className="flex justify-center gap-16">
            <nav>
              <Link href="/" className="m-auto w-fit">
                <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={88} />
              </Link>
            </nav>

            <div className="flex flex-col gap-4">
              <h3 className="text-subtitle text-base-2 flex flex-col items-center">
                Redes Sociais
              </h3>

              <div className="flex gap-4">
                <a href="">
                  <FacebookLogoIcon className="bg-base-3 text-base-5 size-8 rounded-lg p-1" />
                </a>
                <a href="">
                  <InstagramLogoIcon className="bg-base-3 text-base-5 size-8 rounded-lg p-1" />
                </a>
                <a href="">
                  <LinkedinLogoIcon className="bg-base-3 text-base-5 size-8 rounded-lg p-1" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <h3 className="text-subtitle text-base-2">Suporte</h3>
              <p className="text-content text-base-2">suporte@bemnoprazo.com.br</p>
            </div>
          </div>

          <p className="text-content text-base-2">
            Copyright ©2026 BemNoPrazo - Medicamento sem desperdício
          </p>

          <div className="flex flex-col items-center">
            <Image src="/img/LogoSavebys.png" alt="logo" width={100} height={50} />
            <p className="text-legend text-base-2">Powered by savebys.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
