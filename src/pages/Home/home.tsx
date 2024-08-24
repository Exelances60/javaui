import HomeSection from "@/components/custom/home-section";
import { useHomePostQueries } from "@/hooks/usePostQueries";
import { LoadingSpinner } from "@/components/loading";

const Home = () => {
  const { postData, isLoading } = useHomePostQueries();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={50} />
      </div>
    );
  return (
    <div className="py-2 flex flex-col gap-2">
      <HomeSection title="Antreman Programları" items={postData?.postProgram} />
      <HomeSection title="Yemek Tarifleri" reverse items={postData?.postFood} />
      <HomeSection title="Makaleler" items={postData?.postScience} />
      <HomeSection
        title="Öneriler"
        reverse
        items={postData?.postSuggestions}
        style="mb-5"
      />
    </div>
  );
};

export default Home;
