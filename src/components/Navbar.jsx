import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async() => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('token_refresh')
    navigate('/')
  }

  return (
    <Navbar disableAnimation isBordered className="fixed h-16 border-none bg-slate-50">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="text-inherit">SmartCity Roberto Mange</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/signup" className={`${location.pathname === "/" ? 'text-violet-700' : 'hidden'}`}>Cadastrar</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/" className={`${location.pathname === "/signup" ? 'text-violet-700 ' : 'hidden'}`}>Entrar</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/register" className={`${location.pathname === "/home" ? 'text-violet-700 text-bold ml-2' : 'hidden'}`}>Registrar Sensor</Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="/sensors" className={`${location.pathname === "/home" ? 'text-violet-700 text-bold ml-2' : 'hidden'}`}>Editar Sensor</Link>
        </NavbarItem>

        <NavbarItem>
          <Button className={`${location.pathname === "/home" ? 'text-white ml-2 bg-violet-800 px-6 py-2 rounded' : 'hidden'}`} onClick={() => logout()}>Sair</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
