import { useGeneral } from "@/hooks/useGeneral";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const Loader = () => {
  const { isLoading } = useGeneral();
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    setIsStart(true);
    setTimeout(() => setIsStart(isLoading), 1000);
  }, []);
  return (
    <>
      {isStart && (
        <div className="bg-white opacity-40 fixed top-0 right-0 w-full flex justify-center items-center h-full z-50">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
