
export default function Caution(){
    return(
        <div className="flex flex-col justify-center py-8">
            <p className="text-xl font-bold mt-4">지원 방법</p>
            <div className="mt-2 h-[3px] w-full mx-auto bg-[#000000]"/>
            <div className="inline-flex flex-wrap flex-row justify-center space-x-8">
                <Apply_vocal/>
                <Apply_others/>
            </div>
            <p className="text-xs text-[#8E8E8E] mt-8">
                * 1지망과 2지망, 총 두 개의 세션에 지원하기 때문에 꼭 1지망 세션에 합격한다는 보장이 없습니다.<br/>
                &nbsp;&nbsp;&nbsp;이 점 유의하여 지원해 주시길 바랍니다.
            </p>
        </div>
    )
}

function Apply_vocal(){
    return(
        <div className="w-[calc(50%-16px)] h-auto rounded-[10px] bg-[#F1F5FF] py-8 px-10 mt-8">
            <p className="text-2xl font-bold text-center">
                보컬 부문
            </p>
            <p className="text-sm mt-8 text-center">
                보컬 지원자의 경우는 대면 오디션과 별개로 지원 영상을 따로 받고 있습니다.<br/>
                선곡은 자유이며, 2-3곡 정도를 영상으로 찍어 보내주시길 바랍니다.<br/>
                가사를 보고 불러도 되니 편하게 지원해 주세요.<br/>
                제출 방식은 기재해 주신 연락처를 통해 개별 공지해 드립니다.
            </p>
        </div>
    )
}

function Apply_others(){
    return(
        <div className="w-[calc(50%-16px)] h-auto rounded-[10px] bg-[#F1F5FF] py-8 px-10 mt-8">
            <p className="text-2xl font-bold text-center">
                드럼/기타/베이스/신디 부문
            </p>
            <p className="text-sm mt-8 text-center">
                보컬 지원자를 제외한 다른 세션의 경우<br/>
                별도의 지원 영상이 필요하지 않습니다.<br/>
                3월 11일 진행되는 오디션에만 참여해 주시면 됩니다.
            </p>
        </div>
    )
}