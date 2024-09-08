import HomeSection from "@/components/custom/home-section";
import { useHomePostQueries } from "@/hooks/usePostQueries";
import { LoadingSpinner } from "@/components/loading";

const Home = () => {
  const { postData, isLoading } = useHomePostQueries();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  const sections = [
    { title: "Antreman Programları", items: postData?.postProgram },
    { title: "Yemek Tarifleri", items: postData?.postFood, reverse: true },
    { title: "Makaleler", items: postData?.postScience },
    {
      title: "Öneriler",
      items: postData?.postSuggestions,
      reverse: true,
      style: "mb-5",
    },
  ];

  return (
    <div className="py-2 flex flex-col gap-2">
      {sections.map((section, index) => (
        <HomeSection key={index} {...section} />
      ))}
    </div>
  );
};

export default Home;
