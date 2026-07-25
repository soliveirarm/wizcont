import { FaQuestion } from "react-icons/fa6"

export function OpenTutorialButton({ isTutorialModalOpen, onClick }) {
  if (isTutorialModalOpen) return

  return (
    <button
      onClick={onClick}
      className="z-0 cursor-pointer absolute right-8 bottom-8"
    >
      <div className="flex items-center justify-center size-10 bg-white rounded-full shadow-md shadow-accent/50 transition hover:bg-accent hover:text-white">
        <FaQuestion />
      </div>
    </button>
  )
}
