import React, { useState } from "react";
import {
  Box,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  FormControl,
  InputLabel,
  Popover,
  SelectChangeEvent,
} from "@mui/material";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { SketchPicker } from "react-color";

const chineseFonts = [
  "宋体",
  "黑体",
  "楷体",
  "微软雅黑",
  "华文细黑",
  "隶书",
  "华文楷体",
  "方正舒体",
  "华文行楷",
];

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  footerBgColor: string;
  setFooterBgColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  bold: boolean;
  setBold: (bold: boolean) => void;
  italic: boolean;
  setItalic: (italic: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  text,
  setText,
  footerBgColor,
  setFooterBgColor,
  textColor,
  setTextColor,
  bold,
  setBold,
  italic,
  setItalic,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}) => {
  const [colorMenuAnchorEl, setColorMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [colorPickerType, setColorPickerType] = useState<
    "footer" | "text" | null
  >(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFontSizeDialogOpen, setIsFontSizeDialogOpen] = useState(false);
  const [isFontFamilyDialogOpen, setIsFontFamilyDialogOpen] = useState(false);

  const handleFontFamilyClick = () => {
    setIsFontFamilyDialogOpen(true);
  };

  const handleFontFamilyChange = (event: SelectChangeEvent<string>) => {
    setFontFamily(event.target.value as string);
    setIsFontFamilyDialogOpen(false);
  };

  const handleFontMenuClick = () => {
    setIsFontSizeDialogOpen(true);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    setIsFontSizeDialogOpen(false);
  };

  const handleColorMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setColorMenuAnchorEl(event.currentTarget);
  };

  const handleColorMenuClose = () => {
    setColorMenuAnchorEl(null);
  };

  const handleColorPickerOpen = (type: "footer" | "text") => {
    setColorPickerType(type);
    setIsColorPickerOpen(true);
    setColorMenuAnchorEl(null);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
    setColorPickerType(null);
  };

  const handleBoldToggle = () => {
    setBold(!bold);
  };

  const handleItalicToggle = () => {
    setItalic(!italic);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", gap: 1 }}>
      <ToggleButtonGroup exclusive>
        <ToggleButton value="fontFamily" onClick={handleFontFamilyClick}>
          <FontDownloadIcon />
        </ToggleButton>
        <ToggleButton value="fontSize" onClick={handleFontMenuClick}>
          <FormatSizeIcon />
        </ToggleButton>
        <ToggleButton value="bold" selected={bold} onClick={handleBoldToggle}>
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value="italic"
          selected={italic}
          onClick={handleItalicToggle}
        >
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton
          value="color"
          onClick={(e) => handleColorPickerOpen("footer")}
        >
          <ColorLensIcon />
        </ToggleButton>
        <ToggleButton
          value="textColor"
          onClick={(e) => handleColorPickerOpen("text")}
        >
          <FormatColorTextIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Dialog
        open={isFontFamilyDialogOpen}
        onClose={() => setIsFontFamilyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>选择字体</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>字体</InputLabel>
            <Select
              value={fontFamily}
              onChange={handleFontFamilyChange}
              sx={{ minWidth: 200 }}
            >
              {chineseFonts.map((family) => (
                <MenuItem key={family} value={family}>
                  {family}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFontFamilyDialogOpen(false)}>取消</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isFontSizeDialogOpen}
        onClose={() => setIsFontSizeDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>选择字号</DialogTitle>
        <DialogContent>
          {[18, 22, 32, 38].map((size) => (
            <Button
              key={size}
              onClick={() => handleFontSizeChange(size)}
              sx={{ minWidth: 200 }}
            >
              {size}
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFontSizeDialogOpen(false)}>取消</Button>
        </DialogActions>
      </Dialog>
      <Popover
        open={isColorPickerOpen}
        onClose={handleColorPickerClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <SketchPicker
          color={colorPickerType === "footer" ? footerBgColor : textColor}
          onChangeComplete={(color) =>
            colorPickerType === "footer"
              ? setFooterBgColor(color.hex)
              : setTextColor(color.hex)
          }
          width="200px"
        />
      </Popover>
    </Box>
  );
};

export default TextEditor;
