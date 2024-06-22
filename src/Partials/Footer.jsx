import React, { useEffect, useState } from "react";
import { BiCopyright, BiLogoFacebook, BiLogoGmail, BiLogoInstagram, BiLogoWhatsapp, BiLogoYoutube, BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import BeatingCircle from "./BeatingCircle";

const Footer = () => {
    const circleClasses = "absolute rounded-full duration-300";

    const circles = [
        {
            pos: {x: 400,y: 100},
            color: "bg-green-300",
        },
        {
            pos: {x: 800,y: 50},
            color: "bg-red-300",
        },
        {
            pos: {x: 990,y: 220},
            color: "bg-purple-300",
        },
    ];

    return (
        <div className="p-20 mobile:p-8 relative">
            <div className="flex mobile:flex-col gap-8">
                <div className="flex flex-col grow basis-6/12 mobile:basis-full">
                    <img src="/images/Icon-Play.png" alt="icon text" className="h-28 w-28 rounded-lg object-cover" />
                    <div className="mt-4 text-slate-500 leading-7 flex items-center gap-4">
                        <div className="font-bold text-slate-700">PT ADELIA KREASI INDONESIA</div>
                    </div>
                </div>
                <div className="flex flex-col w-3/12 mobile:w-full">
                    <div className="text-2xl text-slate-800 font-bold mb-6">Quick Links</div>
                    <a href="/" className="mt-4 text-slate-500">Home</a>
                    <a href="/#features" className="mt-4 text-slate-500">Features</a>
                    <a href="/contact" className="mt-4 text-slate-500">Contacts</a>
                </div>
                <div className="flex flex-col w-3/12 mobile:w-full">
                    <div className="text-2xl text-slate-800 font-bold mb-6">Support</div>
                    <Link className="mt-4 text-slate-500" to={'/faq'}>FAQ</Link>
                    <Link className="mt-4 text-slate-500" to={'/privacy'}>Privacy Policy</Link>
                </div>
                <div className="flex flex-col w-3/12 mobile:w-full">
                    <div className="text-2xl text-slate-800 font-bold mb-6">Contact</div>
                    <Link className="mt-4 text-slate-500 flex items-center gap-2" to={"mailto:promociin.com@gmail.com"}>
                        <BiLogoGmail /> promociin.com@gmail.com
                    </Link>
                    <Link className="mt-4 text-slate-500 flex items-center gap-2" to="https://wa.me/6285236700721" target="_blank">
                        <BiLogoWhatsapp /> +62 852 3670 0721
                    </Link>
                    <Link className="mt-4 text-slate-500 flex items-center gap-2" to={'https://maps.app.goo.gl/PboDBPnW5Fope6KQA'} target="_blank">
                        <BiMap /> Surabaya, Indonesia
                    </Link>
                </div>
            </div>

            <div className="flex mobile:flex-col gap-4 border-t mt-8 pt-8 items-center">
                <div className="flex grow gap-4 items-center text-slate-500">
                    <BiCopyright /> Promociin 2024 - All Rights Reserved
                </div>
                <div className="flex gap-4 items-center">
                    <a href="#" target="_blank" className="h-10 aspect-square rounded border flex items-center justify-center hover:bg-primary hover:text-white">
                        <BiLogoFacebook size={20} />
                    </a>
                    <a href="#" target="_blank" className="h-10 aspect-square rounded border flex items-center justify-center hover:bg-primary hover:text-white">
                        <BiLogoInstagram size={20} />
                    </a>
                    <a href="#" target="_blank" className="h-10 aspect-square rounded border flex items-center justify-center hover:bg-primary hover:text-white">
                        <BiLogoYoutube size={20} />
                    </a>
                </div>
            </div>

            {/* <div class="absolute h-20 w-20 top-10 left-10 bg-green-400 rounded-lg">sd 10</div> */}
            {/* <div className={`${circleClasses} h-16 w-16 top-5 left-42 bg-green-100`}></div> */}
            {
                window.screen.width > 480 &&
                circles.map((circ, c) => (
                    <BeatingCircle key={c} color={circ.color} pos={circ.pos} />
                ))
            }
        </div>
    )
}

export default Footer;