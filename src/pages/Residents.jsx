import React from "react";
import CardResidents from "@/components/AppComponents/CardResidents";
import RegisterResidentialButton from "@/components/AppComponents/RegisterResidentialButton";
import Navbar from "@/components/AppComponents/Navbar";

function Residents() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pl-8 pr-8 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Residenciales</h1>
          <RegisterResidentialButton />
        </div>
        <CardResidents />
      </div>
    </main>
  );
}

export default Residents;
