"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import NavBg from "./NavBg";

export default function Navbar() {
    
const [showMenu, setShowMenu] = useState(false);
const [focusedLink, setFocusedLink] = useState("");
const pathname = usePathname();

const toggleMenu = () => {
    setShowMenu(!showMenu);
};

useEffect(() => {
    const handleResize = () => {
    if (window.innerWidth >= 700) {
        setShowMenu(false);
    }
    };

    window.addEventListener("resize", handleResize);

    setFocusedLink(pathname?.split("/")[1] || "");

    return () => {
    window.removeEventListener("resize", handleResize);
    };
}, [pathname]);

let Links =[
    {name:"소개하기",link:"/about"},
    {name:"공연영상",link:"/performance"},
    {name:"예매하기",link:"/tickets"},
    {name:"지원하기",link:"/application"},
];

return (
    <nav className="w-[full] h-[104px] flex relative bg-[white] z-50 font-['pretendard']">
        <NavBg>
        <div className="lg:flex ">
            <div className="flex justify-between">
                <Link href="/" key="home">
                    <Image src="/assets/images/layout/Logo.svg" alt="Logo" width={165} height={30} onClick={showMenu?toggleMenu:undefined} className= "ml-[20px] lg:ml-[12.5vw] w-[165px] lg:w-[12.5vw] h-[30px] lg:max-w-[10vw]  max-w-[165px] max-h-[30px]" priority/>
                </Link>
                <div className="lg:hidden">
                    <button className="px-2 outline-none" onClick={toggleMenu}>
                    {showMenu ? (<Image src="/assets/images/layout/close.svg" width={32} height={32} alt="close" /> ) : ( <Image src="/assets/images/layout/hamburger.svg" width={32} height={32} alt="hamburger" className="focus:border-none active:border-none" />)}
                    </button>
                </div>
            </div>
            <div className={`${ showMenu ? "flex flex-col absolute mt-[20px] bg-[white] " : "hidden flex-row ml-0 lg:mr-[12.5vw]" } lg:flex w-full items-center`}>
                <ul className={`${ showMenu ? "flex-col py-[40px] mt-12 mb-4 ": " lg:w-[50vw] flex-col lg:flex lg:flex-row"}`}>
                    { Links.map((link) => (
                        <Link key={link.name} href={link.link} onClick={() => setFocusedLink(link.name)}>
                            <div className={`${ showMenu
                                        ? "font-[700]"
                                        : "flex items-center justify-center w-[12.5vw]"
                                }`}>
                                <li key={link.name} onClick={showMenu ? toggleMenu : undefined} className={` text-[#000] ${ focusedLink === link.name || pathname?.startsWith(link.link) ? "border-t-4 border-t-[#281CFF]" : ""}  ${ showMenu ? "text-[20px] w-[100%] h-[100%] mb-4 text-center":"text-[16px] w-[80px]  h-[32px] font-[600] leading-[19px] flex-shrink-0 flex items-center justify-center"}`}>
                                {link.name}
                                </li>
                            </div>
                        </Link>
                        ))}
                </ul>
                <ul className={`${ showMenu ? " my-12 flex flex-row mx-12 items-center justify-center":"hidden lg:flex flex-row lg:w-[12.5vw] items-center justify-center lg:ml-[1.5vw]"}`}>
                    <div className={`${ showMenu ? "flex flex-row gap-[20px]" :"w-[12.5vw] flex items-center mx-auto"}`}>
                    <li className={`${ showMenu ? "w-[100%] h-[100%]" : "w-[4vw] h-[100%] flex items-center justify-center"}`}>
                    <Link href="http://pf.kakao.com/_UaIZG" target='_blank' passHref>
                        <Image src="/assets/images/layout/kakaotalk.svg" alt="카카오톡 채널" width={100} height={100} className="w-[28px] h-[28px]"/>
                    </Link>
                    </li>
                    <li className={`${ showMenu ? "w-[100%] h-[100%] " : "w-[4vw] h-[100%] flex items-center justify-center"}`}>
                    <Link
                        href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA=="
                        target='_blank'
                        passHref
                    >
                        <Image src="/assets/images/layout/instagram.svg" alt="인스타그램" width={100} height={100} className="w-[28px] h-[28px]" />
                    </Link>
                    </li>
                    <li className={`${ showMenu ? "w-[100%] h-[100%] " : "w-[4vw] h-[100%] flex items-center justify-center"}`}>
                    <Link href="https://www.youtube.com/@kahluaband8409" target='_blank' passHref>
                        <Image src="/assets/images/layout/youtube.svg" alt="유튜브" width={100} height={100} className="w-[28px] h-[28px]" />
                    </Link>
                    </li>
                    </div>
                </ul>
            </div>
        </div>
        </NavBg>
    </nav>
);
}