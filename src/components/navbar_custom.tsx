"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "./searchBar"; // Import the search bar

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
  children?: React.ReactNode; // Accept additional content
}

export default function Navbar({ links, children }: NavbarProps) {
  return (
    <nav className="w-full p-4 bg-gray-500/40 backdrop-blur-lg shadow-md fixed top-0 left-0 z-50">
      <div className="container flex mx-auto justify-between items-center">
        {/* <h1 className="text-xl font-bold text-white">My Website</h1> */}
        <div className="space-x-4 flex flex-row">
          {links.map((link, index) => (
            <Link key={index} href={link.href} passHref>
              <Button variant="outline" className="text-black">
                {link.label}
              </Button>
            </Link>
          ))}
          {children}
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}

