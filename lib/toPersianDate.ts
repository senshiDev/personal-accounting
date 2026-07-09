import { toJalaali } from "jalaali-js"

export function toPersianDate(gregorian: string) {
  const [gy, gm, gd] = gregorian.split("-").map(Number)
  const { jy, jm, jd } = toJalaali(gy, gm, gd)
  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`
}