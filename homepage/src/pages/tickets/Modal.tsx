import { useEffect, useState } from "react";
import Image from "next/image";

interface Order {
    id: number;
    orderNumber: string;
    name: string;
    cancelable: boolean;
}

const Modal = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [searchResult, setSearchResult] = useState<Order[]>([]);
    const [searched, setSearched] = useState(false);
    const [validOrderNumber, setValidOrderNumber] = useState(true);
    const [isClose, setIsClose] = useState(false);

    const handleSearch = () => {
        const tempSearchResult: Order[] = [
        { id: 1, orderNumber: "123456", name: "서지현", cancelable: true },
        { id: 2, orderNumber: "789012", name: "임가은", cancelable: false },
        ];
    
        const filteredSearchResult = tempSearchResult.filter(
        (order) => order.orderNumber === orderNumber
        );
        if (filteredSearchResult.length > 0) {
        setSearchResult(filteredSearchResult);
        setSearched(true);
        setValidOrderNumber(true);
        } else {
        setSearched(false);
        setValidOrderNumber(false);
        }
    };
    
    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
        handleSearch();
        }
    };
    
    const handleIsClose = () => {
        setIsClose(true);
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
        handleIsClose();
        }
    };
    
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
        document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    return !isClose ? (
        <div onClick={handleOverlayClick} className= "fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#0000008a] flex justify-center items-center">
            <div className="font-['pretendard'] w-[580px] h-[592px] bg-[#FFF] flex-shrink-0 fixed z-20">
                <button onClick={handleIsClose} className="ml-[544px] w-[36px] h-[38px] flex-col items-center flex justify-center text-[20px] font-[700]">x</button>
                <div className="w-[100%] h-[1px] bg-[#D3D3D3]"/>
                <div className="flex flex-col items-center text-center content-center mt-[40px] leading-normal">
                    <Image src="/assets/images/tickets/divider_medium.svg" alt="ticket" width={52} height={12}/>
                    <p className="font-[700] mt-[12px] text-[24px] leading-[28px]">예매 내역 확인</p>
                    <p className="mt-[20px] font-[500] text-[14px] laeding-[21px] text-[#4A4A4A]">티켓 예매 내역을 확인하고 취소할 수 있습니다.</p>
                </div>
                <div className=" mt-[48px] mx-auto w-[516px] h-[48px] flex rounded-[8px] items-center text-center content-center border-[1px] border-solid border-[#000] outline-none">
                    <input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="예매번호를 입력해 주세요."
                        className="flex-grow px-[16px] outline-none text-[14px]"
                        onKeyDown={handleInputKeyPress}
                    />
                    <div onClick={handleSearch} className="relative bg-[#D9D9D9] rounded-[4px] w-[24px] h-[24px] my-[12px] mr-[16px] cursor-pointer">
                        <Image src="/assets/images/tickets/search.png" alt="돋보기" width={100} height={100} className="flex w-[16px] h-[16px] mx-auto mt-[5px] "/>
                </div>
                    </div>
                    {searched && (
                        <div>
                            <div className="mt-[32px] mx-auto bg-[#F1F5FF] w-[516px] h-[120px] flex-shrink-0 rounded-[8px]">
                                <div className="flex flex-row align-center justify-center">
                                    <div className="mt-[15px] ml-[24px] w-[118px] h-[19px] flex text-center justify-center  items-center text-[12px] font-[700]"> 예매번호 </div>
                                    <div className="mt-[15px] mx-auto  w-[118px] h-[19px]  flex text-center justify-center  items-center text-[12px] font-[700]"> 예매자 성명 </div>
                                    <div className="mt-[15px] mr-[24px] w-[118px] h-[19px]  flex text-center justify-center  items-center text-[12px] font-[700]"> 취소 가능 여부 </div>
                                </div>
                                <div className="mt-[21px] h-[1px] w-[100%] bg-[#D3D3D3] "/>
                                {searchResult.map((order: any) => (
                                        <div key={order.id} className="flex flex-row align-center justify-center">
                                            <div className="mt-[19px] ml-[24px] w-[118px]  h-[21px] flex text-center justify-center items-center text-[14px] font-[500]"> {order.orderNumber} </div>
                                            <div className="mt-[19px] mx-auto w-[118px] flex text-center justify-center  items-center text-[14px] font-[500]"> {order.name} </div>
                                            <div className="mt-[19px] mr-[24px] w-[118px] flex text-center justify-center  items-center text-[14px] font-[500]"> {order.cancelable ? "취소 가능" : "취소 불가능"} </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="w-[514px] h-[48px] mt-[48px] mx-auto flex items-center">
                                <button className="w-full h-full bg-[#E8E8E8] rounded-[8px] text-center text-[#000] hover:text-[#FFF] text-[14px] font-[600] leading-[19px] hover:bg-[#281CFF]">
                                    예매 취소하기
                                </button>
                            </div>
                        </div>
                    )}
                    {!validOrderNumber && (
                            <div className="mt-[48px] flex text-center justify-center items-center font-[700] text-[14px]">잘못된 예매 번호 입니다.</div>
                    )}
            </div>
        </div>
    ): null;
};

export default Modal;