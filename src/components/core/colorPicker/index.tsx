import { HexColorPicker } from "react-colorful";
import { useState } from "react";

type ColorpickerTypes = {
  colors: {
    [key: string]: string;
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
      const updatedColors = { ...colors, [`color0${selectedColorSection}`]: color };
      setColors(updatedColors);
      setColorInputs(updatedColors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: number) => {
    const value = e.target.value;
    setColorInputs({ ...colorInputs, [`color0${section}`]: value });
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
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
              onKeyUp={(e) => { if (e.key === 'Enter') showPicker(index + 1); }}
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

    {/* <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        
        <div className="mb-3">
          <input
            type="text"
            name="color01"
            id="color01"
            value={colors && String(colors.color01)}
            required={true}
            onChange={changeHandler}
            placeholder="Enter 1st color"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
            maxLength={6}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="color02"
            id="color02"
            required={true}
            value={colors && String(colors.color02)}
            onChange={changeHandler}
            placeholder="Enter 2nd color"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
            maxLength={6}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="color03"
            id="color03"
            required={true}
            value={colors && String(colors.color02)}
            onChange={changeHandler}
            placeholder="Enter 3rd color"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
            maxLength={6}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="color04"
            id="color04"
            required={true}
            value={colors && String(colors.color02)}
            onChange={changeHandler}
            placeholder="Enter 4th color"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
            maxLength={6}
          />
        </div>
      </div> */}
    </>
  );
}

export default Colorpicker;
