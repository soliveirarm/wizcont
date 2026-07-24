import { convertToSeconds } from "./convert-to-seconds"

export const countCalls = (
  csvFile,
  setMessage,
  setClipboard,
  report,
  setReport,
  setIsModalOpen,
) => {
  const validCalls = csvFile.filter((row) => {
    const type = row["CallType"] || ""
    return !type.includes("Missed")
  })

  const callsByDate = {}

  validCalls.forEach((row) => {
    if (!row["Date"] || !row["Duration"]) return

    const [date, time] = row["Date"].split(" ")
    if (!date || !time) return

    const dateISO = new Date(`${date}T${time}`)

    if (isNaN(dateISO.getTime())) return

    if (!callsByDate[date]) callsByDate[date] = []

    callsByDate[date].push({
      ...row,
      dateObj: dateISO,
      duration: convertToSeconds(row["Duration"]),
    })
  })

  const rowResults = []
  const sortedDates = Object.keys(callsByDate).sort()

  sortedDates.forEach((date) => {
    const group = callsByDate[date]
    group.sort((a, b) => a.dateObj - b.dateObj)

    const longCalls = group.filter((r) => r.duration >= 90)
    const col1 = group.filter((r) => r.duration >= 30 && r.duration < 90).length
    const col2 = longCalls.length
    const col3 = group.filter((r) => r.duration < 30).length

    const firstCallTime = group[0].dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    const lastCallTime = group[group.length - 1].dateObj.toLocaleTimeString(
      "pt-BR",
      { hour: "2-digit", minute: "2-digit" },
    )

    const between = longCalls.filter((r) => {
      const timeInMinutes = r.dateObj.getHours() * 60 + r.dateObj.getMinutes()
      return timeInMinutes >= 690 && timeInMinutes <= 750 // Entre 11:30 e 12:30
    })

    const col5 = between.length
    const col6 = longCalls.length - col5

    const dayCount = `${col1}\t${col2}\t${col3}\t${firstCallTime}\t${col5}\t${col6}\t${lastCallTime}`
    rowResults.push(dayCount)

    const [year, month, day] = date.split("-")
    setReport((prevReport) => [
      ...prevReport,
      [
        `${day}/${month}/${year}`,
        col1,
        col2,
        col3,
        firstCallTime,
        col5,
        col6,
        lastCallTime,
      ],
    ])
  })

  const finalResult = rowResults.join("\n")
  setClipboard(finalResult)

  navigator.clipboard
    .writeText(finalResult)
    .then(() => {
      setMessage("Dados copiados para a área de transferência!")
    })
    .catch("Processado com sucesso! Cole o texto manualmente.")
    .finally(() => setIsModalOpen(true))
}
