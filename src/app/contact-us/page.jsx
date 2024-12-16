import React from "react";
import contactUsBanner from "../../assets/img/contactUs-banner.png";
import Image from "next/image";

function ContactUs() {
  return (
    <>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="contact-us-col flex flex-col gap-[1rem] w-1/2">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue">
            Information About Us
          </div>
          <div className="contact-us-content text-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
            neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
            tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
            vitae lobortis quis bibendum quam.
          </div>
          <div className="color-dots-row flex items-center gap-[0.5rem] mt-[1rem]">
            <div className="color-dots dot-1 h-[18px] w-[18px] rounded-full bg-themeBlue"></div>
            <div className="color-dots dot-4 h-[18px] w-[18px] rounded-full bg-[#819fde]"></div>
            <div className="color-dots dot-2 h-[18px] w-[18px] rounded-full bg-secondary"></div>
            <div className="color-dots dot-3 h-[18px] w-[18px] rounded-full bg-[#58586e]"></div>
          </div>
        </div>
        <div className="contact-us-col flex flex-col gap-[1rem] w-1/2">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue">
            Contact Way
          </div>
          <div className="contact-us-content text-gray">
            <div className="contact-us-content-row flex mb-[2rem]">
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-1  bg-themeBlue h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>Tel: 9414-207-871</p>
                  <p>E-Mail: shop@store.com</p>
                </div>
              </div>
              <div className="contact-us-content-col flex items-center gap-[0.75rem] w-1/2">
                <div className="contact-us-content-col-dot dot-2  bg-[#819fde] h-[30px] w-[30px] rounded-full"></div>
                <div className="contact-us-content-col-text w-[80%] text-[14px]">
                  <p>Support Forum</p>
                  <p>For over 24hr</p>
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
                  <p>Reasonable Standard shipping on all orders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contactus-row flex gap-[6rem] px-[15%] py-[3rem]">
        <div className="getintouch-form-div w-1/2 flex flex-col gap-[1rem]  ">
          <div className="contact-us-title font-medium text-[1.75rem] text-themeBlue">
            Get In Touch
          </div>

          <div className="contact-us-content text-gray">
            Alternatively, you can also fill out the contact form on this page
            with your name, email, subject and message and we will respond to
            you as soon as possible.
          </div>
          <div className="contact-us-form flex flex-col items-start gap-[1.5rem]">
            <div className="form-row flex w-full gap-[1.25rem]">
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
              <div className="form-col w-1/2">
                <input
                  type="text"
                  placeholder="Your Email*"
                  className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                  required
                />
              </div>
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <input
                type="text"
                placeholder="Subject*"
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <textarea
                rows={7}
                placeholder="Type your Message*"
                className="contact-form-input w-full  outline outline-1 outline-secondary focus:outline-themeBlue rounded px-[15px] py-[10px]  transition-all duration-400 placeholder:text-gray textarea resize-none"
                required
              />
            </div>
            <div className="form-row flex w-full gap-[1.25rem]">
              <button className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                Send Mail
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