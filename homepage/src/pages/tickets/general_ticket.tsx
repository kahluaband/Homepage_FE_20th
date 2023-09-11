import Image from "next/image";
import { useState } from "react";
import './index.css';
import Background from "@/app/components/Background";

export default function general_ticket(){
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount((prevCount) => (prevCount < 5 ? prevCount + 1 : prevCount)); //최대값을 1로 설정
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
        <div className="h-[1800px]">
        <Background>
        <div className="font-['pretendard'] mt-[50px] mx-auto flex items-center flex-col mb-[84px]">
            <div className="flex flex-col items-center justify-center text-center mt-[40px]">
                <Image src="/ticket.png" alt="티켓" width={24} height={24}/>
                <div className="mt-[20px] flex flex-row">
                    <div className="font-[700] text-[24px] text-[#0047FF]">일반 티켓</div>
                    <div className="font-[700] text-[24px]">&nbsp;결제하기</div>
                </div>
                <div className="mt-[20px]">
                    <div className="font-[400] text-[20px]">깔루아 2023 9월 정기공연</div>
                    <div className="font-[400] text-[20px]">2023.09.01 오후 6시</div>
                </div>
            </div>
            <div className="mt-[55px] flex flex-col">
                <div className="pl-[8px] font-[700] text-[24px]">예매 인원을 선택해주세요. </div>
                <div className="w-[1120px] h-[3px] mt-[16px] bg-[#000]"/>
                <div className="pl-[8px]">
                    <div className="mt-[10px] flex flex-row">
                        <div className="text-[14px] text-[#939393]">일반</div>
                        <div className="ml-[16px] text-[14px] text-[#464646]">일반 티켓은 1인 5매까지 예매 가능합니다.</div>
                    </div>
                    <div className="mt-[4px] relative flex flex-row">
                        <div className="flex flex-row">
                            <div className="w-[156px] h-[76px] flex flex-col justify-center flex-shrink-0 text-[24px] font-[700] text-[#000000]">5000원</div> 
                        </div>
                        <div className="w-[140px] h-[40px] mt-[20px] ml-[200px] flex flex-shrink-0 border border-solid border-[#D9D9D9] rounded-[10px] items-center justify-center">
                            <div className="flex gap-6">
                                <button className="flex px-3 text-center items-center justify-center border-r border-[#D9D9D9] text-[26px] font-[700]" onClick={handleDecrement}>-</button>
                                <p className="text-[26px] font-[700]">{count}</p>
                                <button className="flex px-3 text-center items-center justify-center border-l border-[#D9D9D9] text-[26px] font-[700]" onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1120px] h-[3px] mt-[15px] bg-[#D9D9D9]"/>
                <div className="pl-[8px]">
                
                    <div className="mt-[10px] flex flex-row">
                        <div className="w-[247px] h-[29px] pt-[6px] font-[700] text-[24px]">예매자 정보 입력</div>
                        <div className="mt-[12px] text-[14px] text-[#464646] flex flex-col">
                            본인확인을 위해 정확한 정보를 입력해주세요.
                        </div>
                    </div>
                    {[...Array(count)].map((_, index) => (
                    <div key={index}>
                        <div className="mt-[33px] flex flex-row">
                        <div className="input-with-placeholder relative w-[540px] h-[76px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] p-4">
                            <input type="text" placeholder="예매자 이름" />
                        </div>
                        <div className="input-with-placeholder relative w-[540px] h-[76px] flex-shrink-0 border border-[#464646]  border-solid rounded-[10px] p-4 ml-[20px]">
                            <input type="text" placeholder="연락처" />
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="w-[1120px] h-[3px] mt-[64px] bg-[#D9D9D9]"/>
                <div className="pl-[8px]">
                    <div className="mt-[10px] flex flex-row">
                        <div className="w-[247px] h-[29px] pt-[6px] font-[700] text-[24px]">티켓수령방법 선택</div>
                        <div className="w-[740px] h-[26px] pt-[10px] ml-[16px] text-[16px] text-[#464646] flex-shrink-0 flex flex-row">
                        티켓현장수령은 예매가 완료되면 부여되는 <div className="text-[#0047FF]">&nbsp;“예약번호"로 공연 당일 티켓을 수령하여 입장</div>합니다.
                        </div>
                    </div>
                    <div className="mt-[33px] text-[20px]">
                        <label className="flex flex-row">
                            <input type="radio" name="현장수령" checked={isCheck} onChange={handleCheckboxChange1} className="mr-[18px] w-[30px] h-[30px] flex-shrink-0"/>
                            <div>현장수령</div>
                        </label>
                    </div>
                </div>
                <div className="w-[1120px] h-[3px] mt-[64px] bg-[#D9D9D9]"/>
                <div className="pl-[8px]">
                    <div className="mt-[10px] flex flex-row">
                        <div className="w-[247px] h-[29px] pt-[6px] font-[700] text-[24px]">유의사항 및 취소규정</div>
                    </div>
                    <ol className="list-decimal ml-[24px] font-[700] text-[20px] mt-[36px]">
                        <li>예매취소는 24간 이전에만 가능하며  그 이후에는 환불이 불가합니다. </li>
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