import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiseLoader } from "react-spinners";

import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import useFetch from "@/hooks/Use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("CreateNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnsignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnsignup();
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>Create a new account if you do not have one</CardDescription>
        {errors.apiError && <Error message={errors.apiError} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter UserName"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-purple-300 hover:bg-purple-500 font-medium"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <RiseLoader size={10} color="white" /> : "SignUp"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
