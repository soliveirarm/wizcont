import { PhoneCall } from "lucide-react"

export function Header() {
  return (
    <header className="text-white p-4  flex items-center gap-4 bg-accent">
      <PhoneCall />
      <div>
        <h1 className="text-xl font-semibold">WizCont</h1>
        <h2 className="text-slate-200">Contagem de ligações - Wizard</h2>
      </div>
    </header>
  )
}
