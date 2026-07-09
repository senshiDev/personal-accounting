import { toJalaali } from "jalaali-js";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";


export function miladiToDateObject(miladi: string) : DateObject {
const [y, m, d] = miladi.split("-").map(Number);
  const j = toJalaali(y, m, d);
  return new DateObject({
    calendar: persian,
    year: j.jy,
    month: j.jm,
    day: j.jd,
  });
}