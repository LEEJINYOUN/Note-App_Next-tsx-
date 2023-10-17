"use client";
import { NavbarMenu } from "@/constants/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="navbar">
      {NavbarMenu.map((item, key) => (
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
