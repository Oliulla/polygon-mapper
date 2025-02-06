import React from "react";
import { ChromePicker } from "react-color";

interface ColorPickerProps {
  initialColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor,
  onColorChange,
}) => {
  const handleColorChange = (color: any) => {
    onColorChange(color.hex);
  };

  return (
    <div className="color-picker">
      <label htmlFor="colorInput" className="text-sm font-semibold">
        Choose Color
      </label>
      <ChromePicker
        color={initialColor}
        onChangeComplete={handleColorChange}
        disableAlpha={true}
      />
    </div>
  );
};

export default ColorPicker;
