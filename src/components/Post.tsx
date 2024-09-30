import { FC } from "react";

interface PostProps {}

const Post: FC<PostProps> = ({}) => {
  return (
    <div className="rounded-md bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        {/* TODO: PostVotes */}
      </div>
    </div>
  );
};

export default Post;
