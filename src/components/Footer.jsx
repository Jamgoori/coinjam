import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaGithub, FaTwitter, FaTelegram } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
const Footer = () => {
  return (
    <div className="pt-8 mt-8 rounded-div text-primary">
      <div className="grid md:grid-cols-2">
        <div className="flex justify-evenly w-full md:max-w-[300px] uppercase">
          <div>
            <h2 className="font-bold">Support</h2>
            <ul>
              <li className="py-2 text-sm">고객센터</li>
              <li className="py-2 text-sm">연락처</li>
              <li className="py-2 text-sm">API 상태</li>
              <li className="py-2 text-sm">문서</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Info</h2>
            <ul>
              <li className="py-2 text-sm">About us</li>
              <li className="py-2 text-sm">Careers</li>
              <li className="py-2 text-sm">Invest</li>
            </ul>
          </div>
        </div>
        <div className="text-right">
          <div className="flex justify-end w-full">
            <div className="w-full md:w-[300px] py-4 relative">
              <div className="flex justify-center md:justify-end py-4 md:pb-4 mt-[-1rem]">
                <ThemeToggle />
              </div>
              <p className="text-center md:text-right">
                코인잼에 회원가입 하세요
              </p>
              <div className="py-4">
                <form>
                  <input
                    className="w-full p-2 mr-2 border shadow-xl bg-primary border-input rounded-xl md:w-auto "
                    type="email"
                    placeholder="이메일을 입력하세요"
                  />
                  <button className="w-full p-2 px-4 my-2 shadow-xl bg-button text-btnText rounded-2xl hover:shadow-2xl md:w-auto">
                    회원가입
                  </button>
                </form>
              </div>
              <div className="flex justify-between py-4 text-accent">
                <AiOutlineInstagram />
                <FaTwitter />
                <FaFacebookF />
                <FaGithub />
                <FaTelegram />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center p4">Powered by CoinGecko</p>
    </div>
  );
};

export default Footer;
