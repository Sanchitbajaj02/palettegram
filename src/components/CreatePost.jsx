import logo from "../logo.svg";
const CreatePost = () => {
  return (
    <div className="flex p-4 items-center border border-1 gap-2 justify-center">
      <img className="w-10 h-10" src={logo} alt="profile" />
      <input
        type="text"
        placeholder="Placeholder"
        className="p-3 placeholder-slate-300 text-slate-600 bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-full ring-[#F1396D]"
      />
    </div>
  );
};
export default CreatePost;
