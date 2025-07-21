import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FileUploadSection = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "20px",
        margin: "10px",
        height: "73vh",
        border: "2px dashed #3d3e42", // <-- Dashed border added
        borderRadius: "8px", // Optional: rounded corners
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "10px" }}>
          Upload your 3D model file
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Supported formats: .obj, .fbx, .glb, .gltf
        </Typography>
      </Box>
      {/* Divider line */}
      <Box
        sx={{
          width: "50%",
          textAlign: "center",
          borderBottom: "2px solid #3d3e42",
          margin: "10px 0",
        }}
      />
      {/* Sample File Example */}
      <Box
        sx={{
          borderRadius: "4px",
          border: "1px solid #3d3e42",
          padding: "10px",
          ":hover": {
            cursor: "pointer",
            backgroundColor: "#3d3e42",
          },
        }}
        onClick={() => navigate("/3DM")}
      >
        3DM
      </Box>
    </Stack>
  );
};

export default FileUploadSection;
