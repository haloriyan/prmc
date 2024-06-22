import React, { useState } from "react";
import { BiLogoPlayStore, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
    const [scrollPos, setScrollPos] = useState(0);
    const [isMobileActive, setMobileActive] = useState(false);
    const isMobile = window.screen.width < 480;

    return (
        <div className="fixed top-0 left-0 right-0 h-20 bg-white z-20 flex items-center justify-center px-20 mobile:px-8 border bottom-2">
            <Link to={'/'} className="flex w-3/12 mobile:w-full items-center gap-4">
                <img src="/images/icon.png" alt="icon prmc" className="h-12 rounded-lg" />
                <div className="text-slate-700 font-bold text-lg">Promociin</div>
            </Link>
            <div className={`flex grow items-center justify-end gap-8 mobile:flex-col ${(isMobileActive && isMobile) ? 'mobile:w-full mobile:bg-white' : 'mobile:w-0 mobile:hidden'} mobile:absolute mobile:items-start mobile:top-20 mobile:right-0 mobile:p-8`}>
                <a href={'/'}>Home</a>
                <a href={'/#features'}>Features</a>
                <a href={'/#screenshots'}>Screenshots</a>
                <a href={'/#reviews'}>Reviews</a>
                <a href={'/#faqs'}>FAQ</a>
                <a href={'https://play.google.com/store/apps/details?id=com.promociin.app'} target="_blank" className="border border-primary p-3 px-6 rounded-lg text-primary flex items-center gap-4 hover:bg-primary hover:text-white">
                    <BiLogoPlayStore />
                    Google Play
                </a>
            </div>
            {
                isMobile &&
                <div onClick={() => setMobileActive(!isMobileActive)}>
                    <BiMenu size={28} />
                </div>
            }
        </div>
    )
}

export default Header;