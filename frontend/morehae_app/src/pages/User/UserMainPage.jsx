import Tabs from "@/components/Tab/Tab";

const UserMainPage = () => {
  return (
    <div className="flex w-auto h-full justify-center m-8 rounded-lg bg-blue-100">
      <div className="w-2/3 h-[1000px] p-4">
        <div>
          <div className="relative grid grid-cols-3 h-20 bg-blue-100 justify-center">
            <div>
              <img
                className=" h-40 w-40 rounded-full p-5 m-auto"
                src="https://mblogthumb-phinf.pstatic.net/20120714_45/hicici_1342229509894uwpYG_JPEG/hicicipet01001.jpg?type=w2"
                alt="img"
              />
            </div>
            <div className="mt-9 m-2">
              <span className="mr-2 text-lg">닉네임</span>
              <span className="mr-2 text-md"> frontend</span>
            </div>
            <div className="mt-9 m-2 text-right">
              <button className="px-3 py-1 rounded-md text-xs text-white bg-blue-400 hover:bg-blue-500">회원정보수정</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3  bg-blue-200 rounded-md h-auto p-3">
          <div className="empty"></div>
          <div className="col-span-2">
            <div className="bg-white m-2 p-2 rounded-md">
              자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.
            </div>
            <div className="grid grid-cols-2">
              <div className="flex justify-center text-center bg-white m-2 p-2 rounded-md">
                <div className="mx-5 text-sm">
                  클리어한 노드
                  <div>4</div>
                </div>
                <div className="mx-5 text-sm">
                  로드맵 즐겨찾기
                  <div>5</div>
                </div>
              </div>
              <div className="flex justify-center text-center bg-white m-2  p-2 rounded-md">
                <div className="mx-5 text-sm">
                  작성한 게시글
                  <div>4</div>
                </div>
                <div className="mx-5 text-sm">
                  좋아요한 게시글
                  <div>5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default UserMainPage;
