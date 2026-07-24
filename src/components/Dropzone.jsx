import { BsFiletypeCsv } from "react-icons/bs"
import { useDropzone } from "react-dropzone"
import { countCalls } from "../js/count-calls"
import { useCallback } from "react"
import Papa from "papaparse"

export function Dropzone({
  setMessage,
  setClipboard,
  report,
  setReport,
  setIsModalOpen,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length == 0) return

      const [file] = acceptedFiles

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) =>
          countCalls(
            results.data,
            setMessage,
            setClipboard,
            report,
            setReport,
            setIsModalOpen,
          ),
        error: (error) => alert("Erro ao ler o arquivo CSV: " + error.message),
      })
    },
    [setMessage, setClipboard, report, setReport, setIsModalOpen],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
  })

  const dropzoneStyle = isDragActive
    ? "border-blue-500 bg-blue-100"
    : "border-slate-300 bg-slate-50"
  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 w-full h-96 p-8 text-center rounded cursor-pointer transition border-2 border-dashed text-slate-800 hover:bg-blue-50 ${dropzoneStyle}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <BsFiletypeCsv size={48} />

      <p className="max-w-sm w-full">
        {isDragActive
          ? "Solte o arquivo .csv aqui"
          : "Arraste e solte o arquivo .csv aqui, ou clique para selecionar o arquivo no seu computador"}
      </p>
    </div>
  )
}
