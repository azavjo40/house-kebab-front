import { useGeneral } from "@/hooks/useGeneral";
import { CircularProgress } from "@mui/material";

export const Loader = () => {
  const { isLoading } = useGeneral();
  return (
    <>
      {isLoading && (
        <div className="bg-white opacity-40 fixed top-0 right-0 w-full flex justify-center items-center h-full z-50">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
