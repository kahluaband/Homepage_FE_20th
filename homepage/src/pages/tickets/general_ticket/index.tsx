import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import '../index.css';
import Background from "@/app/components/Background";
import Link from "next/link";
import axios from 'axios';

export default function general_ticket(){
    const router = useRouter();
    const [member, setmember] = useState(1);
    const [buyer, setBuyer] = useState('');
    const [phone_num, setphone_num] = useState('');
    const [isCheck, setIsCheck] = useState(true);
    const [status, setStatus] = useState(false);
    const [payment, setPayment] = useState("계좌이체");
    const [price, setPrice] = useState(5000);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [namesArray, setNamesArray] = useState<string[]>([]);
    const [phonesArray, setPhonesArray] = useState<string[]>([]);
    var id="";
    var merchant_order_id = "";

    useEffect(() => {
        const isDataComplete = buyer.trim() !== '' && phone_num.trim() !== '';
        setIsFormComplete(isDataComplete);
    }, [buyer, phone_num]);
    
    const handleSubmit = async () => {
        console.log(buyer, phone_num, member, namesArray, phonesArray, price, status, payment);
        try {
            const formData = new FormData();
            formData.append('buyer', buyer);
            formData.append('phone_num', phone_num);
            formData.append('member', String(member)); // member를 문자열로 변환하여 FormData에 추가
            formData.append('price', String(price)); // price를 문자열로 변환하여 FormData에 추가
            namesArray.forEach(name => formData.append('name[]', name)); // name[]로 배열 형식으로 추가
            phonesArray.forEach(phone => formData.append('phone[]', phone)); // phone[]로 배열 형식으로 추가
            formData.append('status', status ? 'true' : 'false'); // status를 문자열로 변환하여 FormData에 추가
            formData.append('payment', payment);
    
            console.log(formData);
    
            const response = await axios.post('http://127.0.0.1:8000/tickets/general_ticket/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // form-data로 설정
                },
            });
    
            console.log(response);
    
            if (response.status === 200) {
                console.log('요청이 성공적으로 처리되었습니다.');
                console.log('응답 데이터:', response.data.data);
                console.log(response.data.data.id);
                id = response.data.data.id;
                fetchMerchant_order_id();
            } else {
                console.error('요청이 실패했습니다. HTTP 상태 코드:', response.status);
                console.error('에러 응답:', response.data);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const fetchMerchant_order_id = async () =>{
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('amount', String(price));
            console.log(formData);
            const response = await axios.post(`http://127.0.0.1:8000/tickets/checkout/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // form-data로 설정
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                merchant_order_id = response.data.merchant_order_id;
                console.log(merchant_order_id);
                if (payment === "계좌이체") {
                    router.push({
                        pathname: "/tickets/general_complete",
                        query: { ...router.query, merchant_order_id, phone_num },
                    });
                } else {
                    if (buyer && phone_num && price) {
                        router.push({
                            pathname: "/tickets/payment",
                            query: { ...router.query, merchant_order_id, buyer, phone_num, member, price, payment },
                        });
                    }
                }
            } else {
                console.log("error");
            }
        } catch (error) {
            console.error('Error submitting checkout data:', error);
        }
    }
    

    const handleIncrement = () => {
        setmember((prevmember) => (prevmember < 5 ? prevmember + 1 : prevmember)); //최대값을 5로 설정
    };

    const handleDecrement = () => {
        setmember((prevmember) => (prevmember > 1 ? prevmember - 1 : prevmember)); //최소값을 1로 설정
    };

    const handleCheckboxChange1 = (event: any) => {
        setIsCheck(event.target.value === "true");
    };

    const handleCheckboxChange2 = (event: any) => {
        setPayment(event.target.value);
        };


    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = event.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        setphone_num(phoneNumber);
    };

    const handleBuyerChange = (event: any) => {
        setBuyer(event.target.value);
    };

    useEffect(() => {
        const calculatePrice = () => {
            return 5000 * member;
        }

        const newPrice = calculatePrice();
        setPrice(newPrice);
    }, [member]);

    const payer_info = () => {
        const divs: JSX.Element[] = [];
        divs.push(
            <div key={0}>
            <div className="flex flex-row mt-[18px]">
                <div className="flex items-center justify-center text-center">1. </div>
                <div className="flex flex-row lg:mx-auto items-center justify-center">
                    <div className="text-[16px] ml-[2vw] leading-[26px] font-[500] items-center flex h-[40px] w-[7.5vw] min-w-[50px]"> 이름</div>
                    <div className="input-with-placeholder relative lg:w-[21vw] w-[18vw] ml-[0.5vw] h-[40px] flex-shrink-0 border bg-[white] border-[#6A6A6A] border-solid rounded-[10px] px-2">
                        <input type="text" placeholder="" onChange={handleBuyerChange} />
                    </div>
                    <div className="ml-[9vw] lg:ml-[10vw] text-[16px] leading-[26px] font-[500] items-center flex h-[40px] w-[7.5vw] min-w-[55px]">연락처</div>
                    <div className="input-with-placeholder relative lg:w-[21vw] w-[18vw] ml-[0.5vw] h-[40px] flex-shrink-0 border bg-[white] border-[#6A6A6A] border-solid rounded-[10px] px-2">
                        <input type="text" placeholder="‘-’없이 입력해주세요. 예) 01012345678" onChange={handlePhoneNumberChange} />
                    </div>
                </div>
            </div>
        </div>
        )

        for (let i = 1; i < member; i++) {
            const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const updatedNames = [...namesArray];
                updatedNames[i-1] = event.target.value;
                setNamesArray(updatedNames);
            };

            const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const phoneNumber = event.target.value.replace(/[^0-9]/g, '');
                const updatedPhones = [...phonesArray];
                updatedPhones[i-1] = phoneNumber;
                setPhonesArray(updatedPhones);
            };

    
            divs.push(
                <div key={i}>
                    <div className="flex flex-row mt-[18px]">
                        <div className="flex items-center justify-center text-center">{i + 1}. </div>
                        <div className="flex flex-row lg:mx-auto items-center justify-center">
                            <div className="text-[16px] ml-[2vw] leading-[26px] font-[500] items-center flex h-[40px] w-[7.5vw] min-w-[50px]"> 이름</div>
                            <div className="input-with-placeholder relative lg:w-[21vw] w-[18vw] ml-[0.5vw] h-[40px] flex-shrink-0 border bg-[white] border-[#6A6A6A] border-solid rounded-[10px] px-2">
                                <input type="text" placeholder="" onChange={handleNameChange} />
                            </div>
                            <div className="ml-[9vw] lg:ml-[10vw] text-[16px] leading-[26px] font-[500] items-center flex h-[40px] w-[7.5vw] min-w-[55px]">연락처</div>
                            <div className="input-with-placeholder relative lg:w-[21vw] w-[18vw] ml-[0.5vw] h-[40px] flex-shrink-0 border bg-[white] border-[#6A6A6A] border-solid rounded-[10px] px-2">
                                <input type="text" placeholder="‘-’없이 입력해주세요. 예) 01012345678" onChange={handlePhoneChange} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return divs;
    };

    return (
        <div className="h-[2000px] lg:h-[1900px]">
            <Background>
                <div className="font-['pretendard'] mx-[12.5vw] flex items-center flex-col mb-[84px]">
                <div className="flex flex-col items-center mx-[12.5vw] text-center mt-[40px]">
                    <Image src="/assets/images/tickets/divider_medium.svg" alt="티켓" width={75} height={17}/>
                    <div className="mt-[16px] flex flex-row">
                        <div className="font-[700] text-[32px] leading-[42px] whitespace-nowrap text-[#281CFF]">일반 티켓</div>
                        <div className="font-[700] text-[32px] leading-[42px] whitespace-nowrap">&nbsp;결제하기</div>
                    </div>
                    <div className="mt-[32px]">
                        <div className="font-[500] text-[14px] leading-[21px]">깔루아 2023 9월 정기공연</div>
                        <div className="font-[500] text-[14px] leading-[21px]">2023.09.01 오후 6시</div>
                    </div>
                </div>
                <div className="mt-[64px] flex flex-col mx-auto ">
                    <div className="font-[700] text-[20px] leading-[30px]">예매 인원을 선택해주세요. </div>
                    <div className="w-[72.5vw] h-[3px] mt-[16px] bg-[#000] flex "/>
                    <div className="ml-[0.5vw] ">
                        <div className="mt-[32px] flex flex-row">
                            <div className="text-[14px] font-[500] leading-[21px] text-[#6A6A6A]">일반</div>
                            <div className="ml-[5vw] text-[14px] font-[500] w-[60vw] leading-[21px] text-[#2D2D2D]">일반 티켓은 1인 5매까지 예매 가능합니다.</div>
                    </div>
                    <div className="mt-[16px] relative flex flex-roww">
                        <div className="flex flex-row">
                            <div className="w-[120px] h-[76px] flex flex-col justify-center flex-shrink-0 text-[24px] font-[700] text-[#000000]">5000원</div> 
                        </div>
                        <div className="bg-[white] w-[110px] h-[35px] mt-[20px] ml-[7.5vw] flex flex-shrink-0 border border-solid border-[#D9D9D9] rounded-[10px] items-center justify-center">
                                <div className="flex gap-4">
                                    <button className="flex h-[35px] mt-[2px] pr-[8px] text-center items-center justify-center border-r border-[#D9D9D9] text-[26px] font-[700]" onClick={handleDecrement}>-</button>
                                    <p className="text-[26px] font-[700]">{member}</p>
                                    <button className="flex h-[35px] mt-[2px] pl-[8px] text-center items-center justify-center border-l border-[#D9D9D9] text-[26px] font-[700]" onClick={handleIncrement}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[72.5vw] h-[3px] mt-[40px] bg-[#D3D3D3] flex"/>
                    <div className="mx-auto ml-[0.5vw]">
                        <div className="mt-[32px] flex lg:flex-row flex-col ">
                            <div className="w-[140px] h-[29px] font-[700] pt-[8px] text-[20px] leading-[24px]">예매자 정보 입력</div>
                            <div className="w-[60vw] h-[40px] lg:w-[60vw] text-[14px] text-[#464646] lg:ml-[2.5vw] ml-[0.5vw] flex flex-col lg:mt-0 justify-center mt-[16px] ">
                                <div>본인확인을 위해 정확한 정보를 입력해주세요.</div>
                        </div>
                    </div>
                    {payer_info()}
                </div>
                <div className="w-[72.5vw] h-[3px] mt-[32px] bg-[#D3D3D3]"/>
                    <div className="ml-[0.5vw]">
                        <div className="mt-[32px] flex lg:flex-row flex-col">
                            <div className="w-[160px] h-[29px] font-[700] text-[20px] leading-[30px]">티켓수령방법 선택</div>
                            <div className="whitespace-pre-wrap w-[47.5vw] h-[26px] lg:ml-[2.5vw] ml-[0.5vw] lg:mt-[8px] mt-[15px]  text-[14px] font-[500] leading-[21px] text-[#464646] flex-shrink-0 flex flex-col lg:flex-row">
                                <p className="whitespace-nowrap">티켓현장수령은 예매가 완료되면 부여되는</p> 
                                <div className="flex flex-row">
                                    <p className="hidden lg:flex">&nbsp;</p><p className="text-[#281CFF] whitespace-nowrap">[예약번호]로 공연 당일 티켓을 수령하여 입장</p><p className="whitespace-nowrap">합니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-[20px] mt-[18px]">
                            <label className="flex flex-row">
                                <div className="flex items-center justify-center mt-[12px]">
                                    <input type="radio" name="현장수령" checked={isCheck} onChange={handleCheckboxChange1} className="mr-[18px] w-[18px] h-[18px] accent-[#281CFF] flex-shrink-0"/>
                                    <div className="text-[20px] font-[500] leading-[30px]">현장수령</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="w-[72.5vw] h-[3px] mt-[40px] bg-[#D9D9D9]"/>
                    <div className="ml-[0.5vw]">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-[120px] h-[29px] mt-[32px] font-[700] text-[20px] leading-[30px]">결제 방법 선택</div>
                            <div className="w-[740px] h-[26px] lg:mt-[36px] mt-[16px] lg:ml-[56px] ml-[0.5vw] text-[14px] font-[500] leading-[21px] text-[#464646] flex-shrink-0 flex">계좌이체 선택 시 다음 화면에서 계좌번호를 확인해주세요.</div>
                        </div>
                        <div className="mt-[20px] text-[20px] flex flex-row">
                            <label className="flex flex-row items-center justify-center ">
                                <input type="radio" name="결제방법" value={"계좌이체"} checked={payment === "계좌이체"}  onChange={handleCheckboxChange2} className="mr-[18px] accent-[#281CFF]  w-[18px] h-[18px] flex-shrink-0"/>
                                <div className="font-[500]">계좌이체</div>
                            </label>
                            <label className="ml-[5vw] flex-row flex items-center justify-center ">
                                <input type="radio" name="결제방법" value={"카카오페이"} checked={payment === "카카오페이"} onChange={handleCheckboxChange2} className="mr-[18px] accent-[#281CFF]  w-[18px] h-[18px] flex-shrink-0"/>
                                <div className="font-[500]">카카오페이</div>
                            </label>
                        </div>
                    </div>
                    <div className="w-[72.5vw] h-[3px] mt-[40px] bg-[#D9D9D9]"/>
                    <div className="ml-[0.5vw]">
                        <div className="flex flex-row">
                            <div className="w-[200px] h-[29px] mt-[32px] font-[700] text-[20px] leading-[30px]">최종 결제 금액</div>
                        </div>
                        <div className="font-[700] text-[24px] mt-[20px] flex flex-row">
                            5000원 x {member}매 = <p className="text-[#281CFF]">&nbsp;{5000*member}원</p>
                        </div>
                    </div>
                    <div className="w-[72.5vw] h-[3px] mt-[40px] bg-[#D3D3D3]"/>
                    <div className="ml-[0.5vw]">
                        <div className="mt-[10px] flex flex-row">
                            <div className="w-[247px] h-[29px] pt-[32px] font-[700] text-[24px] leading-[28px]">유의사항 및 취소규정</div>
                        </div>
                        <ol className="list-decimal ml-[24px] font-[500] text-[13px] lg:text-[16px] mt-[44px] leading-[26px]">
                            <li>예매취소는 24시간 이전에만 가능하며  그 이후에는 환불이 불가합니다. </li>
                            <li>여러장을 구매했을 시에는 일괄취소만 가능합니다.</li>
                            <li>예매하기-예매확인 - 예매취소 버튼으로 취소 가능합니다.</li>
                            <li>공연 24시간 전 이후에 예매 확정 및 안내 문자 발송예정입니다.</li>
                        </ol>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-[100px]">
                    {payment === "계좌이체" && (
                    <div className="flex items-center justify-center mt-[94px]">
                        <button disabled={!isFormComplete} onClick={handleSubmit} className="w-[270px] h-[53px] felx items-center justify-center rounded-[6px] bg-[#281CFF] text-[white]  text-18px] font-[700] leading-[17px] text-center">결제하기</button>
                    </div>
                    )}
                    {payment === "카카오페이" && (
                        <Link href="payment">
                            <button  onClick={handleSubmit} className="w-[270px] h-[52px] flex items-center justify-center rounded-[6px] bg-[#281CFF] text-[white] text-18px font-[700] leading-[17px] text-center">
                            결제하기
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </Background>
        </div>
    );
}