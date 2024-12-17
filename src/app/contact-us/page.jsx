"use client";
import React from "react";
import contactUsBanner from "../../assets/img/contactUs-banner.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const { t } = useTranslation();
  const infoAboutUsT = t("contactUs.infoAboutUs");
  const contactWayT = t("contactUs.contactWay");
  const getInTouchT = t("contactUs.getInTouch");

  return (
    <>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="contact-us-col flex flex-col gap-[1rem] w-1/2">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue dark:text-white">
            {infoAboutUsT.title}
          </div>
          <div className="contact-us-content text-gray dark:text-slate-200">
            {infoAboutUsT.description}
          </div>
          <div className="color-dots-row flex items-center gap-[0.5rem] mt-[1rem]">
            <div className="color-dots dot-1 h-[18px] w-[18px] rounded-full bg-themeBlue dark:bg-indigo-200"></div>
            <div className="color-dots dot-4 h-[18px] w-[18px] rounded-full bg-[#819fde]"></div>
            <div className="color-dots dot-2 h-[18px] w-[18px] rounded-full bg-secondary"></div>
            <div className="color-dots dot-3 h-[18px] w-[18px] rounded-full bg-[#58586e]"></div>
          </div>
        </div>
        <div className="contact-us-col flex flex-col gap-[1rem] w-1/2">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue dark:text-white">
            {contactWayT.title}
          </div>
          <div className="contact-us-content text-gray dark:text-slate-200">
            <div className="contact-us-content-row flex mb-[2rem]">
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-1  bg-themeBlue dark:bg-indigo-200 h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>{contactWayT.tel} : 9414-207-871</p>
                  <p>{contactWayT.email}: shop@store.com</p>
                </div>
              </div>
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-2  bg-[#819fde] h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>{contactWayT.supportForm}</p>
                  <p>{contactWayT.supportTime}</p>
                </div>
              </div>
            </div>
            <div className="contact-us-content-row flex mb-[2rem]">
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-3  bg-secondary h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>
                    Successive Technologies, Windsor Grand, Plot number, 1- C,
                    Raipur Khadar, Sector 126, Noida, Uttar Pradesh 201313
                  </p>
                </div>
              </div>
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-4  bg-[#58586e] h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>{contactWayT.shipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="getintouch-form-div w-1/2 flex flex-col gap-[1rem]  ">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue dark:text-white">
            {getInTouchT.title}
          </div>

          <div className="contact-us-content text-gray dark:text-slate-200">
            {getInTouchT.description}
          </div>
          <div className="contact-us-form flex flex-col items-start gap-[1.5rem]">
            <div className="form-row flex w-full gap-[1.25rem]">
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder={getInTouchT.namePlaceholder}
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder={getInTouchT.emailPlaceholder}
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="text"
                placeholder={getInTouchT.subjectPlaceholder}
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <textarea
                rows={7}
                placeholder={getInTouchT.messagePlaceholder}
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray textarea resize-none"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                {getInTouchT.sendMail}
              </button>
            </div>
          </div>
        </div>
        <div className="contactus-bg-div w-1/2 ">
          <Image
            src={contactUsBanner}
            alt="contactus"
            className="contactus-bg w-full"
          />
        </div>
      </section>
    </>
  );
}

export default ContactUs;
