"use client";
import React, { useState } from "react";
import contactUsBanner from "../../assets/img/contactUs-banner.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

function ContactUs() {
  const { t } = useTranslation();
  const infoAboutUsT = t("contactUs.infoAboutUs");
  const contactWayT = t("contactUs.contactWay");
  const getInTouchT = t("contactUs.getInTouch");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [charCount, setCharCount] = useState(0);

  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || !/^[A-Za-z ]{3,}$/.test(name)) {
      toast.error(
        "Name must be at least 3 alphabets and can only contain spaces."
      );
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!subject.trim() || subject.length < 3) {
      toast.error("Subject must be at least 3 characters.");
      return false;
    }
    if (!message.trim() || message.trim().length < 100) {
      toast.error(
        "Message must be at least 100 characters long and cannot contain only spaces."
      );
      return false;
    }
    return true;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     toast.success("Query sent");
  //     setFormData({ name: "", email: "", subject: "", message: "" });
  //     setCharCount(0);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.dismiss();
      toast.loading("Sending...");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          toast.dismiss();
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setCharCount(0);
        } else {
          toast.dismiss();
          toast.error("Failed to send message.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.dismiss();
        toast.error("Some error occurred.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "message") setCharCount(value.trim().length);
  };

  return (
    <>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="contact-us-col flex flex-col gap-[1rem] w-1/2">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue dark:text-white">
            {infoAboutUsT?.title}
          </div>
          <div className="contact-us-content text-gray dark:text-slate-200">
            {infoAboutUsT?.description}
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
            {contactWayT?.title}
          </div>
          <div className="contact-us-content text-gray dark:text-slate-200">
            <div className="contact-us-content-row flex mb-[2rem]">
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-1  bg-themeBlue dark:bg-indigo-200 h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>{contactWayT?.tel} : 9414-207-871</p>
                  <p>{contactWayT?.email}: shop@store.com</p>
                </div>
              </div>
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-2  bg-[#819fde] h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>{contactWayT?.supportForm}</p>
                  <p>{contactWayT?.supportTime}</p>
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
                  <p>{contactWayT?.shipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="getintouch-form-div w-1/2 flex flex-col gap-[1rem]  ">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue dark:text-white">
            {getInTouchT?.title}
          </div>

          <div className="contact-us-content text-gray dark:text-slate-200">
            {getInTouchT?.description}
          </div>
          <form
            className="contact-us-form flex flex-col items-start gap-[1.5rem]"
            onSubmit={handleSubmit}
          >
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={getInTouchT?.namePlaceholder}
                className="contact-form-input w-full dark:bg-transparent dark:text-white outline outline-1 outline-secondary focus:outline-themeBlue dark:focus:outline-white rounded px-[15px] py-[10px] transition-all duration-400 placeholder:text-gray"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder={getInTouchT?.emailPlaceholder}
                className="contact-form-input w-full dark:bg-transparent dark:text-white outline outline-1 outline-secondary focus:outline-themeBlue dark:focus:outline-white rounded px-[15px] py-[10px] transition-all duration-400 placeholder:text-gray"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                placeholder={getInTouchT?.subjectPlaceholder}
                className="contact-form-input w-full dark:bg-transparent dark:text-white outline outline-1 outline-secondary focus:outline-themeBlue dark:focus:outline-white rounded px-[15px] py-[10px] transition-all duration-400 placeholder:text-gray"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem] relative">
              <textarea
                name="message"
                value={formData.message}
                placeholder={getInTouchT?.messagePlaceholder}
                className="contact-form-input w-full dark:bg-transparent dark:text-white outline outline-1 outline-secondary focus:outline-themeBlue dark:focus:outline-white rounded px-[15px] py-[10px] transition-all duration-400 placeholder:text-gray textarea resize-none"
                rows={7}
                onChange={handleChange}
                required
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray">{`${charCount}/100`}</span>
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                {getInTouchT?.sendMail}
              </button>
            </div>
          </form>
          {/* <div className="contact-us-form flex flex-col items-start gap-[1.5rem]">
            <div className="form-row flex w-full gap-[1.25rem]">
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder={getInTouchT?.namePlaceholder}
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder={getInTouchT?.emailPlaceholder}
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="text"
                placeholder={getInTouchT?.subjectPlaceholder}
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <textarea
                rows={7}
                placeholder={getInTouchT?.messagePlaceholder}
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray textarea resize-none"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                {getInTouchT?.sendMail}
              </button>
            </div>
          </div> */}
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
