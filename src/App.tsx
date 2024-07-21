import React, { useState } from "react";
import Canvas from "./components/Canvas";
import TextEditor from "./components/TextEditor";
import { Container, Box, TextField, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [footerBgColor, setFooterBgColor] = useState<string>(
    "rgba(255, 255, 255, 0.3)"
  );
  const [textColor, setTextColor] = useState<string>("#000000");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontSize, setFontSize] = useState(16); // 设置默认字体大小为中号
  const [fontFamily, setFontFamily] = useState("宋体");

  const handleImageUpload = (dataUrl: string) => {
    setImage(dataUrl);
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  const handleDownload = () => {
    if (document.getElementById("post")) {
      htmlToImage
        .toBlob(document.getElementById("post") as HTMLElement)
        .then((blob) => {
          if (blob) {
            saveAs(blob, "poster.png");
          }
        });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          marginBottom: "20px",
          overflow: "hidden",
          transition: "margin-bottom 0.3s",
        }}
      >
        <Canvas
          image={image}
          text={text}
          onImageUpload={handleImageUpload}
          footerColor={footerBgColor}
          textColor={textColor}
          bold={bold}
          italic={italic}
          fontSize={fontSize}
          fontFamily={fontFamily}
        />
      </Box>
      <TextField
        label="输入文字"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextEditor
          text={text}
          setText={setText}
          footerBgColor={footerBgColor}
          setFooterBgColor={setFooterBgColor}
          textColor={textColor}
          setTextColor={setTextColor}
          bold={bold}
          setBold={setBold}
          italic={italic}
          setItalic={setItalic}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
        />
        <IconButton onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default App;
