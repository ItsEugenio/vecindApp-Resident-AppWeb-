import React from "react";
import { BuildingApartment,UserMinus } from "@phosphor-icons/react";
import logo from '../../assets/iconVA1.png'
import { useNavigate } from "react-router";
import { showToast } from "./ShowToast";
import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();
  const imgLogo = logo
  const cerrar = () =>{
    showToast.success("Termino sesión exitosamente");
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <nav className="border-b bg-background px-4 py-3 flex items-center">
      <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center">
          {/* <BuildingApartment size={64} /> */}
          <img src={imgLogo} alt="logo" width='90px'/>
          <h1 className="text-2xl  font-semibold">VecindApp Resident</h1>
        </div>
        <div>
        <Button onClick={()=> cerrar()}>
            <UserMinus />
            </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
