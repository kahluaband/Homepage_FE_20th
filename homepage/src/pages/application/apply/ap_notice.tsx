import Image from "next/image";
import divider from "/public/assets/images/recruit/divider_medium.svg";

export default function ApplicationNotice(){
    return(
        <div className="flex flex-col justify-center items-center py-10">
            <Image src={divider} alt="notice" width={75}/>
            <p className="font-Gotham text-[32px] mt-4 font-bold">지원하기</p>
            <p className="text-sm mt-8 text-center">
                안녕하세요! 홍익대학교 컴퓨터공학과 밴드학회 깔루아입니다.<br/>
                단순 인원 집계용으로 사용되는 가입 지원서이므로 부담 없이 작성해 주시면 됩니다.<br/>
                <br/>
                오디션 일자는 3월 11일 월요일이며, 상세 일정은 아래 작성해 주신 연락처로 개별 공지드리겠습니다.<br/>
                <br/>
                <span className=" text-ocean">보컬 2명 / 드럼 2명 / 기타 4명 / 베이스 2명 / 신디(피아노) 2명</span>
                <span>을 모집하고 있습니다.<br/></span>
                위에 기재된 악기 외에도 다룰 줄 아는 악기가 있으시다면 아래에 기재해 주세요.
            </p>
        </div>
    )
}