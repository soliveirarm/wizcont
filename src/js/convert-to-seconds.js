export const convertToSeconds = (duration) => {
  if (duration.includes("m") && !duration.includes("s")) {
    return Number(duration.replace("m", "")) * 60
  }
  if (duration.includes("m")) {
    duration = duration.replace("m", "").replace("s", "")
    const [min, sec] = duration.split(" ")
    return Number(min) * 60 + Number(sec)
  } else {
    return Number(duration.replace("s", ""))
  }
}
