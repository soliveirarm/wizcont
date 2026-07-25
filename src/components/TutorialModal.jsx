import { CircleChevronLeft, CircleChevronRight } from "lucide-react"
import { CloseButton } from "./CloseButton"
import { ModalBox } from "./ModalBox"
import STEPS from "../util/steps.json"
import { useState } from "react"

export function TutorialModal({ isOpen, setIsOpen }) {
  const [stepIndex, setStepIndex] = useState(0)

  const handleClose = () => {
    setIsOpen(false)
    setStepIndex(0)
  }

  const stepsLength = STEPS.length

  const previousStep = () =>
    setStepIndex((prev) => (prev - 1 + stepsLength) % stepsLength)
  const nextStep = () => setStepIndex((prev) => (prev + 1) % stepsLength)

  if (!isOpen) return

  return (
    <ModalBox>
      <div className="z-10 sm:max-w-3/4 w-full max-h-screen h-full bg-zinc-50 p-4 rounded flex flex-col items-center gap-4 text-slate-800">
        <span className="w-full flex items-center justify-between">
          <p className="text-xl font-medium text-accent">Tutorial</p>
          <CloseButton title="Fechar tutorial" onClick={handleClose} />
        </span>

        <div className="flex justify-center items-center max-w-3/4 w-full text-center mx-auto h-12">
          <p>
            <span className="font-semibold">{stepIndex + 1}</span> —{" "}
            {STEPS[stepIndex]}
          </p>
        </div>

        <span className="sm:max-w-1/2 w-full flex justify-between items-center gap-4">
          <Arrow onClick={previousStep} Icon={CircleChevronLeft} />
          <img className="w-48 rounded" src={`tutorial/${stepIndex + 1}.png`} />
          <Arrow onClick={nextStep} Icon={CircleChevronRight} />
        </span>
      </div>
    </ModalBox>
  )
}

const Arrow = ({ onClick, Icon }) => (
  <button
    onClick={onClick}
    className="transition cursor-pointer hover:scale-125"
  >
    <Icon className="size-6 sm:size-8" />
  </button>
)
