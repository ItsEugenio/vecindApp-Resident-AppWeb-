import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, HouseLine } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import CardSkeleton from "./CardSkeleton";
import axios from "axios";
import { showToast } from "./ShowToast";

function CardResidents() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const getNeighborhoods = async () => {
    try {
      const response = await axios.get(`${api}/residents`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNeighborhoods(response.data);
    } catch (error) {
      showToast.error(
        "Ocurrio un error al cargar los datos",
        "Recargue la pagina"
      );
    }
  };

  useEffect(() => {
    getNeighborhoods();
  }, []);

  const viewDetails = (neighborhoodId) => {
    navigate("/residencial", { state: { neighborhoodId } });
  };

  return (
    <>
      {neighborhoods.length >= 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <>
            {neighborhoods.map((residencial) => (
              <Card key={residencial.id} className="py-0 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between text-start bg-primary/5 p-4">
                  <CardTitle className="text-2xl">
                    {residencial.nombreNeighborhood}
                  </CardTitle>
                  <HouseLine size={48} className="text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin
                      size={28}
                      className="text-muted-foreground mt-0.5"
                    />
                    <div>
                      <p className="text-lg text-muted-foreground">
                        {residencial.calle}
                      </p>
                      <p className="text-xl font-medium">
                        Casa {residencial.numeroCasa}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4 pb-4">
                  <Button
                    variant="blue"
                    onClick={() => viewDetails(residencial.id)}
                  >
                    Ver detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-2xl">
              Aun no estas registrado a un residencial
            </h1>
            <h2>Registrate con el boton de arriba</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CardResidents;
