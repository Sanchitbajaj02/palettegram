<<<<<<< Updated upstream
import {HexColorPicker} from 'react-colorful';
import {useState} from 'react';

type ColorpickerTypes = {
  colors: {
    color01: string
    color02: string
    color03: string
    color04: string
  };
  isPalleteTouched:boolean;
  setColors: any;
  setTouched:any;
};

// eslint-disable-next-line react/prop-types
function Colorpicker({ colors, setColors,setTouched,isPalleteTouched }: ColorpickerTypes) {
  const [selectedColorSection,setColorSection] = useState<number | null>(null);
  const changeHandler = (color:string) => {
    if(!isPalleteTouched){
      setTouched(true);
    }
    if(typeof color === 'string')
    setColors({...colors,[`color0` + selectedColorSection]:color});
=======
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

type ColorpickerTypes = {
  colors: {
    color01: string;
    color02: string;
    color03: string;
    color04: string;
  };
  isPalleteTouched: boolean;
  setColors: any;
  setTouched: any;
};

// eslint-disable-next-line react/prop-types
function Colorpicker({ colors, setColors, setTouched, isPalleteTouched }: ColorpickerTypes) {
  const [selectedColorSection, setColorSection] = useState<number | null>(null);
  const changeHandler = (color: string) => {
    if (!isPalleteTouched) {
      setTouched(true);
    }
    if (typeof color === "string")
      setColors({ ...colors, [`color0` + selectedColorSection]: color });
  };
  const showPicker = (id: number) => {
    if (id === selectedColorSection) {
      setColorSection(null);
    } else {
      setColorSection(id);
    }
>>>>>>> Stashed changes
  };
  const showPicker = (id:number)=>{
    if(id === selectedColorSection){
      setColorSection(null)
    }else{
      setColorSection(id);
    }
  }

  return (
    <>
<<<<<<< Updated upstream
    <div className='relative'>
    <div className="w-[300px] rounded-[0.8rem] h-[200px] bg-[#888A8A] mx-auto flex">
            <div
            onClick={()=>showPicker(1)} 
            className="cursor-pointer w-full rounded-tl-[0.8rem] rounded-bl-[0.8rem]" 
            style={{backgroundColor:typeof colors.color01 === 'string' && colors.color01 || ''}}
            ></div>
            <div
             onClick={()=>showPicker(2)} 
            className="cursor-pointer w-full " 
            style={{backgroundColor:typeof colors.color02 === 'string' && colors.color02 || ''}}

            ></div>
            <div
             onClick={()=>showPicker(3)} 
            className="cursor-pointer w-full" 
            style={{backgroundColor:typeof colors.color03 === 'string' && colors.color03 || ''}}
            ></div>
            <div
             onClick={()=>showPicker(4)} 
            className="cursor-pointer w-full rounded-tr-[0.8rem] rounded-br-[0.8rem]" 
            style={{backgroundColor:typeof colors.color04 === 'string' && colors.color04 || ''}}
            ></div>
      
          </div>
          {
            selectedColorSection && 
            <>
            {/* <div className='fixed top-0 left-0 right-0 bottom-0' onClick={handleClose}></div> */}
            <div className='absolute top-0'>
            <HexColorPicker style={{width:'100px'}} onChange={changeHandler} color={selectedColorSection && (selectedColorSection === 1 && colors['color01'] ||  selectedColorSection === 2 && colors['color02'] || selectedColorSection === 3 && colors['color03'] || selectedColorSection === 4 && colors['color04']) || ''}/>
            </div>
            </>
          }
    </div>
=======
      <div className="relative">
        <div className="w-[300px] rounded-[0.8rem] h-[200px] bg-[#888A8A] mx-auto flex">
          <div
            onClick={() => showPicker(1)}
            className="cursor-pointer w-full rounded-tl-[0.8rem] rounded-bl-[0.8rem]"
            style={{
              backgroundColor: (typeof colors.color01 === "string" && colors.color01) || "",
            }}
          ></div>
          <div
            onClick={() => showPicker(2)}
            className="cursor-pointer w-full "
            style={{
              backgroundColor: (typeof colors.color02 === "string" && colors.color02) || "",
            }}
          ></div>
          <div
            onClick={() => showPicker(3)}
            className="cursor-pointer w-full"
            style={{
              backgroundColor: (typeof colors.color03 === "string" && colors.color03) || "",
            }}
          ></div>
          <div
            onClick={() => showPicker(4)}
            className="cursor-pointer w-full rounded-tr-[0.8rem] rounded-br-[0.8rem]"
            style={{
              backgroundColor: (typeof colors.color04 === "string" && colors.color04) || "",
            }}
          ></div>
        </div>
        {selectedColorSection && (
          <>
            {/* <div className='fixed top-0 left-0 right-0 bottom-0' onClick={handleClose}></div> */}
            <div className="absolute top-0">
              <HexColorPicker
                style={{ width: "100px" }}
                onChange={changeHandler}
                color={
                  (selectedColorSection &&
                    ((selectedColorSection === 1 && colors["color01"]) ||
                      (selectedColorSection === 2 && colors["color02"]) ||
                      (selectedColorSection === 3 && colors["color03"]) ||
                      (selectedColorSection === 4 && colors["color04"]))) ||
                  ""
                }
              />
            </div>
          </>
        )}
      </div>
>>>>>>> Stashed changes

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
