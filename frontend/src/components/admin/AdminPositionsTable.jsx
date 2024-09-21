/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPositionsTable = () => {
  const { allAdminPositions, searchPositionByText } = useSelector(
    (store) => store.position
  );

  const [filterPositions, setFilterPositions] = useState(allAdminPositions);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("called");
    const filteredPositions = allAdminPositions.filter((position) => {
      if (!searchPositionByText) {
        return true;
      }
      return (
        position?.title
          ?.toLowerCase()
          .includes(searchPositionByText.toLowerCase()) ||
        position?.club?.name
          .toLowerCase()
          .includes(searchPositionByText.toLowerCase())
      );
    });
    setFilterPositions(filteredPositions);
  }, [allAdminPositions, searchPositionByText]);
  return (
    <div className="text-[#141850]">
      <Table>
        <TableCaption>A list of openings you recently posted</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Club Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterPositions?.map((position) => (
            <tr>
              <TableCell>{position?.club?.name}</TableCell>
              <TableCell>{position?.title}</TableCell>
              <TableCell>{position?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 text-[#141850]">
                    <div
                      onClick={() => navigate(`/admin/clubs/${position._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/positions/${position._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPositionsTable;
