import logo from '../Images/logo-in-orbit.svg'
import letsStart from '../Images/lets-start-illustration.svg'
import { Plus } from 'lucide-react'

import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

export function EmptyGoals() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      {/* Para abrir o menu lateral, o asChild faz com que o item dentro seja o button para abrir */}
      <DialogTrigger asChild>
        {/* Button da pasta ui */}
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </section>
  )
}