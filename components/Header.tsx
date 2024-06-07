"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import search from "@/assets/images/search.svg";
import bell from "@/assets/images/bell.svg";
import logout from "@/assets/images/logout.svg";
import axiosInstance from "@/utils/axiosInstance";

interface IconProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ src, alt, onClick }) => (
  <div
    className="bg-[#5B94FE] py-1.5 px-2 rounded flex justify-center cursor-pointer"
    onClick={onClick}
  >
    <Image src={src} alt={alt} width={14} height={14} />
  </div>
);

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/user/logout");
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <main className="w-full h-[50px] bg-primary fixed px-6 md:px-10 lg:px-16 text-white z-40">
      <div className="flex justify-between items-center content-center py-2">
        <div className="flex space-x-4">
          <p className="text-lg font-semibold">PLACEHOLDER</p>
        </div>
        <div className="flex space-x-2">
          <Icon src={search} alt="Search" />
          <Icon src={bell} alt="Notifications" />
          <Icon src={logout} alt="Logout" onClick={handleLogout} />

          <div className="w-8 h-8 bg-white rounded-full flex justify-center text-black items-center">
            A
          </div>
        </div>
      </div>
    </main>
  );
}
