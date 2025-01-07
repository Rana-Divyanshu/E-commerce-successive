import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

function RollDicePopup() {
  const [show, setShow] = useState(false);

  return (
    <div className="fixed right-2 bottom-[7%] min-w-fit min-h-fit bg-transparent">
      <div
        className="relative h-10 w-10 rounded-tl-md rounded-bl-md outline outline-2 outline-bordercommon shadow flex items-center justify-center cursor-pointer bg-white"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? <BsChevronRight /> : <BsChevronLeft />}
        <div
          className={`absolute bottom-10 ${
            show ? "right-0" : "right-[-200px]"
          }  transition-all ease-linear duration-1000 flex flex-col items-center justify-center bg-white shadow min-h-fit min-w-fit whitespace-nowrap p-4`}
        >
          <div className="h-[100px] w-[160px] flex items-center justify-center overflow-clip">
            <Image
              src="/dice.gif"
              alt="Roll Dice"
              width={200}
              height={200}
              className="gif-animation-img"
            />
          </div>
          <Link
            href="/roll-the-dice"
            className="cursor-pointer text-center w-full"
          >
            <p className="text-primaryText">Getting Bored!!</p>
            <p className="text-sm text-secText underline underline-offset-4">
              Try our game
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RollDicePopup;
