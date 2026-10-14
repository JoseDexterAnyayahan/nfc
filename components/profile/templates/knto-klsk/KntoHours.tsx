"use client";

import { FaClock, FaRegSun, FaRegMoon } from "react-icons/fa";
import { kntoColors as c } from "./knto-styles";

export default function KntoHours() {
  return (
    <section id="knto-hours" className="py-10 sm:py-14">
      <div
        className="border p-5 sm:p-8"
        style={{
          borderColor: c.line,
          backgroundColor: c.cream,
          color: c.ink,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.23em]"
              style={{ color: c.wood }}
            >
              Come by anytime
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              House hours
            </h2>
          </div>

          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center border"
            style={{ borderColor: c.line, color: c.wood }}
          >
            <FaClock size={17} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div
            className="border p-4 sm:p-5"
            style={{
              borderColor: c.line,
              backgroundColor: c.paper,
            }}
          >
            <FaRegSun size={18} style={{ color: c.gold }} />

            <h3 className="mt-4 text-sm font-semibold">
              Sunday – Thursday
            </h3>

            <p className="mt-2 text-xl font-semibold tracking-tight">
              11:00 AM – 10:00 PM
            </p>

            <p
              className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ color: c.muted }}
            >
              Last order · 9:20 PM
            </p>
          </div>

          <div
            className="border p-4 sm:p-5"
            style={{
              borderColor: c.line,
              backgroundColor: c.paper,
            }}
          >
            <FaRegMoon size={18} style={{ color: c.gold }} />

            <h3 className="mt-4 text-sm font-semibold">
              Friday – Saturday
            </h3>

            <p className="mt-2 text-xl font-semibold tracking-tight">
              11:00 AM – 11:00 PM
            </p>

            <p
              className="mt-3 text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ color: c.muted }}
            >
              Last order · 10:20 PM
            </p>
          </div>
        </div>

        <p
          className="mt-5 text-xs leading-6"
          style={{ color: c.muted }}
        >
          Please place your order before the last-order time.
        </p>
      </div>
    </section>
  );
}