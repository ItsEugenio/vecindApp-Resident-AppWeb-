import React, { useState } from "react";
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function ModalCode({
  open,
  onOpenChange,
  residencialID,
  codigoInvitado,
  usosCodigo,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";
  const [openConfirm, setOpenConfirm] = useState(false);
  const [usesCode, setUsesCode] = useState("");

  const createCode = async () => {
    if (usesCode < 1) {
      showToast.error(
        "Los usos del codigo no puede ser menor o igual a 0",
        "Cambie el valor"
      );
    } else {
      try {
        const response = await axios.post(
          `${api}/residents/generate-visit-code`,
          {
            residenciaId: residencialID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res", response);
        // navigate(0);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const generateCode = async () => {
    if (usesCode < 1) {
      showToast.error(
        "Los usos del codigo no puede ser menor o igual a 0",
        "Cambie el valor"
      );
    } else {
      try {
        const response = await axios.post(
          `${api}/residents/generate-multiple-codes`,
          {
            residenciaId: residencialID,
            usos: parseInt(usesCode),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        //console.log("res", response); 
        navigate(0);
        showToast.success("Código creado correctamente","Datos guardados")
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generar código de visita</DialogTitle>
            <DialogDescription>
              {!codigoInvitado
                ? "Genere un código para permitir el acceso a visitantes"
                : `Código de invitado generado`}
            </DialogDescription>
          </DialogHeader>

          <div>
            {!codigoInvitado ? (
              <h1>¿Esta seguro de generar un código de visita?</h1>
            ) : (
              <div className="flex flex-col justify-center">
                <h1 className="text-center mb-4">
                  Este es su código de invitado, le quedan {usosCodigo} usos
                </h1>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={codigoInvitado}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-center">
            <Button onClick={() => setOpenConfirm(true)}>
              Generar un nuevo código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="sm:max-w-[325px] ">
          <DialogHeader>
            <DialogTitle>Generar un nuevo código de visita</DialogTitle>
            <DialogDescription className="mt-2">
              Esta seguro de generar un nuevo código de visita
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <h1 className="text-center">Usos del código</h1>
              <Input
                id="usesCode"
                name="usesCode"
                type="number"
                placehorlder="Ingrese los usos del codigo"
                required
                value={usesCode}
                onChange={(e) => setUsesCode(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-center">
            <Button onClick={() => generateCode()}>
              Si, Generar un nuevo código
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCode;
