/* 웰컴 페이지는 정적으로 제작하였음 */

import Card from "@/components/Welcome/Card";
import { useRef } from "react";
import { Link } from "react-router-dom";
import QuestionList from "@/components/Welcome/QuestionList";
import vid from "@/img/sample.mp4"


const WelcomePage = () => {
  return (
    <div>
      <div className="relative">
        <video className="w-full h-[35rem] object-cover" src={vid} autoPlay muted loop></video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
          <h1 className="text-[6rem] font-bold text-green-500 font-bold">개발자 로드맵</h1>
          <h1 className="text-[6rem] font-bold text-purple-500">멀리 가지 마세요</h1>
          <h1 className="text-[6rem] font-bold">여기서부터 시작합니다</h1>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-14">
        <p className="text-xl text-gray-500">방황하지마세요. 이 바닥, 우리와 함께하면 절대 어렵지 않아요</p>
        <p className="text-xl mt-2 text-gray-500">개발자국의 로드맵과 함께 여러분의 성장 상황을 점검하고 발자취를 남겨보세요</p>
        <p className="text-xl mt-2 text-gray-500">뿐만 아니라 다양한 교류를 통해 앞으로 나아가보세요</p>
        <p className="text-[2rem] mt-8">혹시 아래와 같은 고민을 하고 계셨나요?</p>
        <p className="text-[2rem] mt-2">공감하는 고민이 있었다면 눌러보세요. 그리고 길을 안내받으세요</p>
      </div>

      <QuestionList />

      <div className="flex justify-center mt-8">
        <Link to="/roadmap">
          <button className="m-8 px-32 py-8 rounded-full transition bg-green-500 text-2xl font-bold text-green-800 hover:bg-green-400 hover:text-white shadow-[0px_0px_24px_rgba(149,157,165,0.2)]">로드맵 탐색하기</button>
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage;