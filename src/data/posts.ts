import { Profile } from "./profiles";

type Post = {
  profile: Profile;
  text: string;
  time: string;
};

export const getPostWithProfile = async (postId: number) => {
  return {
    profile: { name: "Adem", image: "https://placehold.co/600x400/EEE/31343C" },
    text: "Hello, World!",
    time: "1 hour ago",
  } as Post;
};
