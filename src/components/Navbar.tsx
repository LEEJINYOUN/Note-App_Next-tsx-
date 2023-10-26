"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVBAR_MENU } from "@/constants/NavbarMenu";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="navbar">
      {NAVBAR_MENU.map((item, key) => (
        <Link
          key={key}
          href={item.href}
          className={`link ${pathName === item.href && "linked"}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
