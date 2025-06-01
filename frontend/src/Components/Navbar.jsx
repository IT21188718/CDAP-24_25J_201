import React, { useState } from "react";
import { MdMenu, MdClose, MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../index.css";

export const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  {
    id: 2,
    title: "Services",
    dropdown: true,
    submenu: [
      { id: 21, title: "Land and house price prediction", link: "/house-prediction" },
      { id: 22, title: "Construction cost estimation", link: "/cost-estimation" },
      {
        id: 23,
        title: "SolarPanel",
        dropdown: true,
        submenu: [
          { id: 231, title: "Solar Inquire", link: "/solar" },
          { id: 232, title: "Fault Detection", link: "/solar-fault-detection" },
        ],
      },
      { id: 24, title: "Interior Design", link: "/interior" },
    ],
  },
  { id: 3, title: "AboutUs", link: "/about" },
  { id: 4, title: "ContactUs", link: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subDropdownOpen, setSubDropdownOpen] = useState(null); // for SolarPanel submenu dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
    setSubDropdownOpen(null); // close subdropdown when toggling main dropdown
  };

  const toggleSubDropdown = (id) => {
    setSubDropdownOpen(subDropdownOpen === id ? null : id);
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
                  onMouseEnter={() => toggleDropdown(item.id)}
                  // onMouseLeave={() => setDropdownOpen(null)}
                >
                  {item.title} <MdKeyboardArrowDown className="group-hover:rotate-180 duration-300" />
                </button>

                {dropdownOpen === item.id && (
                  <ul
                    onMouseLeave={() => setDropdownOpen(null)}
                    className="absolute left-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg"
                  >
                    {item.submenu.map((sub) =>
                      sub.dropdown ? (
                        <li
                          key={sub.id}
                          className="relative group border-b border-gray-700 last:border-none"
                          onMouseEnter={() => toggleSubDropdown(sub.id)}
                          // onMouseLeave={() => setSubDropdownOpen(null)}
                        >
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                            {sub.title} <MdKeyboardArrowDown />
                          </button>

                          {subDropdownOpen === sub.id && (
                            <ul className="absolute left-full top-0 mt-0 ml-1 w-48 bg-gray-700 rounded-md shadow-lg">
                              {sub.submenu.map((subSub) => (
                                <li key={subSub.id} className="border-b border-gray-600 last:border-none">
                                  <Link
                                    to={subSub.link}
                                    className="block px-4 py-2 hover:bg-gray-600 transition"
                                    onClick={() => {
                                      setDropdownOpen(null);
                                      setSubDropdownOpen(null);
                                    }}
                                  >
                                    {subSub.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={sub.id} className="border-b border-gray-700 last:border-none">
                          <Link
                            to={sub.link}
                            className="block px-4 py-2 hover:bg-gray-700 transition"
                            onClick={() => setDropdownOpen(null)}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.id}>
                <Link to={item.link} className="hover:text-amber-600 transition">
                  {item.title}
                </Link>
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
                      {item.submenu.map((sub) =>
                        sub.dropdown ? (
                          <li key={sub.id} className="w-full">
                            <button
                              className="flex justify-between items-center w-full px-4 py-2 hover:bg-gray-600 transition"
                              onClick={() => toggleSubDropdown(sub.id)}
                            >
                              {sub.title} <MdKeyboardArrowDown />
                            </button>
                            {subDropdownOpen === sub.id && (
                              <ul className="w-full bg-gray-600 rounded-md mt-1">
                                {sub.submenu.map((subSub) => (
                                  <li key={subSub.id} className="border-b border-gray-500 last:border-none">
                                    <Link
                                      to={subSub.link}
                                      className="block px-4 py-2 hover:bg-gray-500 transition"
                                      onClick={() => {
                                        setDropdownOpen(null);
                                        setSubDropdownOpen(null);
                                        setMenuOpen(false);
                                      }}
                                    >
                                      {subSub.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ) : (
                          <li key={sub.id} className="border-b border-gray-600 last:border-none">
                            <Link
                              to={sub.link}
                              className="block px-4 py-2 hover:bg-gray-600 transition"
                              onClick={() => {
                                setDropdownOpen(null);
                                setMenuOpen(false);
                              }}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="block py-2 text-lg hover:text-amber-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
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
