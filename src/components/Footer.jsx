import React from "react";
import Logo from "../assets/svg/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaDiscord, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const resource = t("footer.resources");
  const follow = t("footer.follow");
  const legal = t("footer.legal");

  //  ? "text-primaryText dark:text-white underline underline-offset-4"
  //     : "text-secText dark:text-gray-400"
  return (
    <footer className="footer bg-footerBG dark:bg-[#081733] dark:border-t dark:bordet-white overflow-x-clip">
      <div className="footer-container w-full p-4 py-6 lg:py-8">
        <div className="footer-container-top md:flex md:justify-between px-20">
          <Image src={Logo} alt="Logo" className="w-[170px] h-auto" priority />
          <div className="footer-navlinks-container grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {resource?.title}
              </h2>
              <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 font-medium">
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link
                    href="https://flowbite.com/"
                    className="hover:underline"
                  >
                    {resource?.flowbite}
                  </Link>
                </li>
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    {resource?.tailwindCSS}
                  </Link>
                </li>
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link href="https://nextjs.org/" className="hover:underline">
                    {resource?.nextJS}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {follow?.title}
              </h2>
              <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 font-medium">
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    {follow?.github}
                  </Link>
                </li>
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    {follow?.discord}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {legal?.title}
              </h2>
              <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 font-medium">
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link href="#" className="hover:underline">
                    {legal?.privacyPolicy}
                  </Link>
                </li>
                <li className="text-secText dark:text-gray-400 hover:text-[#0d134e] hover:dark:text-white">
                  <Link href="#" className="hover:underline">
                    {legal?.termsAndConditions}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
        <div className="footer-container-bottom flex items-center justify-between px-20">
          <span
            className="text-sm text-gray sm:text-center dark:text-white"
            dir="ltr"
          >
            © 2024 cwc. All Rights Reserved.
          </span>
          <div className="footer-social-container flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="https://www.facebook.com/"
              className="w-full md:w-fit block py-2 px-3"
              target="_blank"
            >
              <FaFacebookF className="text-primaryText dark:text-white" />
            </Link>
            <Link
              href="https://www.discord.com"
              className="w-full md:w-fit block py-2 px-3"
              target="_blank"
            >
              <FaDiscord className="text-primaryText dark:text-white" />
            </Link>
            <Link
              href="https://www.twitter.com"
              className="w-full md:w-fit block py-2 px-3"
              target="_blank"
            >
              <BsTwitterX className="text-primaryText dark:text-white" />
            </Link>
            <Link
              href="https://www.github.com"
              className="w-full md:w-fit block py-2 px-3"
              target="_blank"
            >
              <FaGithub className="text-primaryText dark:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
