import React, { useState } from "react";
import Image from "next/image";
import link from "@/assets/images/link2.svg";
import copy from "@/assets/images/copy.svg";

interface ViewModalProps {
  data: {
    name: string;
    description: string;
    generatedUrl: string;
  };
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(data.generatedUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 lg:w-1/3 flex flex-col space-y-5">
        <Image src={link} alt={"link"} width={40} height={40} />
        <h2 className="font-semibold text-header text-lg">View full URL</h2>
        <div>
          <p className="text-bodytext font-medium text-sm">share link</p>
          <div className="flex space-x-3 items-center">
            <input
              type="text"
              value={data.generatedUrl}
              className="border rounded-lg p-3 mt-2 outline-none bg-white text-sm placeholder-bodytext w-full text-header focus:border-primary"
            />
            <Image
              src={copy}
              alt={"copy"}
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={handleCopyClick}
            />
            {copied && <span className="text-sm text-primary">Copied!</span>}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
