import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface FooterColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
}

const FooterColorPicker: React.FC<FooterColorPickerProps> = ({
  color,
  onColorChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onColorChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel id="footer-color-label">Footer Color</InputLabel>
      <Select
        labelId="footer-color-label"
        value={color}
        onChange={handleChange}
        label="Footer Color"
      >
        <MenuItem value="#000000">Black</MenuItem>
        <MenuItem value="#ffffff">White</MenuItem>
        <MenuItem value="#ff0000">Red</MenuItem>
        <MenuItem value="#00ff00">Green</MenuItem>
        <MenuItem value="#0000ff">Blue</MenuItem>
        {/* Add more colors as needed */}
      </Select>
    </FormControl>
  );
};

export default FooterColorPicker;
