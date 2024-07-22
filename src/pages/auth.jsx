import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { UrlState } from "@/Context";
import { useEffect } from "react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("creatNew");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashbord?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticated,loading]);
  return (
    <div className="mt-35 flex flex-col items-center gap-10 mt-28">
      <h1 className="text-5xl font-bold italic">
        {longLink ? "Please Login First...." : "Login/SignUp"}
      </h1>
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-purple-300">
          <TabsTrigger value="Login" className="text-white">
            Login
          </TabsTrigger>
          <TabsTrigger value="SignUp" className="text-white">
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="SignUp">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
