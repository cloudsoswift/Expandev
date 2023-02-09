import { FaHeart } from "react-icons/fa";
import { SlSpeech } from "react-icons/sl";
import { useNavigate } from "react-router-dom";


const BlogTab = ({ userBlog }) => {
  let navigate = useNavigate()

  const toPost = (id)=> {
    navigate(`/blog/post/${id}`)
  }
  return (
    <>
      <div className="mt-8 mb-12">
        {/* 제일 잘만든거 */}
        <div className="m-3">작성한 게시글</div>
        <div className="h-80 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md flex flex-wrap gap-1 p-4 overflow-y-auto  ">
          {userBlog?.post_articles.map((post) => (
            <div
              key={post.id}
              onClick={()=> toPost(post.id)}
              className="h-70 basis-72 rounded-xl bg-[rgb(45,51,59)] mx-1 mt-1 mb-4 border border-[rgb(131,132,139)] drop-shadow-md  transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <div className="bg-[rgb(45,51,59)] flex justify-between h-12 p-3 rounded-t-xl border-b border-[rgb(131,132,139)]">
                <div className="text-md font-medium text-ellipsis line-clamp-1">
                  {post?.title}
                </div>
                <div className="text-sm flex ">
                  {/* <BsPencilSquare /> */}
                  <FaHeart
                    className={
                      post?.liked
                        ? "mt-1.5 text-xs text-red-600"
                        : "mt-1.5 text-xs text-white"
                    }
                  />
                  <div className="ml-1 mt-1 mr-1.5 text-xs">
                    {post?.like_users_count}
                  </div>
                </div>
              </div>
              <div className="text-sm h-32 text-[rgb(191,192,194)] px-3 pt-2 pb-2 text-ellipsis line-clamp-6  border-[rgb(131,132,139)]">
                {post?.overview}
              </div>
              <div className="h-14 border-b pl-3 border-[rgb(131,132,139)]">
                {/* 태그 중 상위 2개(0,1번째)만 렌더링 */}
                {post?.tags
                  ?.filter((item, index) => index <= 1)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="inline-block text-[0.5rem] py-1 px-3 mr-2 mt-4 mb-3 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full"
                    >
                      # {item.tag}
                    </div>
                  ))}
              </div>

              <div className=" border-[rgb(131,132,139)] ">
                <div className="flex justify-between text-xs text-[rgb(191,192,194)] border-t p-3 border-[rgb(131,132,139)] ">
                  <div className="flex">
                    <SlSpeech className="mt-0.5 mr-1" />
                    {post?.comments_count}
                  </div>

                  {new Date(post?.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">좋아요한 게시글</div>
        <div className="h-[24rem] bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md p-4 overflow-y-auto  ">
          {userBlog?.like_articles.map((post) => (
            <div
              key={post?.id}
              onClick={()=> toPost(post.id)}
              className="basis-72 rounded-xl bg-[rgb(45,51,59)] mx-1 mt-1 mb-4 border border-[rgb(131,132,139)] drop-shadow-md  transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <div className="pt-3 px-3">
                <div className="relative">
                  <div className="text-sm">{post?.title}</div>

                  <div className="absolute top-0 right-0 text-sm flex ">
                    <FaHeart
                      className={
                        post?.liked
                          ? "mt-1 text-xs text-red-600"
                          : "mt-1 text-xs text-white"
                      }
                    />
                    <div className="ml-1 mt-0.5 text-xs">
                      {post?.like_users_count}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-[rgb(191,192,194)] mb-2 text-ellipsis line-clamp-2 ">
                <div className="border-t h-12 border-[rgb(131,132,139)] bg-[rgb(45,51,59)] text-sm  mt-2">
                  <div className="my-2 px-3">{post?.overview}</div>
                </div>
              </div>
              <div className="px-3 pb-2">
                {/* 태그 3개만 렌더링 */}
                {post?.tags
                  .filter((item, index) => index <= 2)
                  .map((item) => (
                    <div
                      key={item?.id}
                      className="inline-block text-[0.5rem] py-1 px-3 mr-2 my-1 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-full"
                    >
                      # {item?.tag}
                    </div>
                  ))}
              </div>
              <div className="flex justify-end text-xs text-[rgb(191,192,194)] border-t p-3 border-[rgb(131,132,139)] ">
                <SlSpeech className="ml-2 mt-0.5 mr-1" />
                <div>{post?.comments_count}</div>
                <div className="ml-2">⦁</div>
                <div className="ml-2">{post?.nickname}</div>
                <div className="ml-2">⦁</div>
                <div className="ml-2">
                  {new Date(post?.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="m-3">작성한 댓글, 댓글 생성해서 렌더링해야함</div>
        <div className="h-80 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md p-4 overflow-y-auto  ">
          {userBlog?.post_articles.map((post) => (
            <div
              key={post.id}
              className="h-70 basis-72 rounded-xl bg-[rgb(45,51,59)] mx-1 mt-1 mb-4 border border-[rgb(131,132,139)] drop-shadow-md  transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <div className="flex justify-between h-10 p-3  border-[rgb(131,132,139)]">
                <div className="flex">
                  <div className="text-xs font-normal text-ellipsis line-clamp-1">
                    이름
                  </div>
                  <div className="ml-2 text-xs font-normal">⦁</div>
                  <div className="ml-2 text-xs font-normal">
                    {new Date(post?.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm flex font-normal ">
                  {/* <BsPencilSquare /> */}
                  <FaHeart
                    className={
                      post?.liked
                        ? "mt-1 text-xs text-red-600"
                        : "mt-1 text-xs text-white"
                    }
                  />
                  <div className="ml-1 mt-0.5 mr-1.5 text-xs">
                    {post?.like_users_count}
                  </div>
                </div>
              </div>
              <div className="text-sm h-10 text-[rgb(191,192,194)] px-3 pb-2 text-ellipsis line-clamp-2  border-[rgb(131,132,139)]">
                {post?.overview}
              </div>
              <div className="h-2"></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="m-3">좋아요한 댓글, 댓글 생성해서 렌더링해야함</div>
        <div className="h-80 bg-[rgb(48,54,61)] border rounded-l-lg drop-shadow-md p-4 overflow-y-auto  ">
          {userBlog?.post_articles.map((post) => (
            <div
              key={post.id}
              className="h-70 basis-72 rounded-xl bg-[rgb(45,51,59)] mx-1 mt-1 mb-4 border border-[rgb(131,132,139)] drop-shadow-md  transition hover:-translate-y-2 hover:border-green-400 hover:shadow-sm hover:shadow-green-200/50"
            >
              <div className="flex justify-between h-10 p-3  border-[rgb(131,132,139)]">
                <div className="flex">
                  <div className="text-xs font-normal text-ellipsis line-clamp-1">
                    이름
                  </div>
                  <div className="ml-2 text-xs font-normal">⦁</div>
                  <div className="ml-2 text-xs font-normal">
                    {new Date(post?.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm flex font-normal ">
                  {/* <BsPencilSquare /> */}
                  <FaHeart
                    className={
                      post?.liked
                        ? "mt-1 text-xs text-red-600"
                        : "mt-1 text-xs text-white"
                    }
                  />
                  <div className="ml-1 mt-0.5 mr-1.5 text-xs">
                    {post?.like_users_count}
                  </div>
                </div>
              </div>
              <div className="text-sm h-10 text-[rgb(191,192,194)] px-3 pb-2 text-ellipsis line-clamp-2  border-[rgb(131,132,139)]">
                {post?.overview}
              </div>
              <div className="h-2"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogTab;
