import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import axios from "axios";
import { showToast } from "./ShowToast";

export function RegisterResidentialModal({ open, onOpenChange }) {
  const [codigoVecindario, setCodigoVecindario] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [inputsVerify, setInputsVerify] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const register = async () => {
    try {
      const response = await axios.post(
        `${api}/residents/register`,
        {
          codigoVecindario,
          calle,
          numeroCasa,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(0);
      showToast.success(
        "Residencial agregado correctamente",
        "Datos guardados"
      );
    } catch (error) {
      
      showToast.error(
        "Ocurrio un error al actualizar los datos",
        "Intente de nuevo"
      );
    }
  };

  useEffect(() => {
    if (
      codigoVecindario.length > 0 &&
      calle.length > 0 &&
      numeroCasa.length > 0
    ) {
      setInputsVerify(false);
    } else {
      setInputsVerify(true);
    }
  }, [codigoVecindario, calle, numeroCasa]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrarse a Residencial</DialogTitle>
          <DialogDescription>
            Ingrese los datos para registrarse a un residencial.
          </DialogDescription>
        </DialogHeader>

        <div>
          <label className="block text-sm font-medium">
            Código de Vecindario
          </label>
          <Input
            placeholder="Ingrese el código"
            value={codigoVecindario}
            onChange={(e) => setCodigoVecindario(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Calle</label>
          <Input
            placeholder="Ingrese la calle"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Número de Casa</label>
          <Input
            placeholder="Ingrese el número"
            type="number"
            value={numeroCasa}
            onChange={(e) => setNumeroCasa(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={register} disabled={inputsVerify}>Registrar residencial</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
