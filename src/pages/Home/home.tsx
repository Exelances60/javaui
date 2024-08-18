import HomeSection from "@/components/custom/home-section";
import { usePostQueries } from "@/hooks/usePostQueries";
import { LoadingSpinner } from "@/components/loading";

const Home = () => {
  const { postData, isLoading } = usePostQueries();
  console.log(postData);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={50} />
      </div>
    );
  return (
    <div className="py-2 flex flex-col gap-3">
      <HomeSection title="Makaleler" items={postData || []} />
      {/*     <HomeSection title="Yemek Tarifleri" reverse />
      <HomeSection title="Makaleler" /> */}
    </div>
  );
};

export default Home;
