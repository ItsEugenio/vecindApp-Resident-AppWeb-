import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardNeighborhoodInfo from "@/components/AppComponents/CardNeighborhoodInfo";
import VisitCodeCard from "@/components/AppComponents/VisitCodeCard";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { showToast } from "@/components/AppComponents/ShowToast";
import CardSkeleton from "@/components/AppComponents/CardSkeleton";
import Navbar from "@/components/AppComponents/Navbar";
import ViewModeCard from "@/components/AppComponents/ViewModeCard";

function Neighborhood() {
  const [neighborhood, setNeighborhood] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const neighborhoodId = location.state?.neighborhoodId;
  const token = localStorage.getItem("token");
  const api = "https://vecindappback-production.up.railway.app";

  const getNeighborhood = async () => {
    try {
      const response = await axios.get(`${api}/residents/${neighborhoodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setNeighborhood(response.data);
    } catch (error) {
      showToast.error(
        "Ocurrio un error al cargar los datos",
        "Recargue la pagina"
      );
    }
  };

  useEffect(() => {
    if (neighborhoodId) {
      getNeighborhood();
    }
  }, [neighborhoodId]);

  useEffect(() => {
    if (neighborhoodId === undefined) {
      navigate("/residentes");
    }
  }, [neighborhoodId]);
  console.log("nei", neighborhood);

  const navigateBack = () => {
    navigate("/residentes");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-4">
        <Button variant="ghost" className="pl-0" onClick={navigateBack}>
          <ArrowLeft className="mr- h-4 w-4" />
          Volver
        </Button>
      </div>
      {!neighborhood.id ? (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-center aling-center p-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 ml-8">
              {neighborhood.nombreNeighborhood}
            </h1>
            <div>
              <div className="flex justify-center m-8">
                <CardNeighborhoodInfo residentialData={neighborhood} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pl-8 pr-8">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <VisitCodeCard
                    residencialId={neighborhood.id}
                    codigoInvitado={neighborhood.codigoInvitado}
                    usosCodigo={neighborhood.codeUses}
                  />
                  <ViewModeCard
                    mode={neighborhood.modoVisita}
                    neighborhoodId={neighborhood.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Neighborhood;
