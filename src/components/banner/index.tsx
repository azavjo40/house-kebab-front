import { IHeader } from "@/types";

interface Props {
  header: IHeader;
}

export const Banner = ({ header }: Props) => {
  return (
    <div className="w-full h-[150px] md:h-[200px] relative">
      {header?.banner ? <img className="w-full h-[90%]" src={header?.banner || ""} alt="house Bnner" /> : ""}
      <div className="w-[62px] h-[62px] md:w-[72px] md:h-[72px] absolute left-10 md:left-20 -bottom-2 bg-slate-100 rounded-sm flex justify-center items-center">
        {header?.logo ? (
          <img className="w-[62px] h-[52px] md:w-[72px] md:h-[62px]" src={header?.logo || ""} alt="house Logo" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
