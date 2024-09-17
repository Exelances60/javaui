import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Briefcase,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useGetUserInfo } from "@/hooks/useUserInfo";
import { LoadingSpinner } from "./loading";
import BlogUserProfileHeader from "./custom/Users/blog-user-profile-header";
import BlogUserProfileTabs from "./custom/Users/blog-user-profile-tabs";

export default function BlogUserProfile() {
  const { id } = useParams();
  const { userInfo, error, isError, isLoading } = useGetUserInfo(
    id ? +id : undefined
  );

  if (!id) {
    return <div className="text-center">Kullanıcı ID'si bulunamadı.</div>;
  }

  if (isError) {
    return <div className="text-center">{error?.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen justify-center items-center flex">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
        <BlogUserProfileHeader userInfo={userInfo} />
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground italic">
              {userInfo?.summary}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">{userInfo?.postCount}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">
                  {userInfo?.followerCount}
                </div>
                <div className="text-sm text-muted-foreground">Takipçi</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 transition-transform hover:scale-105">
                <div className="text-2xl font-bold">
                  {userInfo?.followingCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Takip Edilen
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="capitalize">
                  {userInfo?.address || "Mevcut değil"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined{" "}
                  {new Date(userInfo?.createdAt || "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{userInfo?.job}</span>
              </div>
            </div>
            <Separator />
            <BlogUserProfileTabs userInfo={userInfo} />
            <Separator />
            <div>
              <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
              <div className="flex justify-center space-x-4">
                {userInfo?.socialMedia.map((social, index) => {
                  return (
                    <Link
                      key={index}
                      to={social.accountLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      {social.platform === "Facebook" && (
                        <Facebook className="w-6 h-6" />
                      )}
                      {social.platform === "Twitter" && (
                        <Twitter className="w-6 h-6" />
                      )}
                      {social.platform === "Instagram" && (
                        <Instagram className="w-6 h-6" />
                      )}
                      {social.platform === "Linkedin" && (
                        <Linkedin className="w-6 h-6" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
