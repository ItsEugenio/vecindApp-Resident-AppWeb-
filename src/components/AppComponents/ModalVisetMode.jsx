import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import axios from "axios";
import { showToast } from "./ShowToast";


function ModalVisetMode({ open, onOpenChange, mode, neighborhoodId }) {
  const [viewMode, setViewMode] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const viewChange = () => {
    if (mode === false) {
      setViewMode(true);
    }
  };

  useEffect(() => {
    viewChange();
  }, [mode]);

  const changeMode = async () => {
    try {
      const response = await axios.patch(
        `${api}/residents/toggle-visit-mode`,
        {
          residenciaId: neighborhoodId,
          modoVisita: viewMode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(0);
      showToast.success("Modo visita actualizado correctamente","Datos guardados")
    } catch (error) {
      showToast.error("Ocurrio un error intente de nuevo","vuelva a intentarlo")
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar modo visita </DialogTitle>
          <DialogDescription>
            {!mode
              ? "Seleccione el boton para activar el modo visita"
              : `Seleccione el boton para desactivar el modo visita`}
          </DialogDescription>
        </DialogHeader>

        <div>
          {!mode ? (
            <h1>¿Esta seguro de activar el modo visita?</h1>
          ) : (
            <h1>¿Esta seguro de desactivar el modo visita?</h1>
          )}
        </div>

        <DialogFooter className="flex justify-center">
          {!mode ? (
            <Button onClick={changeMode}>Activar modo visita </Button>
          ) : (
            <Button onClick={changeMode}>Desactivar modo visita </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalVisetMode;
