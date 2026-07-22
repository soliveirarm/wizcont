export const processData = (
  data,
  setMessage,
  setTextResult,
  reportDates,
  setReportDates,
) => {
  const filteredData = data.filter((row) => {
    const type = row["Type"] || ""
    return !type.includes("Perdida")
  })

  const groupByDate = {}

  filteredData.forEach((row) => {
    if (!row["Date"] || !row["Duration(secs)"]) return

    const [date, time] = row["Date"].split(" ")
    if (!date || !time) return

    const [day, month, year] = date.split("/")

    const keyDate = `${year}-${month}-${day}`
    const dateISO = new Date(`${keyDate}T${time}`)

    if (isNaN(dateISO.getTime())) return

    if (!groupByDate[keyDate]) groupByDate[keyDate] = []

    groupByDate[keyDate].push({
      ...row,
      dateObj: dateISO,
      duration: parseInt(row["Duration(secs)"], 10) || 0,
    })
  })

  const rowResults = []
  const datesReport = []
  const sortedDates = Object.keys(groupByDate).sort()

  sortedDates.forEach((date) => {
    const group = groupByDate[date]
    group.sort((a, b) => a.dateObj - b.dateObj)

    const col1 = group.filter((r) => r.duration >= 30 && r.duration < 90).length
    const col2 = group.filter((r) => r.duration >= 90).length
    const col3 = group.filter((r) => r.duration < 30).length

    const firstCallTime = group[0].dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
    const lastCallTime = group[group.length - 1].dateObj.toLocaleTimeString(
      "pt-BR",
      { hour: "2-digit", minute: "2-digit" },
    )

    const longCalls = group.filter((r) => r.duration > 90)
    const between = longCalls.filter((r) => {
      const timeInMinutes = r.dateObj.getHours() * 60 + r.dateObj.getMinutes()
      return timeInMinutes >= 690 && timeInMinutes <= 750 // Entre 11:30 e 12:30
    })

    const col5 = between.length
    const col6 = longCalls.length - col5

    const linha = `${col1}\t${col2}\t${col3}\t${firstCallTime}\t${col5}\t${col6}\t${lastCallTime}`
    rowResults.push(linha)

    const [year, month, day] = date.split("-")
    datesReport.push(`${day}/${month}/${year}`)
  })

  const finalResult = rowResults.join("\n")
  setTextResult(finalResult)

  navigator.clipboard
    .writeText(finalResult)
    .then(() => {
      setMessage("Dados copiados para a área de transferência.")
    })
    .catch("Processado com sucesso! Cole o texto manualmente.")
    .finally(() => setReportDates(reportDates.join(", ")))
}
