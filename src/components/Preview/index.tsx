import { Box, Stack, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Fragment } from "react/jsx-runtime";
import FileUploadSection from "./FileSection";
import { useRef } from "react";

const FirstPreview = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // TODO: Handle the selected file here (e.g., upload, preview, parse, etc.)
      console.log("File selected:", file);
    }
  };
  return (
    <Fragment>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#3d3e42",
          color: "white",
          padding: "10px",
        }}
      >
        <Box sx={{ cursor: "pointer" }} onClick={handleUploadClick}>
          <Tooltip title="Upload File" arrow>
            <UploadFileIcon />
          </Tooltip>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".obj,.fbx,.glb,.gltf"
          />
        </Box>
        <Box>
          <DarkModeOutlinedIcon />
        </Box>
      </Stack>
      <FileUploadSection />
    </Fragment>
  );
};

export default FirstPreview;
