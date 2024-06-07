"use client";
import React, { useState, useEffect, FormEvent } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Table from "@/components/global/Table";
import Input from "@/components/global/Input";
import Button from "@/components/global/Button";
import ViewModal from "@/components/ViewModal";
import Pagination from "@/components/global/Pagination";
import { redirect } from "next/navigation";

const headers = ["Name", "Description", "Shortened URL"];

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/login");
    }
  });

  const handleRowClick = (row: any, index: number) => {
    console.log("Row clicked:", row, index);
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const handleInputChange = (name: string, value: string | number) => {
    if (name === "name") setName(value as string);
    if (name === "website") setWebsite(value as string);
    if (name === "description") setDescription(value as string);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!website) newErrors.website = "Website is required.";
    if (!description) newErrors.description = "Description is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axiosInstance.post("/api/links/shortener", {
        name,
        website,
        description,
      });
      console.log("API Response:", response.data);
      console.log("URL shortened successfully:", response.data);
      setName("");
      setWebsite("");
      setDescription("");
      getUrls(currentPage);
      handleRowClick(response.data.data, 0);
    } catch (error) {
      console.error("Error creating URL:", error);
    }
  };

  const getUrls = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/links?page=${page}&limit=10`
      );
      const formattedData = response.data.data.map((item: any) => ({
        name: item.name,
        description: item.description,
        generatedUrl: item.generatedUrl,
      }));
      setData(formattedData);
      const meta = response.data.meta;
      setTotalPages(meta.lastPage);
      setCurrentPage(meta.currentPage);
      console.log(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUrls(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="md:w-[50%] lg:w-[35%]">
        <h1 className="text-header font-3xl font-medium">Shorten URL</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-6">
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="Input name"
            modelValue={name}
            error={!!errors.name}
            customError={errors.name}
            onUpdateModelValue={handleInputChange}
          />
          <Input
            type="text"
            name="website"
            label="Website"
            placeholder="www.placeholder.com"
            modelValue={website}
            error={!!errors.website}
            customError={errors.website}
            onUpdateModelValue={handleInputChange}
          />
          <Input
            type="text"
            name="description"
            label="Description"
            placeholder="Input description"
            modelValue={description}
            error={!!errors.description}
            customError={errors.description}
            onUpdateModelValue={handleInputChange}
          />
          <Button>
            Shorten URL{" "}
            {loading && <span className="text-sm text-white">.....</span>}
          </Button>
        </form>
      </div>
      <div className="mt-20">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <Table
              data={data}
              headers={headers}
              showDetails={true}
              onRowClick={handleRowClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      {isModalOpen && (
        <ViewModal data={selectedRowData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
