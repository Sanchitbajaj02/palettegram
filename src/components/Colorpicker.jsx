// eslint-disable-next-line react/prop-types
function Colorpicker({ setColors }) {
  const changeHandler = (event) => {
    const { name, value } = event.target;

    setColors((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        <div className="mb-3">
          <input
            type="text"
            name="color01"
            id="color01"
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
            onChange={changeHandler}
            placeholder="Enter 4th color"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#1C223A] outline-none focus:border-[#6A64F1] focus:shadow-md"
            maxLength={6}
          />
        </div>
      </div>
    </>
  );
}

export default Colorpicker;
