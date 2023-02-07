const SubReply = ({reply}) => {
  return (
    <div>댓글 내용: {reply.content}</div>
  )
}

export default SubReply;


/*
"id": 5,
"username": "어드민",
"like_users_count": 0,
"liked": false,
"profile_image": "/media/3.png",
"content": "adfasdfas dfasdf",
"created_at": "2023-02-03T12:48:39.518256+09:00",
"updated_at": "2023-02-03T12:48:39.518296+09:00",
"is_secret": false,
"article": 5,
"user": 2,
"parent_comment": 2,
"like_users": []
*/