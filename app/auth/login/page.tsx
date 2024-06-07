"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import Input from "@/components/global/Input";
import Button from "@/components/global/Button";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (name: string, value: string | number) => {
    if (name === "email") setEmail(value as string);
    if (name === "password") setPassword(value as string);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setApiError(null);

    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      console.log("Logged in successfully:", response.data);
      localStorage.setItem("token", response.data.token.token);
      router.push("/");
    } catch (error: any) {
      setApiError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col">
      <h1 className="text-center text-header text-3xl font-semibold">Log In</h1>
      <p className="text-center text-bodytext mt-2">
        Enter your credentials to access your account
      </p>
      {apiError && <p className="text-center text-red-500 mt-2">{apiError}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-6">
        <Input
          type="email"
          name="email"
          label="EMAIL"
          placeholder="Enter Email"
          modelValue={email}
          error={!!errors.email}
          customError={errors.email}
          onUpdateModelValue={handleInputChange}
        />
        <Input
          type="password"
          name="password"
          label="PASSWORD"
          placeholder="Enter Password"
          modelValue={password}
          error={!!errors.password}
          customError={errors.password}
          onUpdateModelValue={handleInputChange}
        />
        <Button>{loading ? "Logging in..." : "Log into Account"}</Button>
      </form>
      <p className="text-bodytext2 text-center mt-10 text-xs font-medium">
        Are you new here?
        <Link href="/auth/register">
          <span className="text-primary"> Create Account</span>
        </Link>
      </p>
    </main>
  );
}
