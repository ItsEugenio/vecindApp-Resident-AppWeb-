import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye } from "@phosphor-icons/react";
import ModalVisetMode from "./ModalVisetMode";

function ViewModeCard({ mode, neighborhoodId }) {
  const [open, setOpen] = useState(false);

  const handleSwitchClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4 ">
          <CardTitle className="flex items-center text-2xl">
            <Eye className="mr-2 text-primary" size={40}/>
            Modo Vista
          </CardTitle>
          <CardDescription>
            {''}
          </CardDescription>
        </CardHeader>
        <CardContent>
         
          <div className="flex flex-col items-center justify-center space-x-2 w-full">
            <Switch
              id="view-mode"
              checked={mode}
              onCheckedChange={handleSwitchClick}
              className={( mode  ? "bg-green-500 data-[state=checked]:bg-green-500 h-9 w-16 data-[state=checked] [&>span]:h-8 [&>span]:w-8 [&>span]:data-[state=checked]:translate-x-7"
                  : "bg-red-500 data-[state=unchecked]:bg-red-500 h-9 w-16 data-[state=checked] [&>span]:h-8 [&>span]:w-8 [&>span]:data-[state=checked]:translate-x-7")}
            />
            <Label htmlFor="view-mode" className='mt-4 text-center'>
              {mode ? "Activado" : "Desactivado"}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          {''}
        </CardFooter>
      </Card>
      <ModalVisetMode
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        neighborhoodId={neighborhoodId}
      />
    </>
  );
}

export default ViewModeCard;
