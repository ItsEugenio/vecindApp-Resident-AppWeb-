import React, { useState } from "react";
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

function ModalDelete({ open, onOpenChange, neighborhoodId, neighborhoodName }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const deleteNeighborhood = async () => {
    const id = neighborhoodId;
    try {
      const response = await axios.delete(`${api}/residents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      showToast.success("Residencial eliminado correctamente")
      navigate("/residentes");
    } catch (error) {
      showToast.error("Ocurrio un error al actualizar los datos", "Intente de nuevo")
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] h-[250px]">
          <DialogHeader>
            <DialogTitle>Eliminar residencial {neighborhoodName}</DialogTitle>
            <DialogDescription className="mt-8">
              Al hacerlo se perderan los datos del residencial
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center">
            <Button onClick={() => setOpenConfirm(true)}>
              Elimiar residencial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-[325px] ">
          <DialogHeader>
            <DialogTitle>
              Esta seguro de eliminar residencial {neighborhoodName}
            </DialogTitle>
            <DialogDescription>
              Esta accion no puede revertirse, esta seguro de continuar
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-center">
            <Button onClick={() => deleteNeighborhood()}>
              Si, Eliminar residencial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalDelete;
