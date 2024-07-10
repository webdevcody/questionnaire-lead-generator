import { Profile } from "./profiles";

export type Comment = {
  profile: Profile;
  text: string;
  time: string;
};

export const getComments = async (postId: number) => {
  return [
    {
      profile: {
        name: "Adem",
        image: "https://placehold.co/600x400/EEE/31343C",
      },
      text: "Nice post!",
      time: "1 hour ago",
    },
  ] as Comment[];
};
