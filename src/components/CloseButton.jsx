import { CircleX } from "lucide-react"

export function CloseButton({ onClick, title }) {
  return (
    <button
      onClick={onClick}
      className="self-end cursor-pointer transition hover:scale-120 text-accent hover:text-red-600"
      title={title}
    >
      <CircleX />
    </button>
  )
}
