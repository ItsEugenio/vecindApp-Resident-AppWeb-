import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle  } from "@phosphor-icons/react";
import { RegisterResidentialModal } from './RegisterResidentialModal';

function RegisterResidentialButton() {
    const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} variant='success'>
        <PlusCircle size={48} />
        Registrarse a Vecindario
      </Button>
      <RegisterResidentialModal open={open} onOpenChange={setOpen} />
    </>
  )
}

export default RegisterResidentialButton
