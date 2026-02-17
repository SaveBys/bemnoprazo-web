
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";

interface HeaderProps {
  isAuthenticated?: boolean
};

export default function Header({
  isAuthenticated = false
}: HeaderProps) {
  return (
    <header className='w-full flex justify-center px-10 py-8 custom-shadow-sm'>
      <div className="width-barrier w-full flex justify-between items-center">
        <nav>
          <Image src="/img/LogoBemnoprazo.png" alt="logo Bem no prazo" width={200} height={88.25} />
        </nav>
        {
          isAuthenticated && (
            <div className="flex flex-row gap-8">
              <Button variant="secondary" href="/dashboard" isLink>
                <SquaresFourIcon className="size-5" />
                <span>Meu dashboard</span>
              </Button>

              <Button  href="/products/shop" isLink>
                <ShoppingCartIcon className="size-5" />
              </Button>
            </div>
          )
        }
      </div>
    </header>
  );
}