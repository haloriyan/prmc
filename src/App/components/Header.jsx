import React, { useState } from "react";
import { BiPaperPlane, BiSearch, BiSolidInbox, BiUser } from "react-icons/bi";
import config from "../../config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Header = () => {
    const isMobile = window.screen.width <= 480;
    const [searchParams, setSearchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get('q'));
    const url = new URL(document.URL);
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 h-16 border-b bg-white flex items-center justify-center px-8 z-30">
            <Link to={'/home'} className="flex grow basis-4/12 justify-start items-center gap-4">
                <img src="/images/icon.png" alt="icon" className="rounded-lg h-10 aspect-square" />
                {!isMobile && <div className="font-bold text-slate-700">Promociin</div>}
            </Link>
            {!isMobile &&
                <div className="w-4/12 bg-gray-200 rounded-full h-12 flex items-center px-4 cursor-pointer" onClick={() => {
                    let u = new URL(document.URL);
                    if (u.pathname !== "/explore") {
                        navigate('/explore');
                    }
                }}>
                    <input type="text" placeholder="Cari" className="flex bg-gray-200 grow outline-0" value={searchParams.get('q')} onInput={e => {
                        // searchParams.set('q', e.currentTarget.value);
                        setSearchParams({
                            q: e.currentTarget.value,
                        })
                    }} />
                    <BiSearch />
                </div>
            }

            <div className="flex grow gap-4 basis-4/12 justify-end">
                {
                    (!isMobile && url.pathname !== "/upload") &&
                    <Link to={'/upload'} className="px-8 border flex items-center justify-center text-primary hover:border-primary">
                        Upload
                    </Link>
                }
                {
                    isMobile &&
                    <Link to={'/search'} className="h-10 aspect-square rounded-full flex items-center justify-center bg-slate-200 cursor-pointer">
                        <BiSearch color={config.primaryColor} />
                    </Link>
                }
                <Link to={'/inbox'} className="h-10 aspect-square rounded-full flex items-center justify-center bg-slate-200 cursor-pointer">
                    <BiPaperPlane color={config.primaryColor} />
                </Link>
                <Link to={'/profile'} className="h-10 aspect-square rounded-full flex items-center justify-center bg-slate-200 cursor-pointer">
                    <BiUser color={config.primaryColor} />
                </Link>
            </div>
        </div>
    )
}

export default Header;