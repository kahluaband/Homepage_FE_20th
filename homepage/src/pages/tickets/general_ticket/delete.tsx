import { useState } from "react";
import Image from "next/image";
import Background from "@/app/components/Background";
import axios from 'axios';
import { useRouter } from "next/router";

interface Order {
    id: number;
    merchant_order_id: string;
    name: string;
    cancelable: boolean;
}

const general_delete = () => {
    const router = useRouter();
    const [merchant_order_id, setMerchant_order_id] = useState("");
    const [cancelable, setCancelable] = useState(false);
    const [searched, setSearched] = useState(false);
    const [validMerchant_order_id, setValidMerchant_order_id] = useState(true);
    const [buyer, setBuyer] = useState('');



    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/tickets/general_complete/?merchant_order_id=${merchant_order_id}`);
            
            if (response.data) {
                console.log(response.data); 
                setSearched(true);
                setValidMerchant_order_id(true);
                setBuyer(response.data.data.buyer);
                setCancelable(true);
            } else {
                setSearched(false);
                setValidMerchant_order_id(false);
            }
        } catch (error) {
            console.error('Error searching reservation:', error);
            setSearched(false);
            setValidMerchant_order_id(false);
        }
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
        handleSearch();
        }
    };

    const handleCancelReservation = () => {
        if(cancelable === true){
        router.push({
            pathname: '/tickets/freshman_ticket/check/',
            query: { merchant_order_id :merchant_order_id } 
        })}};
    
    return  (
        <div className = "h-[650px]">
        <Background>
            <div className="font-['pretendard'] mx-[12.5vw] flex items-center flex-col mb-[84px]">
                <div className="flex flex-col items-center text-center content-center mt-[40px] leading-normal">
                    <Image src="/assets/images/tickets/divider_medium.svg" alt="ticket" width={52} height={12}/>
                    <p className="font-[700] mt-[12px] text-[24px] leading-[28px]">일반 예매 내역 확인</p>
                    <p className="mt-[20px] font-[500] text-[14px] laeding-[21px] text-[#4A4A4A]">티켓 예매 내역을 확인하고 취소할 수 있습니다.</p>
                </div>
                <div className=" mt-[48px] mx-auto w-[516px] h-[48px] flex rounded-[8px] items-center text-center content-center border-[1px] border-solid bg-[#FFF] border-[#000] outline-none">
                    <input
                        type="text"
                        value={merchant_order_id}
                        onChange={(e) => setMerchant_order_id(e.target.value)}
                        placeholder="예매번호를 입력해 주세요."
                        className="flex-grow px-[16px] outline-none text-[14px]"
                        onKeyDown={handleInputKeyPress}
                    />
                    <div onClick={handleSearch} className="relative bg-[#D9D9D9] rounded-[4px] w-[24px] h-[24px] my-[12px] mr-[16px] cursor-pointer">
                        <Image src="/assets/images/tickets/search.png" alt="돋보기" width={100} height={100} className="flex w-[16px] h-[16px] mx-auto mt-[5px] "/>
                    </div>
                </div>
                {searched && (
                    <div className="mt-[48px] mx-auto items-center content-center flex flex-col ">
                        <div className="mt-[32px] mx-auto bg-[#F1F5FF] w-[516px] h-[120px] flex-shrink-0 rounded-[8px]">
                            <div className="flex flex-row align-center justify-center">
                                <div className="mt-[15px] ml-[24px] w-[118px] h-[19px] flex text-center justify-center  items-center text-[12px] font-[700]"> 예매번호 </div>
                                <div className="mt-[15px] mx-auto  w-[118px] h-[19px]  flex text-center justify-center  items-center text-[12px] font-[700]"> 예매자 성명 </div>
                                <div className="mt-[15px] mr-[24px] w-[118px] h-[19px]  flex text-center justify-center  items-center text-[12px] font-[700]"> 취소 가능 여부 </div>
                            </div>
                            <div className="mt-[21px] h-[1px] w-[100%] bg-[#D3D3D3] "/>
                                    <div className="flex flex-row align-center justify-center">
                                        <div className="mt-[19px] ml-[24px] w-[118px]  h-[21px] flex text-center justify-center items-center text-[14px] font-[500]"> {merchant_order_id} </div>
                                        <div className="mt-[19px] mx-auto w-[118px] flex text-center justify-center  items-center text-[14px] font-[500]"> {buyer} </div>
                                        <div className="mt-[19px] mr-[24px] w-[118px] flex text-center justify-center  items-center text-[14px] font-[500]"> {cancelable ? "취소 가능" : "취소 불가능"} </div>
                                    </div>
                        </div>
                        <div className="w-[514px] h-[48px] mt-[48px] mx-auto flex items-center">
                        <button onClick={handleCancelReservation} className="w-full h-full bg-[#E8E8E8] rounded-[8px] text-center text-[#000] hover:text-[#FFF] text-[14px] font-[600] leading-[19px] hover:bg-[#281CFF]">
                            예매 취소하기
                        </button>
                        </div>
                    </div>
                )}
                {!validMerchant_order_id && ( <div className="mt-[48px] flex text-center justify-center items-center font-[700] text-[14px]">잘못된 예매 번호 입니다.</div>)}
            </div>
        </Background>
    </div>
    )
};

export default general_delete;