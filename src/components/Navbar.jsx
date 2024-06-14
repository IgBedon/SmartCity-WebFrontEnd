import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link
} from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";

export default function CustomNavbar() {

  const location = useLocation();

  return (
    <Navbar disableAnimation isBordered className="fixed h-16 border-none bg-slate-50">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="text-inherit">SmartCity Roberto Mange</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/signup" className={`${location.pathname === "/" ? 'text-violet-700' : 'hidden'}`}>Sign Up</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/" className={`${location.pathname === "/signup" ? 'text-violet-700' : 'hidden'}`}>Log In</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
