/* 웰컴 페이지는 정적으로 제작하였음 */

import Card from "@/components/Welcome/Card";

const WelcomePage = () => {
  return (
    <div>
      <div className="flex justify-center mt-14">
        <div className="flex flex-col items-center">
          <h1 className="text-[6rem] font-bold text-blue-500">개발자 로드맵</h1>
          <h1 className="text-[6rem] font-bold">여기서부터 시작합니다</h1>
          <p className="text-xl text-gray-500">방황하지마세요. 이 바닥, 우리와 함께하면 절대 어렵지 않아요</p>
          <p className="text-xl mt-2 text-gray-500">개발자국의 로드맵과 함께 여러분의 성장 상황을 점검하고 발자취를 남겨보세요</p>
          <p className="text-xl mt-2 text-gray-500">뿐만 아니라 다양한 교류를 통해 앞으로 나아가보세요</p>
        </div>
      </div>
      <div className="flex justify-evenly px-32 mt-16">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex justify-evenly px-32 mt-8">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex justify-center">
        <button className="m-8 px-32 py-8 rounded-full transition bg-blue-100 text-2xl font-bold text-blue-600 hover:bg-blue-500 hover:text-white shadow-[0px_0px_24px_rgba(149,157,165,0.2)]">로드맵 탐색하기</button>
      </div>
    </div>
  )
}

export default WelcomePage;