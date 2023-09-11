import Image from "next/image";
import { useState } from "react";
import './index.css';
import Background from "@/app/components/Background";

export default function freshman_ticket(){
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount((prevCount) => (prevCount < 1 ? prevCount + 1 : prevCount)); //최대값을 1로 설정
    };

    const handleDecrement = () => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount)); //최소값을 1로 설정
    };

    const [isCheck, setIsCheck] = useState(true);
    const [isPick, setIsPick] = useState("참");

    const handleCheckboxChange1 = (event: any) => {
    setIsCheck(event.target.value === "true");
    };

    const handleCheckboxChange2 = (event: any) => {
    setIsPick(event.target.value);
    };
    return (
        <div className="h-[1600px]">
            <Background>
                <div className="font-['pretendard'] mx-auto flex items-center flex-col mb-[84px]">
            <div className="flex flex-col items-center justify-center text-center mt-[40px]">
                <Image src="/assets/images/tickets/divider_medium.svg" alt="티켓" width={75} height={17}/>
                <div className="mt-[16px] flex flex-row">
                    <div className="font-[700] text-[32px] leading-[42px] text-[#281CFF]">신입생 티켓</div>
                    <div className="font-[700] text-[32px] leading-[42px]">&nbsp;결제하기</div>
                </div>
                <div className="mt-[32px]">
                    <div className="font-[500] text-[14px] leading-[21px]">깔루아 2023 9월 정기공연</div>
                    <div className="font-[500] text-[14px] leading-[21px]">2023.09.01 오후 6시</div>
                </div>
            </div>
            <div className="mt-[64px] flex flex-col ">
                <div className="font-[700] ml-[0.5vw] text-[20px] leading-[30px]">예매 인원을 선택해주세요. </div>
                <div className="w-[1108px] h-[3px] mt-[16px] bg-[#000] flex mx-auto"/>
                <div className="ml-[0.5vw] ">
                    <div className="mt-[32px] flex flex-row">
                        <div className="text-[14px] font-[500] leading-[21px] text-[#6A6A6A]">신입생</div>
                        <div className="ml-[60px] text-[14px] font-[500] leading-[21px] text-[#2D2D2D]">신입생 티켓은 1인 1매만 예매 가능합니다.</div>
                    </div>
                    <div className="mt-[16px] relative flex flex-row">
                        <div className="flex flex-row">
                            <div className="w-[120px] h-[76px] flex flex-col justify-center flex-shrink-0 text-[24px] font-[700] text-[#939393]">5000원</div>
                            <div className="flex flex-col  justify-center flex-shrink-0 text-[24px] leading-[28px] font-[700] text-[#281CFF]">0원</div>
                        </div>
                        <div className="absolute left-0 top-7">
                            <Image src="/assets/images/tickets/Arrow.svg" alt="arrow" width={100} height={100} className="w-[auto] h-[auto]"/>
                        </div>
                        <div className="w-[110px] h-[35px] mt-[20px] ml-[50px] flex flex-shrink-0 border border-solid border-[#D9D9D9] rounded-[10px] items-center justify-center">
                            <div className="flex gap-4">
                                <button className="flex h-[35px] mt-[2px] pr-[8px] text-center items-center justify-center border-r border-[#D9D9D9] text-[26px] font-[700]" onClick={handleDecrement}>-</button>
                                <p className="text-[26px] font-[700]">{count}</p>
                                <button className="flex h-[35px] mt-[2px] pl-[8px] text-center items-center justify-center border-l border-[#D9D9D9] text-[26px] font-[700]" onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1108px] h-[3px] mt-[40px] bg-[#D3D3D3] flex mx-auto"/>
                <div className="mx=auto ml-[0.5vw]">
                    <div className="mt-[26px] flex flex-row">
                        <div className="w-[140px] h-[24px] font-[700] pt-[6px] text-[20px] leading-[24px]">예매자 정보 입력</div>
                        <div className="text-[14px] text-[#464646] pl-[56px] flex flex-col">
                            <div>본인확인을 위해 정확한 정보를 입력해주세요.</div>
                            <div className="flex flex-row">
                                홍익대 <p className="text-[#281CFF]">&nbsp;신입생 확인</p>을 위해 <p className="text-[#281CFF]">&nbsp;학과 및 학번 정보</p>를 작성해야 하는 점 양해 부탁드립니다. <p className="text-[#0047FF]">&nbsp;추후 공연장 입장 시 학생증 확인이 이루어질 수 있습니다.</p> 
                            </div>
                        </div>
                    </div>
                    <div className="mt-[16px] flex flex-row mx-auto">
                        <div className="input-with-placeholder relative w-[540px] h-[80px] flex-shrink-0 border border-[#6A6A6A] border-solid rounded-[10px] p-4">
                            <input type="text" placeholder="예매자 이름"/>
                        </div>
                        <div className="input-with-placeholder relative w-[540px] h-[80px] flex-shrink-0 border border-[#6A6A6A]  border-solid rounded-[10px] p-4 ml-[32px]">
                            <input type="text" placeholder="연락처"/>
                        </div>
                    </div>
                    <div className="mt-[20px] flex flex-row">
                        <div className="input-with-placeholder relative w-[540px] h-[80px] flex-shrink-0 border border-[#6A6A6A]  border-solid rounded-[10px] p-4">
                            <input type="text" placeholder="학과"/>
                        </div>
                        <div className="input-with-placeholder relative w-[540px] h-[80px] flex-shrink-0 border border-[#6A6A6A]  border-solid rounded-[10px] p-4 ml-[32px]">
                            <input type="text" placeholder="학번"/>
                        </div>
                    </div>
                </div>
                <div className="w-[1108px] h-[3px] mt-[40px] bg-[#D3D3D3] mx-auto"/>
                <div className="ml-[0.5vw]">
                    <div className="mt-[32px] flex flex-row">
                        <div className="w-[160px] h-[29px] font-[700] text-[20px] leading-[30px]">티켓수령방법 선택</div>
                        <div className="w-[740px] h-[26px] ml-[56px]  text-[14px] font-[500] leading-[21px] text-[#464646] flex-shrink-0 flex flex-row">
                        티켓현장수령은 예매가 완료되면 부여되는 <div className="text-[#281CFF]">&nbsp;[예약번호]로 공연 당일 티켓을 수령하여 입장</div>합니다.
                        </div>
                    </div>
                    <div className="mt-[20px] text-[20px]">
                        <label className="flex flex-row">
                            <input type="radio" name="현장수령" checked={isCheck} onChange={handleCheckboxChange1} className="mr-[18px] w-[30px] h-[30px] accent-[#281CFF] flex-shrink-0"/>
                            <div className="text-[20px] font-[500] leading-[30px]">현장수령</div>
                        </label>
                    </div>
                </div>
                <div className="w-[1108px] h-[3px] mt-[41px] bg-[#D9D9D9]"/>
                <div className="ml-[0.5vw]">
                    <div className="flex flex-row">
                        <div className="w-[200px] h-[29px] mt-[32px] font-[700] text-[20px] leading-[30px]">신입생 뒷풀이 참여 여부</div>
                        <div className="w-[740px] h-[26px] mt-[32px]  ml-[56px] text-[14px] font-[500] leading-[21px] text-[#464646] flex-shrink-0 flex flex-row">
                        홍익대학교 24학번 신입생의 경우 랜덤으로 조가 배정되어 <div className="text-[#281CFF]">&nbsp;뒷풀이</div>가 있을 예정입니다.
                        </div>
                    </div>
                    <div className="mt-[20px] text-[20px] flex flex-row">
                        <label className="flex flex-row">
                            <input type="radio" name="뒷풀이" value={"참"} checked={isPick === "참"}  onChange={handleCheckboxChange2} className="mr-[18px] accent-[#281CFF]  w-[30px] h-[30px] flex-shrink-0"/>
                            <div>참</div>
                        </label>
                        <label className="ml-[118px] flex flex-row">
                            <input type="radio" name="뒷풀이" value={"불참"} checked={isPick === "불참"} onChange={handleCheckboxChange2} className="mr-[18px] accent-[#281CFF]  w-[30px] h-[30px] flex-shrink-0"/>
                            <div>불참</div>
                        </label>
                    </div>
                </div>
                <div className="w-[1108px] h-[3px] mt-[40px] bg-[#D3D3D3]"/>
                <div className="ml-[0.5vw]">
                    <div className="mt-[10px] flex flex-row">
                        <div className="w-[247px] h-[29px] pt-[32px] font-[700] text-[24px] leading-[28px]">유의사항 및 취소규정</div>
                    </div>
                    <ol className="list-decimal ml-[24px] font-[500] text-[16px] mt-[40px] leading-[26px]">
                        <li>예매취소는 24시간 이전에만 가능하며  그 이후에는 환불이 불가합니다. </li>
                        <li>여러장을 구매했을 시에는 일괄취소만 가능합니다.</li>
                        <li>예매하기-예매확인 - 예매취소 버튼으로 취소 가능합니다.</li>
                        <li>공연 24시간 전 이후에 예매 확정 및 안내 문자 발송예정입니다.</li>
                    </ol>
                </div>
            </div>
        </div>
        </Background>
        </div>
    );
}