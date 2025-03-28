import React, { useState,useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "@phosphor-icons/react";
import ModalCode from "./ModalCode";

function VisitCodeCard({ residencialId, codigoInvitado, usosCodigo }) {
  const [open, setOpen] = useState(false);

 
  
  return (
    <>
      <Card >
        <CardHeader className="p-4">
          <CardTitle className="flex items-center text-2xl">
            <Ticket className="mr-2 text-primary" size={40} />
            Código de Visita: 
          </CardTitle>
          <CardDescription>
            {''}
          </CardDescription>
        </CardHeader>
        <CardContent>
        {codigoInvitado && codigoInvitado.length > 1 ? (
             <p className="text-xl text-center">
             Aqui puede ver su codigo 
           </p>
          ) : (
            <p className="text-xl text-center">
               Actualmente no hay codigo
            
          </p>
          )}
         
        </CardContent>
        <CardFooter>
          {codigoInvitado && codigoInvitado.length > 1 ? (
            <Button onClick={() => setOpen(true)} className="w-full" variant='blue'>
              Mostrar Código
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)} className="w-full" variant='success'>
              Generar Código
            </Button>
          )}
        </CardFooter>
      </Card>
      <ModalCode
        open={open}
        onOpenChange={setOpen}
        residencialID={residencialId}
        codigoInvitado={codigoInvitado}
        usosCodigo={usosCodigo}
      />
    </>
  );
}

export default VisitCodeCard;
