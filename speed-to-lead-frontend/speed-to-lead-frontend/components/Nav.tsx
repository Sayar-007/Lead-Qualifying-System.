"use client";

import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

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
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-on-primary font-body-md text-sm">
              Hi, {user.user_metadata.full_name || user.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="bg-transparent border border-secondary text-secondary px-6 py-3 rounded-full font-label-caps text-label-caps hover:bg-secondary/10 transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="bg-secondary text-on-secondary px-6 py-3 rounded-full font-label-caps text-label-caps hover:bg-on-secondary-fixed-variant transition-colors"
          >
            Client Login
          </button>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </nav>
  );
}
