import React, { useState } from "react";
import { MdMenu, MdClose, MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import logo from "../assets/Logo.png";
import "../index.css";

export const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  {
    id: 2,
    title: "Services",
    dropdown: true,
    submenu: [
      { id: 21, title: "Land and house price prediction", link: "/house prediction" },
      { id: 22, title: "Construction cost estimation", link: "/cost estimation" },
      { id: 23, title: "SolarPanel", link: "/solar" },
      { id: 24, title: "Interior Design", link: "/interior" },
    ],
  },
  { id: 3, title: "AboutUs", link: "/about" },
  { id: 4, title: "ContactUs", link: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <div className="ml-2">
            <span className="text-lg text-yellow-600 font-bold">NextGen </span>
            <span className="text-lg text-black font-extrabold">Construction</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 text-black">
          {NavbarMenu.map((item) =>
            item.dropdown ? (
              <li key={item.id} className="relative group">
                <button
                  className="flex items-center gap-1 hover:text-amber-600 transition"
                  onMouseEnter={() => setDropdownOpen(item.id)}
                  // onMouseLeave={() => setDropdownOpen(null)}
                >
                  {item.title} <MdKeyboardArrowDown className="group-hover:rotate-180 duration-300" />
                </button>
                {dropdownOpen === item.id && (
                  <ul 
                  onMouseLeave={() => setDropdownOpen(null)}
                  className="absolute left-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                    {item.submenu.map((sub) => (
                      <li
                       
                     
                      key={sub.id} className="border-b border-gray-700 last:border-none">
                        <a href={sub.link} className="block px-4 py-2 hover:bg-gray-700 transition">
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.id}>
                <a href={item.link} className="hover:text-amber-600 transition">
                  {item.title}
                </a>
              </li>
            )
          )}

          {/* Search Bar */}
          <li>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 rounded-full text-black border border-gray-400 focus:outline-none w-36"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <MdSearch className="text-black" />
              </button>
            </form>
          </li>

          {/* Login Button */}
          <li>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-4 py-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 py-6 shadow-md">
          <ul className="flex flex-col items-center gap-4 text-white">
            {NavbarMenu.map((item) =>
              item.dropdown ? (
                <li key={item.id} className="w-full text-center">
                  <button
                    className="flex justify-center items-center gap-1 w-full py-2 hover:text-amber-600 transition"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    {item.title} <MdKeyboardArrowDown />
                  </button>
                  {dropdownOpen === item.id && (
                    <ul className="w-full bg-gray-700 rounded-md mt-1">
                      {item.submenu.map((sub) => (
                        <li key={sub.id} className="border-b border-gray-600 last:border-none">
                          <a href={sub.link} className="block px-4 py-2 hover:bg-gray-600 transition">
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.id}>
                  <a href={item.link} className="block py-2 text-lg hover:text-amber-600 transition">
                    {item.title}
                  </a>
                </li>
              )
            )}

            {/* Mobile Login Button */}
            <li>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="px-4 py-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
