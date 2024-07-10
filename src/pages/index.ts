import { col, form, row, submit, text, textarea } from "../components/common";
import { getComments, type Comment } from "../data/comments";
import { getPostWithProfile } from "../data/posts";
import { Profile } from "../data/profiles";
import { layout } from "../layouts/main";

const displayName = (name: string) => `<div>${name}</div>`;
const pfp = (src: string) => `<img src="${src}" />`;
const datetime = (time: string) => `<div>${time}</div>`;

const avatar = (profile: Profile) => {
  return row(pfp(profile.image), displayName(profile.name));
};

const comment = (comment: Comment) => {
  return col(
    row(avatar(comment.profile), datetime(comment.time)),
    text(comment.text)
  );
};

const comments = async (postId: number) => {
  const allComments = await getComments(postId);
  return allComments.map(comment).join("");
};

const write = () => {
  return form(textarea("comment"), submit());
};

const article = async (postId: number) => {
  const post = await getPostWithProfile(postId);
  return text(post.text);
};

const author = () => {
  return text("Author");
};

const content = async (postId: number) => {
  const [articleHtml, commentsHtml] = await Promise.all([
    article(postId),
    comments(postId),
  ]);
  return row(col(articleHtml, commentsHtml, write()), col(author()));
};

export const indexPage = async ({ postId }: { postId: string }) => {
  return layout(await content(parseInt(postId)));
};
