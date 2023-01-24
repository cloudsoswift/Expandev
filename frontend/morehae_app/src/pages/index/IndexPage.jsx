
import QuestionList from "@/components/Index/QuestionList";
import { Link } from "react-router-dom";
import FeatureList from "@/components/Index/FeatureList";

const IndexPage = () => {

  return (
    <div className="container mx-auto min-h-screen h-full bg-gradient-to-b from-cyan-50 to-blue-500">
      <div className="service-inform grid grid-flow-row auto-rows-auto pt-40">
        <div className="justify-self-center h-10 w-full text-center text-4xl mb-8">
          개발자 로드맵. 여기에서 시작하세요.
        </div>
        <div className="justify-self-center h-10 w-full text-center text-2xl">
          당신을 위한 가이드
        </div>
        <div className="justify-self-center h-10 w-full text-center mb-32">
          <Link className="inline-block border-none rounded-lg px-32 py-4 text-4xl text- bg-white/70" to="/roadmap">
            <span>시작하기</span>
          </Link>
        </div>
      </div>
      <QuestionList />
      <FeatureList />
    </div>
  );
};

export default IndexPage;
