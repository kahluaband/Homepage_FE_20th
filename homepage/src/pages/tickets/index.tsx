"use client"
import dotenv from 'dotenv';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Modal from "./Modal";
import Background from '../../app/components/Background';
import SelectBox from './SelectBox';
dotenv.config();

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

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
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setNowUrl(window.location.href);
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
        document.head.appendChild(script);
    
        script.onload = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
            center: new window.kakao.maps.LatLng(37.55099593968109, 126.92401144435387),
            level: 3,
            };
    
            const map = new window.kakao.maps.Map(container, options);
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
        alert("주소가 복사되었습니다!");
        });
    }

    const handleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="h-[1200px] flex items-center justify-center z-0 ">
        <Background>
                <div className="font-['pretendard']  flex flex-col items-center justify-center mb-[84px]">
                    <div className=" mt-[35px] flex flex-row  mx-auto w-[1110px]">
                        <Image src={data[0].image} alt='포스터' width={324} height={460} className='max-w-[324px] max-h-[460px]' priority/>
                        <div className="w-[776px] h-[402px] ml-[46px] flex-shrink-0">
                            <div className="w-[76px] h-[24px]  flex-shrink-0 rounded-[40px] bg-[#281CFF] text-[14px] font-[600] tracking-[0.2px] leading-[20px] text-[#FFF] pt-[2px] text-center ">예매가능</div>
                            <div className="flex flex-row">
                                <div className="mt-[8px] flex flex-shrink-0 text-black font-[700] text-[32px] leading-[42px]">{data[0].title}</div>
                                <div className="ml-[272px] flex mt-[19px]">
                                    <Link href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA=="  passHref>
                                        <Image src='/assets/images/tickets/bt_feed.svg' alt='인스타그램' width={1000} height={1000} className="w-[100px] h-[30px]"/>
                                    </Link>
                                    <div onClick={copyUrl}>
                                        <Image src='/assets/images/tickets/bt_share.svg' alt='share' width={1000} height={1000} className="cursor-pointer w-[100px] h-[30px] ml-[14px]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[24px] w-[776px] h-[1px] flex bg-[#000]"/>
                            <div className="mt-[36px] w-[804px] h-[1px] flex flex-row">
                                <div className="flex flex-col">
                                    <div className="flex w-[270px] items-center">
                                        <div className="text-[14px] font-[700] leading-[17px] w-[25px] h-[17px] text-center">장소</div>
                                        <div className="text-[14px] font-[500] leading-[21px] ml-[64px] w-[52px] h-[21px]">{data[0].where}</div>
                                    </div>
                                    <div className="mt-[14px] flex w-[270px] items-center">
                                        <div className="text-[14px] font-[700] leading-[17px] w-[25px] h-[17px] text-center">일시</div>
                                        <div className="text-[14px] font-[500] leading-[21px] ml-[64px] w-[145px] h-[21px]">{data[0].when}</div>  
                                    </div>
                                    <div className="mt-[30px] w-[450px] border-b flex bg-[#D9D9D9]"/>
                                    <div className="mt-[30px] flex flex-row w-[434px]">
                                        <div className="flex flex-row ">
                                            <div className="text-[14px] w-[25px] h-[66px] font-[700px] flex leading-[17px] mt-[20px] text-center">
                                                가격
                                            </div>
                                            <div className="flex flex-col ml-[64px] h-[66px]">
                                                <div className="w-[335px] h-[21px] flex flex-row items-center">
                                                    <div className="text-[14px] w-[77px] h-[21px] ">홍익대 신입생</div>
                                                    <div className="text-[14px] ml-[40px] w-[25px] text-[#281CFF] font-[700]">{data[0].ticket.freshman}</div>
                                                    <div className="text-[14px] ml-[64px] w-[41px] text-[#939393]">1인 1매</div>
                                                </div>
                                                <div className="w-[335px] mt-[16px] h-[21px] flex flex-row items-center">
                                                    <div className="text-[14px] w-[52px] h-[21px] ">일반티켓</div>
                                                    <div className="text-[14px] ml-[65px] w-[49px] font-[700]">{data[0].ticket.regular}</div>
                                                    <div className="text-[14px] ml-[40px] w-[122px] text-[#939393]">1인 5매까지 예매 가능</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleModal()} className="mt-[55px]">
                                    <Image src='/assets/images/tickets/bt_check.svg' alt='check' width={1000} height={1000} className='w-[312px] h-[33px]' />
                                    </button>
                                </div>
                                <div id="map" className=" ml-[60px] w-[262px] h-[262px] flex-shrink-0 z-0"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1110px] h-[402px] flex-shrink-0 rounded-[10px] border-solid border-[#B9B9B9] border mt-[80px] mx-auto bg-[white]">
                        <div className="flex flex-row">
                            <div className="w-[1110px] h-[62px] flex-shrink-0 flex flex-row pt-[24px] pl-[50px]">
                                    <div className="font-[400] flex flex-col text-[12px] w-[37px] h-[19px] ">Step 1</div>
                                    <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">날짜 선택하기</div>
                                    <div className="font-[400] ml-[246px] flex flex-col text-[12px] w-[37px] h-[19px] ">Step 2</div>
                                    <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">시간 선택하기</div>
                                    <div className="font-[600] ml-[244px] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ">예매가능 좌석</div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[1110px] border-solid  border-y border-[#B9B9B9]">
                            <div className="w-[370px] h-[260px] border-r border-[#E8E8E8] bg-[#F1F5FF]  flex flex-row">
                                <div className="w-[270px] h-[200px] ml-[50px] mt-[30px]">
                                    <Calendar />
                                </div>  
                            </div>
                            <div className="w-[370px] h-[260px] border-r bg-[#F1F5FF]  border-[#E8E8E8] flex flex-col">
                                <div className="flex">
                                    <div className="ml-[50px] mt-[30px]">
                                        <SelectBox />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="w-[369px] h-[260px] flex flex-col bg-[#F1F5FF] ">
                            <div className=" flex flex-col ml-[50px] mt-[30px] mr-[50px]">
                                        <div className="flex w-[260px] text-center flex-row justify-between">
                                            <div className="text-[14px] font-[600] leading-[19px] w-[80px] h-[19px]">홍익대 신입생</div>
                                            <div className="text-[14px] text-right font-[500] w-[35px]">110석</div>  
                                        </div>
                                        <div className="mt-[13px]  flex w-[260px] text-center flex-row justify-between">
                                            <div className="text-[14px] font-[600] leading-[19px] w-[25px] h-[19px]">일반</div>
                                            <div className="text-[14px] text-right font-[500]  w-[35px]">120석</div>
                                        </div>
                                    </div>
                            </div>
                            
                        </div>
                            <div className='ml-[510px] mt-[16px]'>
                                <Link href="tickets/freshman_ticket">
                                <button className="w-[270px] h-[48px] flex-shrink-0 rounded-[6px] bg-[#281CFF] text-[#FFF] font-[700] leading-[17px] text-[14px] text-center">신입생 티켓 예매하기</button>
                                </Link>
                                <Link href="tickets/general_ticket">
                                <button className="w-[270px] h-[48px] flex-shrink-0 ml-[30px] rounded-[6px] bg-[#281CFF] font-[700] leading-[17px]  text-[#FFF] text-[14px] text-center">일반 티켓 예매하기</button>
                                </Link>
                            </div>
                    </div>
                    {modal && (
                            <Modal/>
                        )}
                </div>
        </Background>
        </div>
    )
}