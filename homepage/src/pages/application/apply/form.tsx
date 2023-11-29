import axios from "axios";
import { useState } from "react";

const OPTIONS_Gender = [
    { value: "man", name: "남성" },
    { value: "woman", name: "여성" },
    ];

const OPTIONS_Session1 = [
    { value: "vocal", name: "보컬" },
    { value: "drum", name: "드럼" },
    { value: "guitar", name: "기타" },
    { value: "bass", name: "베이스" },
    { value: "synthesizer", name: "신디" },
    ];

const OPTIONS_Session2 = [
    { value: "vocal", name: "보컬" },
    { value: "drum", name: "드럼" },
    { value: "guitar", name: "기타" },
    { value: "bass", name: "베이스" },
    { value: "synthesizer", name: "신디" },
    ];
    

export default function Form(){
    const [name, setName] = useState('');
    const [phone_num, setPhonNum] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [first_preference, setFirst] = useState('');
    const [second_preference, setSecond] = useState('');
    const [play_instrument, setInstrument] = useState('');
    const [motive, setMotive] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const handleSubmit = async () => {
        try {
            const formData = {
                name,
                phone_num,
                birthdate,
                gender,
                address,
                first_preference,
                second_preference,
                play_instrument,
                motive
            };
            const response = await axios.post('http://127.0.0.1:8000/application/apply/', formData);
            console.log(response)

            if (response.status === 200) {
                console.log('요청이 성공적으로 처리되었습니다.');
                console.log('응답 데이터:', response.data);
            } else {
                console.error('요청이 실패했습니다. HTTP 상태 코드:', response.status);
                console.error('에러 응답:', response.data);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };
    
    const SelectBox = (props: any) => {
    
        const handleOptionClick = (value:any) => {
            setSelectedValue(value);
        };
    
        return (
        <select className=" text-base cursor-pointer w-full h-[64px] rounded-[10px] border border-[#464646] border-solid text-center">
            <option value="" disabled >선택</option>
            {props.options.map((option: any) => (
            <option key={option.value} value={option.value} onClick={handleOptionClick}>
                {option.name}
            </option>
            ))}
        </select>
        );
    };

    function Name(){
        return(
            <div className="w-[calc(50%-16px)] h-auto">
                <p className="text-xl font-bold">이름</p>
                <div className="input-with-placeholder relative h-[64px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4">
                    <input value={name} type="text" className="text-base w-full h-full rounded-[10px] p-4 " placeholder="지원자 이름" onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    function Birth(){
        return(
            <div className="w-[calc(50%-16px)] h-auto">
                <p className="text-xl font-bold">생년월일</p>
                <div className="input-with-placeholder relative h-[64px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4">
                    <input value={birthdate} type="text" className="text-base w-full h-full rounded-[10px] p-4" placeholder="8자리로 입력해주세요" onChange={(e) => setBirthdate(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    function Number(){
        return(
            <div className="w-[calc(50%-16px)] h-auto">
                <p className="text-xl font-bold">전화번호</p>
                <div className="input-with-placeholder relative w-full h-[64px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4">
                    <input value={phone_num} type="text" className="text-base w-full h-full rounded-[10px] p-4" placeholder="기호없이 11자리로 입력해주세요 '예:01012345678'" onChange={(e) => setPhonNum(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    function Gender() {
        return(
            <div className="w-1/4 h-auto">
                <p className="text-xl font-bold">성별</p>
                <div className="h-[64px] flex-shrink-0 rounded-[10px] mt-4">
                    <SelectBox options={OPTIONS_Gender} onChange={() => setGender(selectedValue)}/>
                </div>
            </div>
        )
    }
    
    function Address(){
        return(
            <div className="mt-8">
                <p className="text-xl font-bold">거주지</p>
                <div className="input-with-placeholder relative w-full h-[64px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4">
                    <input value={address} type="text" className="text-base w-full h-full rounded-[10px] p-4" placeholder="기숙사의 경우 '예:2기숙사/부산'으로 입력해주세요" onChange={(e) => setAddress(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    function Session1(){
        return(
            <div className="w-[calc(50%-16px)] h-auto">
                <span className="text-xl font-bold">1지망 선택 (필수)</span>
                <span className="text-xs text-[#8E8E8E] ml-2">세션 중 1가지 선택</span>
                <div className="input-with-placeholder relative w-full h-[64px] flex-shrink-0 rounded-[10px] mt-4">
                    <SelectBox options={OPTIONS_Session1} onClick={setFirst(selectedValue)}/>
                </div>
            </div>
        )
    }
    
    function Session2(){
        return(
            <div className="w-[calc(50%-16px)] h-auto">
                <span className="text-xl font-bold">2지망 선택 (필수)</span>
                <span className="text-xs text-[#8E8E8E] ml-2">1지망에 선택한 세션을 제외하고 선택</span>
                <div className="input-with-placeholder relative w-full h-[64px] flex-shrink-0 mt-4">
                    <SelectBox options={OPTIONS_Session2} onClick={setSecond(selectedValue)}/>
                </div>
            </div>
        )
    }
    
    function Experience(){
        return(
            <div className="mt-8">
                <p className="text-xl font-bold">다룰 줄 아는 악기 (선택)</p>
                <div className="input-with-placeholder relative w-full h-[64px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4">
                    <input value={play_instrument} type="text" className="text-base  w-full h-full rounded-[10px] p-4" placeholder="" onChange={(e) => setInstrument(e.target.value)}/>
                </div>
            </div>
        )
    }
    
    function Motive(){
        return(
            <div className="pt-8">
                <p className="text-xl font-bold">지원 동기 (자유롭게 작성)</p>
                <textarea value={motive} className="text-base w-full h-[256px] flex-shrink-0 border border-[#464646] border-solid rounded-[10px] mt-4 p-4" placeholder="" onChange={(e) => setMotive(e.target.value)}/>
            </div>
        )
    }

    return(
        <>
            <div className="flex flex-col justify-center pt-8 pb-10">
                <div className="inline-flex flex-wrap flex-row space-x-8 items-start">
                    <Name/>
                    <Birth/>
                </div>
                <div className="inline-flex flex-wrap flex-row space-x-8 items-start pt-8">
                    <Number/>
                    <Gender/>
                </div>
                <Address/>
            </div>

            <div className="mt-2 h-[3px] mx-auto bg-[#D3D3D3]"/>

            <div className="flex flex-col justify-center pt-8 pb-10">
                <div className="inline-flex flex-wrap flex-row space-x-8 items-start">
                    <Session1/>
                    <Session2/>
                </div>
                <Experience/>
            </div>

            <div className="mt-2 h-[3px] mx-auto bg-[#D3D3D3]"/>
            
            <Motive/>

            <div className="flex flex-col justify-center items-center">
                <button className="w-80 h-16 bg-ocean rounded-[10px] mt-28 mb-32 text-[#FFFFFF]" onClick={handleSubmit}>
                    제출하기
                </button>
            </div>
        </>

    )
}

