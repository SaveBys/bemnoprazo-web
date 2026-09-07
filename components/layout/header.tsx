"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCartIcon, SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "../ui/badge";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="custom-shadow-sm flex w-full justify-center px-10 py-8">
      <div className="width-barrier flex w-full items-center justify-between">
        <nav>
          <Link href="/" className="m-auto w-fit">
            <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={88} />
          </Link>
        </nav>
        {isAuthenticated && (
          <div className="flex flex-row gap-8">
            <Button variant="secondary" href="/dashboard" isLink>
              <SquaresFourIcon className="size-5" />
              <span>Meu dashboard</span>
            </Button>

            <Button href="/products/shop" isLink>
              {totalItems > 0 && (
                <Badge className="relative -top-3 -right-4 z-10 size-6">
                  <span>{totalItems}</span>
                </Badge>
              )}
              <ShoppingCartIcon className={totalItems > 0 ? "absolute size-5" : ""} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
