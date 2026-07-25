import { useState } from "react"
import { Header } from "./components/Header"
import { Dropzone } from "./components/Dropzone"
import { Modal } from "./components/Modal"
import { Footer } from "./components/Footer"
import { TutorialModal } from "./components/TutorialModal"
import { OpenTutorialButton } from "./components/OpenTutorialButton"

export function App() {
  const [message, setMessage] = useState("")
  const [clipboard, setClipboard] = useState("")
  const [report, setReport] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false)

  const openTutorialModal = () => setIsTutorialModalOpen(true)

  return (
    <>
      <Header />

      <main className="flex-1 grid place-items-center gap-8 max-w-3xl w-full mx-auto p-4">
        <Dropzone
          setMessage={setMessage}
          setClipboard={setClipboard}
          setIsModalOpen={setIsModalOpen}
          report={report}
          setReport={setReport}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        clipboard={clipboard}
        message={message}
        setMessage={setMessage}
        report={report}
        setReport={setReport}
      />

      <TutorialModal
        isOpen={isTutorialModalOpen}
        setIsOpen={setIsTutorialModalOpen}
      />

      <Footer />

      <OpenTutorialButton
        onClick={openTutorialModal}
        isTutorialModalOpen={isTutorialModalOpen}
      />
    </>
  )
}
