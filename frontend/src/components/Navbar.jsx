import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FiAlignJustify } from "react-icons/fi";
import  Logo  from "../assets/hd.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLinks, setActiveLinks] = useState("#home");

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Services" },
    { href: "#teams", label: "Teams" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/190 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

        <div className="flex items-center justify-between w-full md:w-auto">

          <div className="flex items-center gap-1 cursor-pointer">
            <div className="flex gap-2 items-center mb-2">
          <div className="bg-rose-700/90 text-xl hover:bg-rose-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-doto transition-opacity cursor-pointer">
            H
          </div>
          <div className="hover:bg-blue-700/80 font-doto bg-blue-700 w-10 h-10 text-xl -ml-4 rounded-full flex items-center justify-center text-white font-bold transition-opacity cursor-pointer">
            D
          </div>
        </div>
          </div>


          <button
            className="md:hidden ml-auto text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <RxCross1 className="h-6 w-6" />
            ) : (
              <FiAlignJustify className="h-6 w-6" />
            )}
          </button>
        </div>


        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setActiveLinks(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all
                ${activeLinks === link.href
                  ? "text-blue-600 after:w-full"
                  : "text-gray-700 hover:text-gray-900"
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>


        <div className="hidden md:block">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
            <a href="/signin/">Sign In</a>
          </button>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => {
                  setActiveLinks(link.href);
                  setIsMenuOpen(false);
                }}
                className={`block text-sm font-medium py-2 ${activeLinks === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {link.label}
              </a>
            ))}
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
