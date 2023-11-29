import Image from "next/image";
import band from "/public/assets/images/recruit/band.svg";
import recruit_rocket from "/public/assets/images/recruit/divider_medium.svg";

export default function RepNotice() {
    return (
        <>
        <div className="w-full h-auto py-36 flex flex-col justify-center items-center">
            <Image src={band} alt="KAHLUA" className="absolute w-full h-[740px] object-cover"/>
            <div className="z-10 w-full flex flex-col justify-center items-center">
                <p className="font-Salvar text-9xl text-center text-[#FFFFFF]">
                    KAHLUA
                </p>
                <p className=" font-GothamItalic text-center font-bold text-5xl mt-10 text-[#FFFFFF]">
                    23nd MEMBER<br/>RECUIRMENT
                </p>
                <p className="text-center text-xs mt-6 text-[#FFFFFF]">
                    모집기간 : 2023.03.01(금) ~ 2023.03.07(토)
                    <br/>
                    면접기간 : 2023.03.10(월) ~ 2023.03.11(화)
                </p>
                <a className="flex justify-center items-center h-[84px] w-1/2 rounded-[300px] bg-ocean mt-14" href="/application/apply">
                    <p className="text-2xl font-semibold text-[#FFFFFF]">KAHLUA 23기 지원하기</p>
                </a>

            </div>
        </div>
        </>
    )
}