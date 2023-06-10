import { IOpenClose } from "@/src/types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export const calculateWeeks = (openClose: IOpenClose) => {
  const workingHours = [
    { open: "10:00.00", close: "22:00.00", titleDay: "Poniedziałek", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Wtorek", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Środa", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Czwartek", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Piątek", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Sobota", isToday: false },
    { open: "10:00.00", close: "22:00.00", titleDay: "Niedziela", isToday: false },
  ];
  const currentDate = new Date();
  const dayOfWeek = format(currentDate, "EEEE", { locale: pl });
  return workingHours.map((day) => {
    if (dayOfWeek.toLowerCase() === day?.titleDay.toLowerCase())
      return {
        open: openClose?.open ?? day?.open,
        close: openClose?.close ?? day?.close,
        titleDay: "Dzisiaj",
        isToday: true,
      };
    else return day;
  });
};
