import { LoadingSpinner } from "@/components/loading";
import { usePostById } from "@/hooks/usePostQueries";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Badge } from "@/components/ui/badge";

const PostPage = () => {
  const { id } = useParams();
  const { postData, isLoading, error, isError } = usePostById(
    id ? parseInt(id) : 0
  );
  if (!id) {
    return <div>Post not found</div>;
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
    <div className="container mx-auto">
      <div className="text-3xl font-bold my-4">{postData?.title}</div>
      <div className="w-full flex justify-end items-center">
        <p>Yazar : </p>
        <div className="p-2">
          <Badge>{postData?.author?.fullName}</Badge>
        </div>
        <img
          src={postData?.author?.image}
          alt="avatar"
          className="w-10 h-10 object-cover rounded-full shadow-md"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
    </div>
  );
};

export default PostPage;
