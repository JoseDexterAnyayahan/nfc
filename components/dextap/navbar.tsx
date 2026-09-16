"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiRadio,
} from "react-icons/fi";

const links = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-black/10 bg-white/75 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/75 dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
            : "border-black/5 bg-white/55 backdrop-blur-xl dark:border-white/10 dark:bg-black/55"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center"
          onClick={handleLinkClick}
          aria-label="DexTap Home"
        >
          {/* Circular Logo */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-black">
            <Image
              src="/dextap-logo.png"
              alt="DexTap"
              fill
              priority
              className="object-cover"
              sizes="44px"
            />
          </div>

          {/* Brand */}
          <div className="ml-4 flex items-center gap-2.5">
            <span className="text-[15px] font-semibold tracking-[-0.03em]">
              DexTap
            </span>

            {/* Sideways NFC Symbol */}
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-black/60 transition-colors dark:border-white/10 dark:text-white/60"
              aria-label="NFC"
              title="NFC"
            >
              <FiRadio
                size={14}
                strokeWidth={1.7}
                className="rotate-90"
              />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium text-black/55 transition hover:text-black dark:text-white/55 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
              mounted
                ? theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/[0.05] disabled:cursor-default dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08]"
          >
            {mounted ? (
              theme === "dark" ? (
                <FiSun size={15} />
              ) : (
                <FiMoon size={15} />
              )
            ) : (
              <FiMoon size={15} />
            )}
          </button>

          {/* Let's Talk */}
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold text-white transition hover:scale-[1.02] hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Let's Talk
            <FiArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
              mounted
                ? theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/[0.05] disabled:cursor-default dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08]"
          >
            {mounted ? (
              theme === "dark" ? (
                <FiSun size={15} />
              ) : (
                <FiMoon size={15} />
              )
            ) : (
              <FiMoon size={15} />
            )}
          </button>

          {/* Menu */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black/[0.05] dark:border-white/10 dark:text-white dark:hover:bg-white/[0.08]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-black/10 bg-white/90 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/90 md:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                {link.label}

                <FiArrowUpRight size={15} className="opacity-40" />
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 flex items-center justify-center rounded-2xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}