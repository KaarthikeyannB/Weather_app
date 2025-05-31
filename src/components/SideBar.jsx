import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="hidden md:flex flex-col h-full dark:bg-gray-800 dark:text-white p-4">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/favourites" className="hover:text-gray-400">Favourites</Link>
        <Link to="/charts" className="hover:text-gray-400">Charts</Link>
      </nav>
    </div>
  );
};

export default SideBar;