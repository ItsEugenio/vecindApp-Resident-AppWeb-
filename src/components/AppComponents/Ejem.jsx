import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "@phosphor-icons/react";

const residenciales = [
  {
    id: "1",
    nombreNeighborhood: "Villa Paraíso",
    calle: "Calle Principal",
    numeroCasa: "A-15",
  },
  {
    id: "2",
    nombreNeighborhood: "Jardines del Este",
    calle: "Av. Las Flores",
    numeroCasa: "B-22",
  },

];

function Ejem() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {residenciales.map((residencial) => (
        <Card key={residencial.id} className="py-0 overflow-hidden">
          <CardHeader className="text-start bg-primary/5 p-4">
            <CardTitle>{residencial.nombreNeighborhood}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {residencial.calle}
                </p>
                <p className="font-medium">Casa {residencial.numeroCasa}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button variant="outline">Ver detalles</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Ejem;
