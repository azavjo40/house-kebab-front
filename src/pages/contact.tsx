import { useEffect, useState } from "react";
import { useGeneral } from "../hooks/useGeneral";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { IWeek } from "../types";

export default function Contact() {
  const { openClose } = useGeneral();
  const [weeks, setWeeks] = useState<IWeek[]>([]);

  useEffect(() => {
    setWeeks(calculateWeeks());
  }, []);

  const calculateWeeks = () => {
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

  return (
    <div className="w-full bg-slate-200 h-[90vh] p-3 md:p-10">
      <div className="w-full h-full bg-white rounded-xl flex flex-col md:flex-row">
        <div className="w-full md:w-[60%] h-full">
          <iframe
            className="w-full h-full bg-white md:rounded-l-xl rounded-b-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440.8336817262666!2d20.97083981211607!3d52.28272137188312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbdc3d3b6311%3A0xf07be216c523b1a8!2sHouse%20Kebab!5e0!3m2!1sen!2spl!4v1682603528244!5m2!1sen!2spl"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        </div>

        <div className="h-full w-full lg:pt-32">
          <h1 className="mb-2 text-lg font-semibold text-yellow-300  text-center mt-6 lg:text-6xl">Informacje</h1>
          <div className="flex h-full w-full md:justify-around mb-4 md:mb-0 md:pt-10 md:flex-row flex-col items-center">
            <div className="lg:h-full w-[200px]">
              <h1 className="mb-2 text-lg font-semibold text-gray-900"> Informacja prawna</h1>
              <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                <li className="flex items-center"> House Kebab Pizza</li>
                <li className="flex items-center">Klaudyny 26</li>
                <li className="flex items-center">01-684 Warszawa</li>
                <li className="flex items-center text-blue-500">
                  <a href="mailto:housekebab606@gmail.com">Wyslij nam e-mail</a>
                </li>
                <li className="flex items-center text-blue-500">
                  <a href="tel:+48 579 250 176">+48 579 250 176</a>
                </li>
              </ul>
            </div>

            <div className="mt-4 md:mt-0 lg:h-full w-[200px]">
              <h1 className="mb-2 text-lg font-semibold text-gray-900"> Godziny otwarty</h1>
              <ul className="max-w-md space-y-1 text-gray-500">
                {weeks?.map((day) => (
                  <li className={`flex items-center ${day.isToday ? "text-red-500" : ""}`}>
                    <span className="w-[50%]">{day.titleDay}:</span>{" "}
                    <span>
                      {day?.open?.slice(0, 5)} - {day?.close?.slice(0, 5)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
