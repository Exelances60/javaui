import { LoadingSpinner } from "@/components/loading";
import { usePostById } from "@/hooks/usePostQueries";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./post.css";
import PostAuthor from "@/components/custom/Post/post-author";

const PostPage = () => {
  const { id } = useParams();
  const { postData, isLoading, error, isError } = usePostById(
    id ? parseInt(id) : 0
  );
  if (!id) {
    return <div>Post bulunamadı</div>;
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 flex mt-5 text-lg justify-center">
        {error?.message}
      </div>
    );
  }
  const cleanHtml = DOMPurify.sanitize(postData?.content || "", {
    ALLOWED_TAGS: [
      "iframe",
      "p",
      "img",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "br",
      "strong",
      "b",
      "i",
      "u",
      "em",
      "span",
      "a",
    ],
    ALLOWED_ATTR: [
      "src",
      "allowfullscreen",
      "class",
      "width",
      "height",
      "style",
      "draggable",
      "data-*",
      "frameborder",
      "title",
    ],
    ALLOWED_URI_REGEXP: /^(?:https?:\/\/|data:image\/)/,
    FORBID_TAGS: ["script", "embed", "object", "link"],
    FORBID_ATTR: ["onerror", "onclick", "onload", "onmouseover"],
  });
  return (
    <div className="mx-auto border-2 my-2 container p-4 rounded-lg ">
      <div className="text-3xl font-bold my-4">{postData?.title}</div>
      <PostAuthor postData={postData} />
      <div
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
        className="content"
      ></div>
    </div>
  );
};

export default PostPage;
