import React, { useState, useMemo } from "react";
import Image from "next/image";
import link from "@/assets/images/link.svg";

interface TableComponentProps {
  data: Array<{ [key: string]: any }>;
  headers: Array<string>;
  showDetails: boolean;
  onRowClick: (row: { [key: string]: any }, index: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  headers,
  showDetails,
  onRowClick,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  const handleRowClick = (row: { [key: string]: any }, index: number) => {
    onRowClick(row, index);
  };

  return (
    <div>
      <div className="overflow-x-auto hide-scrollbar border border-[#EAECF0] rounded-t-lg">
        <table className="w-full border-collapse">
          <thead className="text-left bg-[#F9FAFB] text-[#757C86] font-medium text-sm">
            <tr className=" cursor-pointer border-b border-[#EAECF0]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`text-xs text-bodytext py-3 font-medium px-3 overflow-hidden whitespace-nowrap ${
                    index !== 0 ? "" : " pl-4 "
                  }`}
                >
                  {header}
                </th>
              ))}
              {showDetails && (
                <th className="text-sm text-bodytext2 pr-4 font-semibold"></th>
              )}
            </tr>
          </thead>
          <tbody className="text-[#39404F] text-sm bg-white ">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`cursor-pointer ${
                  rowIndex !== filteredData.length - 1
                    ? "border-b border-[#EAECF0]"
                    : ""
                }`}
                onClick={() => handleRowClick(row, rowIndex)}
              >
                {Object.values(row).map((item, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-3 text-bodytext text-sm overflow-hidden text-left py-3 ${
                      colIndex !== 0
                        ? ""
                        : " pl-4 text-header font-medium shadow-lg"
                    } ${colIndex !== 2 ? "" : " underline"}`}
                  >
                    <div className="flex py-1 rounded">
                      <span>{item}</span>
                    </div>
                  </td>
                ))}
                {showDetails && (
                  <td className="pr-4 relative">
                    <Image src={link} alt={"link"} width={14} height={14} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
