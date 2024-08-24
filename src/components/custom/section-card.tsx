import dummyfood from "@/assets/home/dumyımage.jpg";
import { Post } from "@/hooks/usePostQueries";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface SectionCardProps {
  data: Post;
}

const SectionCard = ({ data }: SectionCardProps) => {
  console.log(data);
  const navigate = useNavigate();
  const cleanHtml = DOMPurify.sanitize(data.content.slice(0, 200));
  return (
    <figure
      onClick={() => navigate(`/post/${data.id}`)}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border shadow",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={data.image}
          alt={data.title}
          className="object-cover w-full h-full"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black",
            // light theme overlay
            "bg-opacity-80",
            // dark theme overlay
            "dark:bg-opacity-80"
          )}
        />
      </div>
      <div className="relative z-10 p-4 text-white">
        <div className="flex flex-row items-center gap-2 mb-2">
          <img
            src={data.author?.image || dummyfood}
            alt={data.title}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold">{data.author?.fullName}</h4>
            <p className="text-sm text-white">{data.title}</p>
          </div>
        </div>
        <blockquote
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        ></blockquote>
      </div>
    </figure>
  );
};

export default SectionCard;
