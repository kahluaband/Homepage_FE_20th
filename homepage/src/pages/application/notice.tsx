import Image from "next/image"
import divider from "/public/assets/images/recruit/divider_medium.svg";

export default function Notice(){
    return(
        <div className="w-full py-24 flex flex-col justify-center items-center">
            <Image src={divider} alt="notice" className="w-[75px]"/>
            <p className="font-Gotham text-5xl mt-4 mb-6 font-bold">Information</p>
            <div className="inline-flex flex-wrap flex-row justify-center align-top max-w-[1024px]">
                <Info_AQ/>
                <Info_Session/>
                <Info_Schedule/>
                <Info_Audition/>
                <Info_Precautions/>
            </div>
        </div>
    )
}

function Info_AQ(){
    return(
        <div className="w-[420px] h-[184px] rounded-[10px] border-ocean bg-white border-2 py-8 px-10 m-6">
            <div className="flex flex-row">
                <div className="align-center w-12 h-12 rounded-[24px] bg-ocean">
                    <p className="leading-[48px] text-2xl text-center font-bold text-[#FFFFFF]">01</p>
                </div>
                <div className="flex flex-col w-36 h-12 ml-4">
                    <p className="text-2xl text-ocean font-bold">지원자격</p>
                    <p className="text-xs text-[#B9B9B9]">Application Qualification</p>
                </div>
            </div>
            <p className="text-sm mt-8">
                홍익대학교 컴퓨터공학과 or<br/>
                자율전공학부에서 컴퓨터공학과 진입 예정인 24학번 신입생
            </p>
        </div>
    )
}

function Info_Session(){
    return(
        <div className="w-[420px] h-[184px] rounded-[10px] border-ocean bg-white border-2 py-8 px-10 m-6">
            <div className="flex flex-row">
                <div className="align-center w-12 h-12 rounded-[24px] bg-ocean">
                    <p className="leading-[48px] text-2xl text-center font-bold text-[#FFFFFF]">02</p>
                </div>
                <div className="flex flex-col w-36 h-12 ml-4">
                    <p className="text-2xl text-ocean font-bold">모집 세션</p>
                    <p className="text-xs text-[#B9B9B9]">Recruiting Session</p>
                </div>
            </div>
            <p className="text-sm mt-8">
                보컬 2명 / 기타 4명 / 드럼 2명 / 베이스 2명 / 신디사이저 2명
            </p>
        </div>
    )
}

function Info_Schedule(){
    return(
        <div className="w-[420px] h-[184px] rounded-[10px] border-ocean bg-white border-2 py-8 px-10 m-6">
            <div className="flex flex-row">
                <div className="align-center w-12 h-12 rounded-[24px] bg-ocean">
                    <p className="leading-[48px] text-2xl text-center font-bold text-[#FFFFFF]">03</p>
                </div>
                <div className="flex flex-col w-36 h-12 ml-4">
                    <p className="text-2xl text-ocean font-bold">모집 일정</p>
                    <p className="text-xs text-[#B9B9B9]">Recruiting Schedule</p>
                </div>
            </div>
            <p className="text-sm mt-8">
                지원서 마감 : ~ 2024.03.08 (금) 23:59까지<br/>
                보컬부문 지원 영상 : ~ 2024.03.10 (일) 23:59까지
            </p>
        </div>
    )
}

function Info_Audition(){
    return(
        <div className="w-[420px] h-[184px] rounded-[10px] border-ocean bg-white border-2 py-8 px-10 m-6">
            <div className="flex flex-row">
                <div className="align-center w-12 h-12 rounded-[24px] bg-ocean">
                    <p className="leading-[48px] text-2xl text-center font-bold text-[#FFFFFF]">04</p>
                </div>
                <div className="flex flex-col w-36 h-12 ml-4">
                    <p className="text-2xl text-ocean font-bold">오디션 일정</p>
                    <p className="text-xs text-[#B9B9B9]">Audition Schedule</p>
                </div>
            </div>
            <p className="text-sm mt-8">
                2024.03.11(월) 4시-7시<br/>
                오디션 이후 뒷풀이 예정
            </p>
        </div>
    )
}

function Info_Precautions(){
    return(
        <div className="w-[580px] h-auto rounded-[10px] border-ocean bg-white border-2 py-8 px-10 m-6">
            <div className="flex flex-row">
                <div className="align-center w-12 h-12 rounded-[24px] bg-ocean">
                    <p className="leading-[48px] text-2xl text-center font-bold text-[#FFFFFF]">05</p>
                </div>
                <div className="flex flex-col w-36 h-12 ml-4">
                    <p className="text-2xl text-ocean font-bold">유의사항</p>
                    <p className="text-xs text-[#B9B9B9]">Precautions</p>
                </div>
            </div>
            <p className="text-sm mt-8">
                1. 오디션은 대면으로 진행되며, 오디션 이후 7시부터 뒷풀이가 있을 예정입니다.<br/>
                2. 보컬 지원자에 한해 지원 영상을 받고 있습니다. 모집일정을 고려해주시기 바랍니다.<br/>
                3. 상세 일정은 지원자에게 개별 연락을 통해 공지됩니다.<br/>
                4. 기타 문의사항은 카카오톡 채널 @kahlua 로 문의 부탁드립니다.
            </p>
        </div>
    )
}