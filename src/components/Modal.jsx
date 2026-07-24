import { useState } from "react"
import { CircleX } from "lucide-react"
import { PiCheckCircleFill } from "react-icons/pi"
import { Table } from "./Table"

export function Modal({
  isOpen = true,
  setIsOpen,
  message,
  clipboard,
  report,
  setReport,
}) {
  const [isClicked, setIsClicked] = useState(false)

  const copyButtonStyle = isClicked
    ? "bg-white text-accent"
    : "bg-accent text-white"

  const handleClose = () => {
    setIsOpen(false)
    setReport([])
  }

  const copyText = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(clipboard)
    setTimeout(() => setIsClicked(false), 2000)
  }

  if (!isOpen) return

  return (
    <div
      open
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
    >
      <div className="max-h-[90%] bg-white p-4 rounded flex flex-col items-center gap-4">
        <button
          onClick={handleClose}
          className="self-end cursor-pointer transition hover:scale-120 text-accent hover:text-red-600"
          title="Fechar e limpar área de transferência"
        >
          <CircleX />
        </button>

        <PiCheckCircleFill size={64} className="text-green-600" />
        <h2 className="text-xl font-semibold">{message}</h2>
        <Table report={report} />
        <button
          className={`font-bold border-2 border-accent self-end py-2 px-6 rounded cursor-pointer transition hover:scale-110 hover:opacity-90 ${copyButtonStyle}`}
          onClick={copyText}
        >
          {!isClicked ? "Copiar" : "Copiado!"}
        </button>
      </div>
    </div>
  )
}
