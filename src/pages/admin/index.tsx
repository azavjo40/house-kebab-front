import { withAuth } from "@/components/middleware-auth/withAuth";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Home() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className="w-full h-full p-10">
      <div className="min-h-[80%] h-full"></div>
      <Stack spacing={2}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default withAuth(Home);
