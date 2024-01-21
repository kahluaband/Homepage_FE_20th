"use client";
import dotenv from "dotenv";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import Background from "../../app/components/Background";
import SelectBox from "./SelectBox";
import poster from "../../../public/assets/images/tickets/poster.png";
dotenv.config();

const apikey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;
/*
    공연 정보 설정
*/
const data = [
  {
    image: poster,
    title: "2024년 3월 정기 공연",
    where: "001 클럽",
    when: "2024년 3월 4일 오후 7시",
    ticket: { freshman: "무료", regular: "5000원" },
  },
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
  const startDate = new Date("2024-02-01");
  const endDate = new Date("2024-03-04");
  const today = new Date();
  const isWithinSeason = today >= startDate && today <= endDate;

  useEffect(() => {
    setNowUrl(window.location.href);
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apikey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container1 = document.getElementById("map1");
        const container2 = document.getElementById("map2");

        /*
                공연 위치 설정
                */
        const options = {
          center: new window.kakao.maps.LatLng(
            37.55099593968109,
            126.92401144435387
          ),
        };

        const map1 = new window.kakao.maps.Map(container1, {
          ...options,
          level: 3,
        });
        const map2 = new window.kakao.maps.Map(container2, {
          ...options,
          level: 2,
        });

        const markerPosition = new window.kakao.maps.LatLng(
          37.55099593968109,
          126.92401144435387
        );

        const createMarker = (map: any) => {
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            draggable: true,
          });

          window.kakao.maps.event.addListener(marker, "click", function () {
            window.open("https://place.map.kakao.com/23696074", "_blank");
          });

          return marker;
        };

        const marker1 = createMarker(map1);
        const marker2 = createMarker(map2);
        marker1.setMap(map1);
        marker2.setMap(map2);
        marker1.setDraggable(true);
        marker2.setDraggable(true);
      });
    };
  }, []);

  function copyUrl() {
    navigator.clipboard.writeText(nowUrl).then((res) => {
      alert("링크가 복사되었습니다!");
    });
  }

  const ReserveTickets = () => (
    <div className="text-[#FFF] font-[700] leading-[17px] text-[10px] sm:text-[12px] lg:text-[14px] text-center">
      {isWithinSeason ? (
        <div className="contents-center flex justify-center flex-col lg:flex-row lg:gap-4">
          <Link href="tickets/freshman_ticket">
            <button className="w-[45vw] h-[29px] md:w-[270px] md:h-[48px] rounded-[10px] bg-[#281CFF] hover:bg-[white] hover:text-[#281CFF] hover:border-[#281CFF] transition-all duration-450 border-[2px] border-[#281CFF]">
              신입생 티켓 예매하기
            </button>
          </Link>
          <Link href="tickets/general_ticket">
            <button className="w-[45vw] h-[29px] md:w-[270px] md:h-[48px] mt-[10px] lg:mt-0 rounded-[10px] bg-[#281CFF] hover:bg-[white] hover:text-[#281CFF] hover:border-[#281CFF] transition-all duration-450 border-[2px] border-[#281CFF]">
              일반 티켓 예매하기
            </button>
          </Link>
        </div>
      ) : (
        <button className="w-[45vw] h-[29px] md:w-[270px] md:h-[48px] flex-shrink-0 rounded-[10px] bg-[#B9B9B9] cursor-not-allowed">
          지금은 예매 가능 기간이 아닙니다.
        </button>
      )}
    </div>
  );

  const TicketButton = ({ href, label, width, height, margin, text }: any) => (
    <Link href={href}>
      <button
        className={`ml-[${margin}] w-[${width}] h-[${height}] text-[${text}] font-[400px] leading-[18px] border border-[#6A6A6A] rounded-[10px] bg-[#FFFFFF] hover:bg-[#281CFF] hover:text-[white] hover:outline-none transition-all duration-450`}
      >
        {label}
      </button>
    </Link>
  );

  const checkTickets = () => (
    <div>
      <div className="flex md:hidden">
        <TicketButton
          href="tickets/freshman_ticket/delete/"
          label="신입생 예매내역 조회하기"
          width="35vw"
          height="29px"
          margin="0"
          text="10px"
        />
        <TicketButton
          href="tickets/general_ticket/delete/"
          label="일반 예매내역 조회하기"
          width="35vw"
          height="29px"
          margin="2vw"
          text="10px"
        />
      </div>
      <div className="hidden md:flex">
        <TicketButton
          href="tickets/freshman_ticket/delete/"
          label="신입생 예매내역 조회하기"
          width="35vw"
          height="33px"
          margin="0"
          text="12px"
        />
        <TicketButton
          href="tickets/general_ticket/delete/"
          label="일반 예매내역 조회하기"
          width="35vw"
          height="33px"
          margin="2vw"
          text="12px"
        />
      </div>
    </div>
  );

  const Tickets = () => (
    <div>
      <div className="flex w-[100%] lg:w-[260px] text-center flex-row justify-between lg:justify-between md:gap-[25vw] lg:gap-0">
        <div className="font-[600] leading-[19px] w-[80px] h-[19px] text-left">
          온라인 예매
        </div>
        <div className="text-right font-[500] w-[70px]">예매불가</div>
      </div>
      <div className="mt-[13px] flex w-[100%] lg:w-[260px] text-center flex-row justify-between lg:justify-between md:gap-[25vw] lg:gap-0">
        <div className="font-[600] leading-[19px] w-[80px] h-[19px] text-left">
          현장 예매
        </div>
        <div className="text-right font-[500]  w-[70px]">예매불가</div>
      </div>
    </div>
  );

  return (
    <div className="h-[950px] p:h-[1100px] x:h-[1100px] sm:h-[1450px] md:h-[1400px] lg:h-[1100px] flex z-0 sm:top-[30px]">
      <Background>
        <div className="font-['pretendard']  flex flex-col items-center sm:mb-[84px] mx-auto sm:pt-[20px]">
          <div className=" flex flex-row w-[100%] lg:w-[1024px] justify-center items-start content-center ">
            <Image
              src={data[0].image}
              alt="포스터"
              width={342}
              height={460}
              className="pr-[1vw] w-[40vw] h-[calc(40vw*4/3)] q:w-[35vw] q:h-[calc(35vw*4/3)] x:w-[30vw] x:h-[calc(30vw*4/3)] md:w-[240px] md:h-[310px] lg:w-[270px] lg:h-[340px]  xl:w-[342px] xl:h-[460px] md:max-h-[460px] "
              priority
            />
            <div className="w-[50vw] h-[200px] sm:h-[300px] lg:w-[600px] md:h-[300px] lg:h-[400px] xl:w-[720px] xl:h-[460px] ml-[11px] lg:ml-[23px] mt-0 top-0 flex-shrink-0">
              <div className="flex flex-row justify-between">
                <div className="w-[90px] h-[18px] md:w-[110px] md:h-[22px] md:text-[11px] lg:w-[128px] lg:h-[24px] flex flex-shrink-0 justify-center rounded-[40px] bg-[#281CFF] text-[8px] lg:text-[12px] font-[600] tracking-[0.2px] leading-[20px] text-[#FFF] pt-[2px] text-center whitespace-nowrap items-center">
                  2월 1일 예매 OPEN
                </div>
                <div className="flex mt-[3px]">
                  <Link
                    href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA=="
                    target="_blank"
                    passHref
                  >
                    <Image
                      src="/assets/images/tickets/mobile_instagram.svg"
                      alt="모바일 인스타 그램"
                      width={1000}
                      height={1000}
                      className="ml-[8vw] flex lg:hidden cursor-pointer w-[12px] h-[12px]"
                    />
                  </Link>
                  <div onClick={copyUrl}>
                    <Image
                      src="/assets/images/tickets/mobile_share.svg"
                      alt="모바일 share"
                      width={1000}
                      height={1000}
                      className="flex lg:hidden cursor-pointer w-[12px] h-[12px] ml-[14px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row left-0 whitespace-nowrap">
                <div className="font-['pretendard'] w-[32vw] sm:w-[150px] md:w-[280px] h-[20px] lg:mt-[8px] lg:w-[350px] lg:h-[42px] flex flex-shrink-0 text-black font-[700] text-[14px] sm:text-[16px] md:text-[28px] leading-[40px] whitespace-nowrap">
                  {data[0].title}
                </div>
                <div className="mt-[19px] pr-[2px] ml-[8vw] w-[18vw] flex flex-row">
                  <Link
                    href="https://instagram.com/kahlua_band_?igshid=MzRlODBiNWFlZA=="
                    target="_blank"
                    passHref
                  >
                    <Image
                      src="/assets/images/tickets/bt_feed.svg"
                      alt="인스타그램"
                      width={1000}
                      height={1000}
                      className="hidden lg:flex cursor-pointer w-[100px] h-[30px]"
                    />
                  </Link>
                  <div onClick={copyUrl}>
                    <Image
                      src="/assets/images/tickets/bt_share.svg"
                      alt="share"
                      width={1000}
                      height={1000}
                      className="hidden lg:flex cursor-pointer w-[100px] h-[30px] ml-[14px] "
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[32px] lg:mt-[18px] w-[50vw] lg:w-[600px] xl:w-[720px] h-[1px] flex bg-[#000]" />
              <div className="mt-[12px] xl:mt-[36px] w-[50vw] lg:w-[720px] h-[1px] flex flex-row">
                <div className="flex flex-col w-[50vw] ">
                  <div className="text-[10px] md:text-[14px] flex w-[50vw] md:w-[270px] items-center mt-[4px]">
                    <div className="font-[700] leading-[17px] w-[18px] md:w-[25px] h-[17px] text-center whitespace-nowrap">
                      장소
                    </div>
                    <div className="font-[500] leading-[21px] ml-[7vw] lg:ml-[64px] w-[52px] h-[21px]">
                      {data[0].where}
                    </div>
                  </div>
                  <div className="text-[10px] md:text-[14px] mt-[4px] md:mt-[24px] lg:mt-[48px] flex w-[50vw] md:w-[270px] items-center">
                    <div className=" font-[700] leading-[17px] w-[18px] md:w-[25px] h-[17px] text-center whitespace-nowrap">
                      일시
                    </div>
                    <div className=" font-[500] leading-[21px] ml-[7vw] lg:ml-[64px] w-[145px] h-[21px] whitespace-nowrap">
                      {data[0].when}
                    </div>
                  </div>
                  <div className="mt-[14px] lg:mt-[42px] w-[50vw] lg:w-[400px] xl:w-[434px] border-b flex bg-[#D9D9D9]" />
                  <div className="mt-[14px] lg:mt-[42px] flex flex-row w-[50vw] md:w-[434px]">
                    <div className="flex flex-row h-[77px]">
                      <div className="text-[10px] md:text-[14px] w-[18px] md:w-[25px] h-[66px] font-[700] flex leading-[17px] mt-[28px] text-center whitespace-nowrap">
                        가격
                      </div>
                      <div className="flex flex-col ml-[7vw] lg:ml-[64px] h-[66px]">
                        <div className="text-[10px] md:text-[14px] flex flex-col lg:flex-row">
                          <div className="w-[40vw] md:w-[335px] h-[21px] flex flex-row items-center">
                            <div className="w-[62px] md:w-[77px] h-[21px] ">
                              홍익대 신입생
                            </div>
                            <div className="ml-[10vw] lg:ml-[36px] w-[25px] text-[#281CFF] font-[700]">
                              {data[0].ticket.freshman}
                            </div>
                            <div className="hidden lg:flex ml-[66px] w-[41px] text-[#939393]">
                              1인 1매
                            </div>
                          </div>
                          <div className="flex text-[8px] lg:hidden w-[41px] text-[#939393]">
                            1인 1매
                          </div>
                        </div>
                        <div className="text-[10px] md:text-[14px] flex flex-col lg:flex-row">
                          <div className="text-[10px] md:text-[14px] w-[40vw] md:w-[335px] mt-[8px] lg:mt-[35px] h-[21px] flex flex-row items-center">
                            <div className="w-[62px] lg:w-[77px] h-[21px] ">
                              일반티켓
                            </div>
                            <div className="ml-[10vw] lg:ml-[36px] w-[49px] font-[700]">
                              {data[0].ticket.regular}
                            </div>
                            <div className="hidden lg:flex ml-[42px] w-[122px] text-[#939393] whitespace-nowrap">
                              1인 5매까지 예매 가능
                            </div>
                          </div>
                          <div className="flex text-[8px] lg:hidden w-[82px] text-[#939393] whitespace-nowrap">
                            1인 5매까지 예매 가능
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex mt-[36px] w-[434px] h-[33px] text-center text-[12px] font-[400px] leading-[18px]">
                    <Link
                      href="tickets/freshman_ticket/delete/"
                      className="w-[164px] h-[33px] ml-[0.4vw] flex items-center justify-center border border-[#6A6A6A] rounded-[10px] bg-[#FFFFFF] hover:bg-[#281CFF] hover:text-[white] hover:outline-none transition-all duration-450"
                    >
                      신입생 예매내역 조회하기
                    </Link>
                    <Link
                      href="tickets/general_ticket/delete/"
                      className="w-[164px] h-[33px] ml-[0.4vw] flex items-center justify-center border border-[#6A6A6A] rounded-[10px] bg-[#FFFFFF] hover:bg-[#281CFF] hover:text-[white] hover:outline-none transition-all duration-450"
                    >
                      일반 예매내역 조회하기
                    </Link>
                  </div>
                </div>
                <div
                  id="map1"
                  className="hidden lg:flex xl:ml-[50px] mr-[12.5vw] lg:w-[180px] lg:h-[180px] xl:w-[242px] xl:h-[242px] rounded-[10px] border-[1px] border-[#B9B9B9] flex-shrink-0 z-0"
                ></div>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden mt-[50px] sm:mt-[30px]">
            {checkTickets()}
          </div>

          <div className="hidden lg:flex flex-col w-[90vw] xl:w-[1080px] h-[402px] flex-shrink-0 rounded-[10px] border-solid border-[#B9B9B9] border mt-[110px] mx-auto bg-[white]">
            <div className="flex flex-row">
              <div className="w-[90vw] xl:w-[1080px] h-[62px] flex-shrink-0 flex flex-row pt-[24px]">
                <div className="w-[30vw] xl:w-[360px]  flex flex-row pl-[50px] ">
                  <div className="font-[400] flex flex-col text-[12px] w-[37px] h-[19px] ">
                    Step 1
                  </div>
                  <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">
                    날짜 선택하기
                  </div>
                </div>
                <div className="w-[30vw] xl:w-[360px]  flex flex-row pl-[50px]">
                  <div className="font-[400] flex flex-col text-[12px] w-[37px] h-[19px] ">
                    Step 2
                  </div>
                  <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ml-[20px]">
                    시간 선택하기
                  </div>
                </div>
                <div className="w-[30vw] xl:w-[360px]  flex flex-row pl-[50px]">
                  <div className="font-[600] flex flex-col w-[67px] h-[19px] text-[12px] leading-[19px] tracking-[0.24px] ">
                    예매가능 좌석
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-[90vw] xl:w-[1079px] border-solid  border-y border-[#B9B9B9]">
              <div className="w-[30vw] xl:w-[360px] h-[260px] border-r border-[#E8E8E8] bg-[#F1F5FF]  flex flex-row">
                <div className="w-[30vw] xl:w-[270px] h-[200px] ml-[45px] mt-[30px]">
                  <Calendar />
                </div>
              </div>
              <div className="w-[30vw] xl:w-[360px] h-[260px] border-r bg-[#F1F5FF]  border-[#E8E8E8] flex flex-col">
                <div className="flex">
                  <div className="ml-[45px] mt-[30px]">
                    <SelectBox />
                  </div>
                </div>
              </div>
              <div className="w-[29.9vw] xl:w-[358px] h-[260px] flex flex-col bg-[#F1F5FF] ">
                <div className=" flex flex-col mx-auto mt-[30px] text-[14px]">
                  <Tickets />
                </div>
              </div>
            </div>
            <div className="flex justify-end mr-[20px] xl:ml-[480px] my-[16px]">
              {ReserveTickets()}
            </div>
          </div>

          <div className="flex flex-col mt-[30px] md:mt-[60px]">
            <div
              id="map2"
              className="lg:hidden items-center justify-center mx-auto flex w-[80vw] h-[20vw] flex-shrink-0 z-0 rounded-[10px] border-[1px] border-[#B9B9B9]"
            ></div>
            <div className="flex lg:hidden flex-col mt-[16px] w-[80vw] ml-[2px] h-[500px] md:h-[660px] flex-shrink-0 rounded-[10px] border-solid border-[#B9B9B9] border mx-auto bg-[white]">
              <div className="w-[60vw] h-[20px] flex md:h-[28px] text-[8px] md:text-[12px] flex-row gap-[13px] items-center justify-center text-center">
                <div className="font-[400]  w-[37px] h-[19px] text-center items-center flex whitespace-nowrap">
                  Step 1
                </div>
                <div className="font-[600] w-[67px] h-[19px]  text-center items-center flex leading-[19px] tracking-[0.24px] whitespace-nowrap">
                  날짜 선택하기
                </div>
              </div>

              <div className="w-[100%] h-[220px] items-center justify-center border-t border-[#E8E8E8] bg-[#F1F5FF] flex flex-row">
                <div className="my-[8px] w-[55vw] h-[100%] flex items-center justify-center">
                  <Calendar />
                </div>
              </div>

              <div className="w-[60vw] h-[20px] flex flex-row md:h-[28px] text-[8px] md:text-[12px] border-t border-[#E8E8E8] gap-[13px] items-center justify-center text-center">
                <div className="font-[400] w-[37px] h-[19px] text-center items-center flex whitespace-nowrap">
                  Step 2
                </div>
                <div className="font-[600] w-[67px] h-[19px] text-center items-center flex leading-[19px] tracking-[0.24px] whitespace-nowrap">
                  시간 선택하기
                </div>
              </div>

              <div className="w-[100%] h-[50px] md:h-[100px] items-center border-t border-[#E8E8E8] bg-[#F1F5FF] flex">
                <div className="mx-auto">
                  <SelectBox />
                </div>
              </div>

              <div className="w-[60vw] h-[20px] md:h-[28px] text-[8px] md:text-[12px] flex flex-row border-t border-[#E8E8E8] gap-[13px] items-center justify-center text-center">
                <div className="font-[400] w-[37px] h-[19px] text-center items-center flex whitespace-nowrap">
                  Step 3
                </div>
                <div className="font-[600] w-[67px] h-[19px] text-center items-center flex leading-[19px] tracking-[0.24px] whitespace-nowrap">
                  예매 가능좌석
                </div>
              </div>

              <div className="w-[100%] h-[80px] md:h-[100px] items-center border-t border-[#E8E8E8] bg-[#F1F5FF] flex">
                <div className=" flex flex-col w-[50vw] mx-auto text-[10px] md:text-[12px]">
                  <Tickets />
                </div>
              </div>
              <div className="flex border-t border-[#E8E8E8] bg-[#fff] rounded-b-[10px] w-[100%] h-[110px] md:h-[150px] flex-col items-center justify-center mx-auto">
                {ReserveTickets()}
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
}
