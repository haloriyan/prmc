import moment from "moment";
import React from "react";
import { BiBriefcase, BiCopyright, BiGroup, BiHome, BiShoppingBag, BiSolidBatteryLow } from "react-icons/bi";
import { MdHandshake, MdVideocam } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({active = null}) => {
    const isMobile = window.screen.width <= 480;

    return (
        <div className={`fixed left-0 bottom-0 flex gap-8 z-40 bg-white ${isMobile ? 'w-full right-0 flex-row border-t p-6' : 'w-3/12 p-8 top-16 flex-col'}`}>
            <Link to={'/home'} className={`flex items-center gap-4 font-bold ${active === 'home' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <BiHome size={20} />
                {!isMobile && <div>Home</div>}
            </Link>
            <Link to={'/talents'} className={`flex items-center gap-4 font-bold ${active === 'asd' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <BiGroup size={20} />
                {!isMobile && <div>Talents</div>}
            </Link>
            <Link to={'/job-fair'} className={`flex items-center gap-4 font-bold ${active === 'job-fair' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <BiBriefcase size={20} />
                {!isMobile && <div>Job Fair</div>}
            </Link>
            <Link to={'/connect'} className={`flex items-center gap-4 font-bold ${active === 'connect' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <MdHandshake size={20} />
                {!isMobile && <div>Connects</div>}
            </Link>
            <Link to={'/gigs'} className={`flex items-center gap-4 font-bold ${active === 'gigs' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <BiShoppingBag size={20} />
                {!isMobile && <div>Gigs</div>}
            </Link>
            <Link to={'#'} className={`flex items-center gap-4 font-bold ${active === 'asd' ? 'text-primary' : ''} ${isMobile ? 'grow' : ''}`}>
                <MdVideocam size={20} />
                {!isMobile && <div>Live</div>}
            </Link>

            {
                window.screen.width > 480 &&
                <>
                    <div className="mt-8">
                        <div className="text-slate-500 font-bold text-sm">Company</div>
                        <div className="flex gap-2 items-center mt-2">
                            <Link to={'/about'} className="text-xs text-slate-500">About</Link>
                            <Link to={'/faq'} className="text-xs text-slate-500">FAQ</Link>
                            <Link to={'/privacy'} className="text-xs text-slate-500">Privacy Policy</Link>
                            <Link to={'/contact'} className="text-xs text-slate-500">Contact</Link>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center text-xs text-slate-500">
                        <BiCopyright /> {moment().format('Y')} Promociin
                    </div>
                </>
            }
        </div>
    )
}

export default Sidebar;