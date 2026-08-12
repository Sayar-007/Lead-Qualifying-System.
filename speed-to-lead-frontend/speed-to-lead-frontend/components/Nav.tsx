"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-unit max-w-container-max mx-auto transition-colors duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
      id="main-nav"
    >
      <div className="font-display-lg text-headline-md text-on-primary dark:text-primary-fixed">
        Anders &amp; Vale
      </div>
      <div className="hidden md:flex space-x-gutter">
        <a
          className="font-label-caps text-label-caps text-on-primary-fixed-variant border-b-2 border-on-primary-fixed-variant pb-1 hover:bg-primary-container/50 transition-all opacity-80 scale-95"
          href="#listings"
        >
          Listings
        </a>
        <a
          className="font-label-caps text-label-caps text-on-primary-container hover:text-on-primary hover:bg-primary-container/50 transition-all"
          href="#why"
        >
          Services
        </a>
        <a
          className="font-label-caps text-label-caps text-on-primary-container hover:text-on-primary hover:bg-primary-container/50 transition-all"
          href="#"
        >
          About
        </a>
        <a
          className="font-label-caps text-label-caps text-on-primary-container hover:text-on-primary hover:bg-primary-container/50 transition-all"
          href="#contact"
        >
          Contact
        </a>
      </div>
      <div>
        <button className="bg-secondary text-on-secondary px-6 py-3 rounded-full font-label-caps text-label-caps hover:bg-on-secondary-fixed-variant transition-colors">
          Client Login
        </button>
      </div>
    </nav>
  );
}
