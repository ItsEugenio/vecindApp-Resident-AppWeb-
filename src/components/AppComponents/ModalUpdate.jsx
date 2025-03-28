import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import axios from "axios";
import { showToast } from "./ShowToast";
function ModalUpdate({
  open,
  onOpenChange,
  neighborhoodId,
  neighborhoodName,
  actCalle,
  actNum,
}) {
  const [calle, setCalle] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [inputsVerify, setInputsVerify] = useState(true)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const updateData = async () => {
    const id = neighborhoodId;
    try {
      const response = await axios.patch(
        `${api}/residents/${id}`,
        {
          id,
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
      showToast.success("Datos de residencial actualizados", "Datos guardados correctamente")
      navigate(0);
    } catch (error) {
      showToast.error("Ocurrio un error al actualizar los datos", "Intente de nuevo")
    }
  };

  useEffect(() => {
    if(calle.length > 0 && numeroCasa.length >0){
      setInputsVerify(false)
    } else{
      setInputsVerify(true)
    }
  }, [calle, numeroCasa]);

  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Actualizar Datos del residencial {neighborhoodName}{" "}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="calle" className="text-center">
              Calle
            </Label>
            <Input
              id="calle"
              name="calle"
              type="text"
              placeholder={actCalle}
              required
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numeroCasa" className="text-center">
              Numero de casa
            </Label>
            <Input
              id="numeroCasa"
              name="numeroCasa"
              type="number"
              placeholder={actNum}
              required
              value={numeroCasa}
              onChange={(e) => setNumeroCasa(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-center">
          <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={updateData} disabled={inputsVerify} >Actualizar datos</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalUpdate;
