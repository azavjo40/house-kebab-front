import * as React from "react";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useGeneral } from "@/hooks/useGeneral";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars() {
  const { errorData }: any = useGeneral();
  return (
    <>
      {errorData?.message ? (
        <Stack spacing={2} className="fixed top-10 right-6">
          <Alert severity={errorData?.type}>{errorData?.message}</Alert>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}
