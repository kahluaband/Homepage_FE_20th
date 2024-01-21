"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import NavBg from "./NavBg";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [focusedLink, setFocusedLink] = useState("");
    const [isClose, setIsClose] = useState(false);
    
    const pathname = usePathname();

    const toggleMenu = () => {
        setShowMenu(!showMenu); 
    };

    const handleIsClose = () => {
        setIsClose(!showMenu); // showMenu 상태가 true일 때만 isClose 값 변경
        setShowMenu(!showMenu); // 메뉴 열림 설정
    };

    const handleOverlayClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.target === event.currentTarget) {
        handleIsClose();
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            if (showMenu) {
                handleIsClose(); // 메뉴가 열려있을 때만 닫기
            }
        }
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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
        document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    let Links = [
        { name: "소개하기", link: "/about" },
        { name: "공연영상", link: "/performance" },
        { name: "예매하기", link: "/tickets" },
        { name: "지원하기", link: "/application" },
    ];

    return (
        <nav>
        {showMenu && <div onClick={handleOverlayClick} className="fixed inset-0 h-[full] bg-black bg-opacity-50 z-40" />}
        <div className="w-[full] h-[104px] flex item-center bg-[white] z-50 font-['pretendard'] top-[16px] sm:top-[30px]">
                <NavBg>
                    <div className="lg:flex pt-[16px] sm:pt-[30px]">
                        <div className="flex justify-between">
                            <Link href="/" key="home">
                                <Image src="/assets/images/layout/logo.svg" alt="Logo" width={165} height={30} onClick={showMenu ? toggleMenu : undefined} className="ml-[20px] my-[2px] lg:ml-[12.5vw] sm:mt-0 w-[130px] sm:w-[165px] lg:w-[12.5vw] h-[24px] sm:h-[30px] lg:max-w-[10vw] max-w-[165px] max-h-[30px]" priority />
                            </Link>
                            <div className="lg:hidden z-50 ">
                                <button className="px-2 outline-none" onClick={isClose ? handleIsClose : toggleMenu}>
                                    {showMenu ? (<Image src="/assets/images/layout/close.svg" width={32} height={32} alt="close" className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] "/>) : (<Image src="/assets/images/layout/hamburger.svg" width={32} height={32} alt="hamburger" className="w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] focus:border-none active:border-none" />)}
                                </button>
                            </div>
                        </div>
                        <div className={`${showMenu ? "fixed top-0 right-0 h-full bg-white flex flex-col items-center z-40 w-[254px]" : "hidden w-full"} lg:flex items-center`}>
                            <ul className={`${showMenu ? "flex-col py-[40px] mt-[117px] mb-4 " : " lg:w-[50vw] flex-col lg:flex lg:flex-row"}`}>
                                {Links.map((link) => (
                                    <Link key={link.name} href={link.link} onClick={() => setFocusedLink(link.name)}>
                                        <div className={`${showMenu ? "flex w-105 h-28 flex-col justify-center flex-shrink-0 text-black text-center font-bold text-lg mb-[78x]" : "flex items-center justify-center w-[12.5vw]"} `}>
                                            <li key={link.name} onClick={showMenu ? toggleMenu : undefined} className={` text-[#000] ${focusedLink === link.name || pathname?.startsWith(link.link) ? "border-t-4 border-t-[#281CFF] " : "hover:text-[#575757]"}  ${showMenu ? "text-[20px] w-[100%] h-[100%] text-center" : "text-[16px] w-[80px]  h-[32px] font-[600] leading-[19px] flex-shrink-0 flex items-center justify-center"}`}>
                                                {link.name}
                                            </li>
                                        </div>
                                    </Link>
                                ))}
                            </ul>
                            {!showMenu && <ul className="hidden lg:flex flex-row lg:w-[12.5vw] items-center justify-center lg:ml-[1.5vw]">
                                <div className="w-[12.5vw] flex items-center mx-auto">
                                    <li className="w-[4vw] h-[100%] flex items-center justify-center">
                                        <Link href="http://pf.kakao.com/_UaIZG" target='_blank' passHref>
                                            <Image src="/assets/images/layout/kakaotalk.svg" alt="카카오톡 채널" width={100} height={100} className="w-[28px] h-[28px]" />
                                        </Link>
                                    </li>
                                    <li className="w-[4vw] h-[100%] flex items-center justify-center">
                                        <Link
                                            href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA=="
                                            target='_blank'
                                            passHref
                                        >
                                            <Image src="/assets/images/layout/instagram.svg" alt="인스타그램" width={100} height={100} className="w-[28px] h-[28px]" />
                                        </Link>
                                    </li>
                                    <li className="w-[4vw] h-[100%] flex items-center justify-center">
                                        <Link href="https://www.youtube.com/@kahluaband8409" target='_blank' passHref>
                                            <Image src="/assets/images/layout/youtube.svg" alt="유튜브" width={100} height={100} className="w-[28px] h-[28px]" />
                                        </Link>
                                    </li>
                                </div>
                            </ul>}
                        </div>
                    </div>
                </NavBg>
                </div>
        </nav>
    );
}