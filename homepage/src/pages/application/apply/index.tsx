import Background from "@/app/components/Background";
import ApplicationNotice from "./ap_notice";
import Caution from "./caution";
import Form from "./form";


export default function Recruit() {
    return (
        <div className="h-[2280px] font-pretendard flex flex-col justify-center items-center content-center">
            <Background>
                <div className="w-full felx flex col justify-center items-center">
                    <div className="w-3/4">
                        <ApplicationNotice/>
                        <Caution/>
                        <div className="mt-2 h-[3px] mx-auto bg-[#000000]"/>
                        <Form/>
                    </div>
                </div>
            </Background>
        </div>
    )
}