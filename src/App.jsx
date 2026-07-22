import { PhoneCall, File } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useCallback, useState } from "react"
import { processData } from "./js/process-data"
import Papa from "papaparse"

export default function App() {
  const [message, setMessage] = useState("")
  const [textResult, setTextResult] = useState("")
  const [reportDates, setReportDates] = useState("")

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length == 0) return

      const [file] = acceptedFiles

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) =>
          processData(
            results.data,
            setMessage,
            setTextResult,
            reportDates,
            setReportDates,
          ),
        error: (error) => alert("Erro ao ler o arquivo CSV: " + error.message),
      })
    },
    [reportDates],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  })

  const dropzoneStyle = isDragActive
    ? " border-blue-500 bg-blue-100"
    : " border-zinc-200 bg-zinc-100"

  return (
    <>
      <header className="text-white p-6 text-xl flex items-center gap-2 bg-accent">
        <PhoneCall />
        <h1 className="font-semibold">Contagem de Ligações</h1>
      </header>

      <main className="grid place-items-center mt-8 max-w-2xl mx-auto">
        <div
          className={`flex flex-col justify-center items-center gap-2 w-full h-96 p-8 text-center rounded cursor-pointer transition border-2 border-dashed ${dropzoneStyle}`}
          {...getRootProps()}
        >
          <File size={48} absoluteStrokeWidth />
          <input {...getInputProps()} />
          <p>
            {isDragActive
              ? "Solte o arquivo .csv aqui"
              : "Arraste e solte o arquivo .csv aqui, ou clique para selecionar o arquivo no seu computador"}
          </p>
        </div>
        <p>{message}</p>
        <p>{textResult}</p>
      </main>
    </>
  )
}
