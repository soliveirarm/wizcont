import { ArrowDown, ArrowUp } from "lucide-react"

export function Table({ report }) {
  return (
    <table className="w-full border-collapse mb-8">
      <thead className="bg-accent text-white">
        <tr className="*:py-1 *:px-2 *:border *:border-slate-300 *:font-semibold">
          <th>Data</th>
          <th>
            <span className="flex items-center gap-1">
              <ArrowDown className="text-red-400" size={20} />
              1:30
            </span>
          </th>
          <th>
            <span className="flex items-center gap-1">
              <ArrowUp className="text-emerald-400" size={20} />
              1:30
            </span>
          </th>
          <th>Só discadas</th>
          <th>Horário inicial</th>
          <th>11:30-12:30</th>
          <th>Restante</th>
          <th>Última ligação</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {report.map((day) => (
          <tr>
            {day.map((data) => (
              <td className="border border-slate-300 py-1 px-2">{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
