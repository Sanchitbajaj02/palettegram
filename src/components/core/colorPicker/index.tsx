import { HexColorPicker } from "react-colorful";
import { useState } from "react";

type ColorpickerTypes = {
  colors: {
    [key: string]: string; // Add an index signature for colors
  };
  isPalleteTouched: boolean;
  setColors: any;
  setTouched: any;
};


// eslint-disable-next-line react/prop-types
function Colorpicker({ colors, setColors, setTouched, isPalleteTouched }: ColorpickerTypes) {
  const [selectedColorSection, setColorSection] = useState<number | null>(null);
  const [colorInputs, setColorInputs] = useState(colors);

  const changeHandler = (color: string) => {
    if (!isPalleteTouched) {
      setTouched(true);
    }
    if (typeof color === "string") {
      setColors({ ...colors, [`color0${selectedColorSection}`]: color });
      setColorInputs({ ...colorInputs, [`color0${selectedColorSection}`]: color });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: number) => {
    const value = e.target.value;
    setColorInputs({ ...colorInputs, [`color0${section}`]: value });
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      changeHandler(value);
    }
  };

  const showPicker = (id: number) => {
    if (id === selectedColorSection) {
      setColorSection(null);
    } else {
      setColorSection(id);
    }
  };

  return (
    <>
      <div className="relative mx-auto">
        <div className="relative pl-[70px] pr-2">
        <div className="mx-auto w-[400px] rounded-[0.8rem] h-[175px] bg-[#888A8A] flex">
          {['color01', 'color02', 'color03', 'color04'].map((color, index) => (
            <div
              key={color}
              onClick={() => showPicker(index + 1)}
              className={`cursor-pointer w-full ${index === 0 ? 'rounded-tl-[0.8rem] rounded-bl-[0.8rem]' : ''} ${index === 3 ? 'rounded-tr-[0.8rem] rounded-br-[0.8rem]' : ''}`}
              style={{
                backgroundColor: colors[color],
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-center mt-1 mx-20">
          {['color01', 'color02', 'color03', 'color04'].map((color, index) => (
            <input
              key={color}
              type="text"
              value={colorInputs[color]}
              onChange={(e) => handleInputChange(e, index + 1)}
              placeholder="#000000"
              className="w-20 text-center mx-2.5"
            />
          ))}
        </div>
        </div>
        {selectedColorSection && (
          <div className="absolute top-0">
            <HexColorPicker
              style={{ width: "100px" }}
              onChange={changeHandler}
              color={colors[`color0${selectedColorSection}`]}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Colorpicker;
