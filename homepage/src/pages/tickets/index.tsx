"use client"
import dotenv from 'dotenv';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Background from '../../app/components/Background';
import SelectBox from './SelectBox';
dotenv.config();

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

/*
    공연 정보 설정
*/
const data = [
    {
    image: '/assets/images/tickets/poster.png', 
    title: "2023년 9월 정기 공연",
    where: "001 클럽",
    when: "2023년 9월 1일 오후 6시",
    ticket: { freshman: "무료", regular: "5000원" }
    }
];

declare global {
    interface Window {
    kakao: any;
    }
}

export default function Tickets() {
    const [nowUrl, setNowUrl] = useState("");

    
    /*
        예매 가능 기간 설정
    */
    const startDate = new Date('2023-09-01');
    const endDate = new Date('2024-09-10');
    const today = new Date();   
    const isWithinSeason = today >= startDate && today <= endDate;

    useEffect(() => {
        setNowUrl(window.location.href);
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
        document.head.appendChild(script);
    
        script.onload = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                /*
                    공연 장소 위치 설정
                */
            center: new window.kakao.maps.LatLng(37.55099593968109, 126.92401144435387),
            level: 3,
            };
    
            const map = new window.kakao.maps.Map(container, options);
            /*
                공연 장소 위치 설정
            */
            var markerPosition = new window.kakao.maps.LatLng(37.55099593968109, 126.92401144435387);
            var marker = new window.kakao.maps.Marker({
            position: markerPosition,
            });

            window.kakao.maps.event.addListener(marker, 'click', function() {
                window.open('https://place.map.kakao.com/23696074', '_blank');
            });
    
            marker.setMap(map);
            marker.setDraggable(true);
        });
        };
    }, []);

    function copyUrl() {
        navigator.clipboard.writeText(nowUrl).then(res => {
        alert("링크가 복사되었습니다!");
        });
    }

    return (
        <div className="h-[1100px] flex items-center justify-center z-0 ">
        <Background>
                <div className="font-['pretendard']  flex flex-col items-center justify-center mb-[84px]">
                    <div className=" mt-[35px] flex flex-row  mx-auto w-[1080px] ">
                        <Image src={data[0].image} alt='포스터' width={324} height={460} className='w-[324px] max-h-[460px]' priority/>
                        <div className="w-[720px] h-[460px] ml-[46px] flex-shrink-0">
                            <div className="w-[76px] h-[24px] flex flex-shrink-0 justify-center rounded-[40px] bg-[#281CFF] text-[14px] font-[600] tracking-[0.2px] leading-[20px] text-[#FFF] pt-[2px] text-center ">예매가능</div>
                            <div className="flex flex-row">
                                <div className="font-['pretendard'] w-[282px] h-[42px] mt-[8px] flex flex-shrink-0 text-black font-[700] text-[31px] leading-[40px]">{data[0].title}</div>
                                <div className="ml-[238px] flex mt-[19px]">
                                    <Link href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA==" target='_blank' passHref>
                                        <Image src='/assets/images/tickets/bt_feed.svg' alt='인스타그램' width={1000} height={1000} className="cursor-pointer w-[100px] h-[30px]"/>
                                    </Link>
                                    <div onClick={copyUrl}>
                                        <Image src='/assets/images/tickets/bt_share.svg' alt='share' width={1000} height={1000} className="cursor-pointer w-[100px] h-[30px] ml-[14px]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[24px] w-[720px] h-[1px] flex bg-[#000]"/>
                            <div className="mt-[36px] w-[720px] h-[1px] flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex w-[270px] items-center mt-[6px]">
                                        <div className="text-[14px] font-[700] leading-[17px] w-[25px] h-[17px] text-center">장소</div>
                                        <div className="text-[14px] font-[500] leading-[21px] ml-[64px] w-[52px] h-[21px]">{data[0].where}</div>
                                    </div>
                                    <div className="mt-[48px] flex w-[270px] items-center">
                                        <div className="text-[14px] font-[700] leading-[17px] w-[25px] h-[17px] text-center">일시</div>
                                        <div className="text-[14px] font-[500] leading-[21px] ml-[64px] w-[145px] h-[21px]">{data[0].when}</div>  
                                    </div>
                                    <div className="mt-[42px] w-[434px] border-b flex bg-[#D9D9D9]"/>
                                    <div className="mt-[42px] flex flex-row w-[434px]">
                                        <div className="flex flex-row h-[77px]">
                                            <div className="text-[14px] w-[25px] h-[66px] font-[700px] flex leading-[17px] mt-[28px] text-center">
                                                가격
                                            </div>
                                            <div className="flex flex-col ml-[64px] h-[66px]">
                                                <div className="w-[335px] h-[21px] flex flex-row items-center">
                                                    <div className="text-[14px] w-[77px] h-[21px] ">홍익대 신입생</div>
                                                    <div className="text-[14px] ml-[36px] w-[25px] text-[#281CFF] font-[700]">{data[0].ticket.freshman}</div>
                                                    <div className="text-[14px] ml-[66px] w-[41px] text-[#939393]">1인 1매</div>
                                                </div>
                                                <div className="w-[335px] mt-[35px] h-[21px] flex flex-row items-center">
                                                    <div className="text-[14px] w-[77px] h-[21px] ">일반티켓</div>
                                                    <div className="text-[14px] ml-[36px] w-[49px] font-[700]">{data[0].ticket.regular}</div>
                                                    <div className="text-[14px] ml-[42px] w-[122px] text-[#939393]">1인 5매까지 예매 가능</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row mt-[36px]'>
                                    <Link href="tickets/freshman_ticket/delete/">
                                        <button className="ml-[0.4vw] mr-[0.6vw] w-[164px] h-[33px] text-[12px] font-[400px] leading-[18px] border border-[#6A6A6A] rounded-[20px] bg-[#FFFFFF]">
                                            신입생 티켓 구매내역 조회하기
                                        </button>
                                    </Link>
                                    <Link href="tickets/general_ticket/delete/">
                                        <button className="ml-[0.6vw] w-[164px] h-[33px] text-[12px] font-[400px] leading-[18px] border border-[#6A6A6A] rounded-[20px] bg-[#FFFFFF]">
                                            일반 티켓 구매내역 조회하기
                                        </button>
                                    </Link>
                                    </div>
                                </div>
                                <div id="map" className=" ml-[45px] w-[242px] h-[242px] flex-shrink-0 z-0"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1080px] h-[402px] flex-shrink-0 rounded-[10px] border-solid border-[#B9B9B9] border mt-[80px] mx-auto bg-[white]">
                        <div className="flex flex-row">
                            <div className="w-[1080px] h-[62px] flex-shrink-0 flex flex-row pt-[24px]">
                                <div className='w-[360px]  flex flex-row pl-[50px] '>
                                    <div className="font-[400] flex flex-col text-[12px] w-[37px] h-[19px] ">Step 1</div>
                                    <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">날짜 선택하기</div>
                                </div>
                                <div className='w-[360px]  flex flex-row pl-[50px]'>
                                    <div className="font-[400] flex flex-col text-[12px] w-[37px] h-[19px] ">Step 2</div>
                                    <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">시간 선택하기</div>
                                </div>    
                                <div className='w-[360px]  flex flex-row pl-[50px]'>
                                    <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ">예매가능 좌석</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[1079px] border-solid  border-y border-[#B9B9B9]">
                            <div className="w-[360px] h-[260px] border-r border-[#E8E8E8] bg-[#F1F5FF]  flex flex-row">
                                <div className="w-[270px] h-[200px] ml-[45px] mt-[30px]">
                                    <Calendar />
                                </div>  
                            </div>
                            <div className="w-[360px] h-[260px] border-r bg-[#F1F5FF]  border-[#E8E8E8] flex flex-col">
                                <div className="flex">
                                    <div className="ml-[45px] mt-[30px]">
                                        <SelectBox />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="w-[358px] h-[260px] flex flex-col bg-[#F1F5FF] ">
                                <div className=" flex flex-col mx-auto mt-[30px]">
                                        <div className="flex w-[260px] text-center flex-row justify-between">
                                            <div className="text-[14px] font-[600] leading-[19px] w-[80px] h-[19px] text-left">온라인 예매</div>
                                            <div className="text-[14px] text-right font-[500] w-[70px]">예매가능</div>  
                                        </div>
                                        <div className="mt-[13px]  flex w-[260px] text-center flex-row justify-between">
                                            <div className="text-[14px] font-[600] leading-[19px] w-[80px] h-[19px] text-left">현장 예매</div>
                                            <div className="text-[14px] text-right font-[500]  w-[70px]">예매가능</div>
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                            <div className='ml-[480px] mt-[16px]'>
                            {isWithinSeason ? (
                            <div>
                                <Link href="tickets/freshman_ticket">
                                    <button className="w-[270px] h-[48px] flex-shrink-0 rounded-[6px] bg-[#281CFF] text-[#FFF] font-[700] leading-[17px] text-[14px] text-center">신입생 티켓 예매하기</button>
                                </Link>
                                <Link href="tickets/general_ticket">
                                    <button className="w-[270px] h-[48px] flex-shrink-0 ml-[30px] rounded-[6px] bg-[#281CFF] font-[700] leading-[17px]  text-[#FFF] text-[14px] text-center">일반 티켓 예매하기</button>
                                </Link>
                            </div>) : (
                            <button className="ml-[30px] w-[540px] h-[48px] flex-shrink-0 rounded-[6px] bg-[#B9B9B9] text-[#FFF] font-[700] leading-[17px] text-[14px] text-center">지금은 예매 가능 기간이 아닙니다.</button>
                        )}
                        </div>
                    </div>
                </div>
            </Background>
        </div>
    )
}