import React, { useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface CanvasProps {
  image: string | null;
  text: string;
  onImageUpload: (dataUrl: string) => void;
  footerColor: string;
  textColor: string;
  bold: boolean;
  italic: boolean;
  fontSize: number;
  fontFamily: string;
}

const Canvas: React.FC<CanvasProps> = ({
  image,
  text,
  onImageUpload,
  footerColor,
  textColor,
  bold,
  italic,
  fontSize,
  fontFamily,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCanvasClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onImageUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "800px",
        maxHeight: "1000px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      onClick={handleCanvasClick}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Box
        id="canvas"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {image ? (
          <Box
            id="post"
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={image}
              alt="Uploaded"
              sx={{
                width: "100%",
                objectFit: "contain",
              }}
            />
            <Box
              sx={{
                width: "100%",
                backgroundColor: text
                  ? footerColor
                  : "rgba(255, 255, 255, 0.3)",
                backdropFilter: text ? "blur(12px)" : "blur(10px)",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 0,
              }}
            >
              <Typography
                variant="h6"
                color={text ? textColor : "grey.700"}
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  fontFamily: fontFamily,
                  fontSize: `${fontSize}px`,
                  fontWeight: bold ? "bold" : "normal",
                  fontStyle: italic ? "italic" : "normal",
                  padding: "5px 10px",
                }}
              >
                {text || "请输入文字"}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <AddPhotoAlternateIcon sx={{ fontSize: 32, color: "grey.500" }} />
            <Typography sx={{ fontSize: 32, color: "grey.500" }}>
              点击上传图片
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Canvas;
