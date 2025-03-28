import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  HouseLine,
  ArrowsClockwise,
  TrashSimple,
  House,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";

function CardNeighborhoodInfo({ residentialData }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpdenDelete] = useState(false);
  //Información del Residencial
  return (
    <>
      <Card className="w-[450px] py-0 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between text-start bg-primary/5 p-4">
          <CardTitle className="text-2xl">
            Información del Residencial
          </CardTitle>
          <House size={48} className="text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <HouseLine className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                Nombre del Residencial
              </p>
              <p className="font-medium">
                {residentialData.nombreNeighborhood}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Dirección</p>
              <p className="font-medium">
                {residentialData.calle}, Casa {residentialData.numeroCasa}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 flex justify-center gap-6 mb-4">
            <Button onClick={() => setOpenUpdate(true)} variant="success">
              <ArrowsClockwise />
              Actualizar residencia
            </Button>
            <Button onClick={() => setOpdenDelete(true)} variant="destructive">
              <TrashSimple />
              Eliminar residencia
            </Button>
          </div>
        </CardContent>
      </Card>
      <ModalUpdate
        open={openUpdate}
        onOpenChange={setOpenUpdate}
        neighborhoodId={residentialData.id}
        neighborhoodName={residentialData.nombreNeighborhood}
        actCalle={residentialData.calle}
        actNum={residentialData.numeroCasa}
      />
      <ModalDelete
        open={openDelete}
        onOpenChange={setOpdenDelete}
        neighborhoodId={residentialData.id}
        neighborhoodName={residentialData.calle}
      />
    </>
  );
}

export default CardNeighborhoodInfo;
