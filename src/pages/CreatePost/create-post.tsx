import { PostDock } from "@/components/post-dock";
import { useState, useEffect } from "react";

export interface PostContent {
  type: "text" | "image";
  content: string;
  setter: boolean;
  active: boolean;
}

const CreatePost = () => {
  const [postContent, setPostContent] = useState<PostContent[]>([]);

  const resizeTextArea = (textarea: HTMLTextAreaElement) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    postContent.forEach((content, index) => {
      if (content.type === "text" && content.setter) {
        const textarea = document.getElementById(
          `textarea-${index}`
        ) as HTMLTextAreaElement;
        if (textarea) {
          resizeTextArea(textarea);
        }
      }
    });
  }, [postContent]);

  return (
    <div className="container p-0 flex flex-col gap-2">
      {postContent.map((content, index) => (
        <div key={index}>
          {content.type === "text" ? (
            <textarea
              id={`textarea-${index}`}
              className={`text-black w-full flex items-center resize-none align-middle pt-5 overflow-hidden active:outline-none focus:outline-none ${
                content.active
                  ? "border-2 border-dashed border-gray-300 animate-pulse"
                  : "border-0 "
              }`}
              value={content.content}
              onChange={(e) => {
                const newPostContent = [...postContent];
                newPostContent[index].content = e.target.value;
                setPostContent(newPostContent);
              }}
              onFocus={() => {
                const newPostContent = [...postContent];
                newPostContent[index].active = true;
                setPostContent(newPostContent);
              }}
              onBlur={() => {
                const newPostContent = [...postContent];
                newPostContent[index].active = false;
                setPostContent(newPostContent);
              }}
            />
          ) : content.type === "image" ? (
            <div className="flex flex-col">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const newPostContent = [...postContent];
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (e.target) {
                      newPostContent[index].content = e.target.result as string;
                      setPostContent(newPostContent);
                    }
                  };
                  if (e.target.files) {
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              {content.content && (
                <img
                  src={content.content}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto border border-gray-300 rounded-lg mt-2"
                />
              )}
            </div>
          ) : null}
        </div>
      ))}
      <PostDock setPostContent={setPostContent} />
    </div>
  );
};

export default CreatePost;
