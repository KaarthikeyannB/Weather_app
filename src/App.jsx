import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Chart from "./pages/Chart";
import SideBar from "./components/SideBar";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 text-black dark:text-white flex flex-col min-w-screen">
        <div className="flex items-center justify-between mb-4">
        <Link to="/">
          <h1 className="text-2xl dark:text-white p-2 tracking-wide">
            Weather App
          </h1>
        </Link>

        <IoIosMenu
          className="md:hidden text-2xl dark:text-white cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-50 dark:bg-gray-900 bg-opacity-95 dark:text-white flex flex-col items-center justify-center md:hidden bg-gray-800">
          <IoMdClose
            className="md:hidden text-2xl dark:text-white absolute top-20 left-4 cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
          />
          <nav className="flex flex-col gap-6 text-xl">
            <Link 
               to="/"
               className="hover:text-gray-400"
              onClick={() => setShowMenu(false)}
            >
              Home
            </Link>
            <Link 
               to="/favourites"
               className="hover:text-gray-400"
              onClick={() => setShowMenu(false)}
            >
              Favourites
            </Link>
            <Link 
               to="/charts"
               className="hover:text-gray-400"
              onClick={() => setShowMenu(false)}
            >
              Charts
            </Link>
          </nav>
        </div>
      )}

      <div className="md:grid md:grid-cols-[20%_80%] gap-1 flex-1 h-full">
        <div className="h-full dark:bg-gray-800">
          <SideBar />
        </div>
        <div className="flex flex-col h-full dark:bg-gray-800">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/charts" element={<Chart />} />
          </Routes>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`p-4 fixed bottom-5 right-5 rounded-full shadow-lg transition-colors duration-300 
           ${theme === "dark" ? "bg-white text-black" : "bg-gray-500 text-white "}`}
      >
        {theme === "dark" ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
}

export default App;