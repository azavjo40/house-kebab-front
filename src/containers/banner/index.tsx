import React from "react";
import Image from "next/image";
import houseLogo from "../../assets/images/house-logo.jpeg";

export const Banner = () => {
  return (
    <div className="w-full h-[150px] md:h-[200px] relative">
      <img
        className="w-full h-[90%]"
        src="https://res.cloudinary.com/tkwy-prod-eu/image/upload/ar_40:9,c_thumb,w_1100/f_auto/q_auto/dpr_2.0/v1681724839/static-takeaway-com/images/generic/heroes/1386/1386_pizza_173"
      />
      <div className="w-[62px] h-[62px] md:w-[72px] md:h-[72px] absolute left-10 md:left-20 -bottom-2 bg-slate-100 rounded-sm flex justify-center items-center">
        <Image className="w-[62px] h-[52px] md:w-[72px] md:h-[62px]" src={houseLogo} alt="house Logo" />
      </div>
    </div>
  );
};
