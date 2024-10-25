import React from "react";
import { Box } from "@mui/material";

interface NotFoundProps {
  message?: string; // Cho phép tuỳ chỉnh thông báo
}

const DataNotFound: React.FC<NotFoundProps> = ({
  message = "Data not found",
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      padding={2}
      style={{ textAlign: "center" }}
    >
      <p className="text-red-500 font-bold text-2xl">{message}</p>
    </Box>
  );
};

export default DataNotFound;
