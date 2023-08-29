"use client";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

function MobileSideBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <button
        className="hover:border border-white rounded-lg p-1"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Bars3Icon className="h-8 w-8 text-white cursor-pointer" />
      </button>
      <div
        className={`absolute top-0 flex w-screen h-screen transition-all duration-300 ease-in-out ${
          open ? "right-0" : "right-full"
        }`}
      >
        <div className="bg-[#202123] overflow-y-auto max-w-[80%] lg:min-w-[20rem]">
          <SideBar />
        </div>
        <div className="flex-1 relative bg-slate-900/50">
          <div
            className="absolute top-3 right-3 border border-white rounded-lg p-1"
            onClick={() => {
              setOpen(false);
            }}
          >
            <XMarkIcon className="h-8 w-8 text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileSideBar;
