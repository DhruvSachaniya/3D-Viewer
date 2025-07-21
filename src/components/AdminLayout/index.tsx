import { Box, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import MessageIcon from "@mui/icons-material/Message";
import InfoIcon from "@mui/icons-material/Info";
import "../../App.css";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Stack className="admin-layout">
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Typography>ONLINE 3D VIEWER</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <InfoIcon />
          <MessageIcon />
          <GitHubIcon />
        </Box>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default AdminLayout;
