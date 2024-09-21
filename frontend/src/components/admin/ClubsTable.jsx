/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClubsTable = () => {
  const { clubs, searchClubByText } = useSelector((store) => store.club);
  const [filterClub, setFilterClub] = useState(clubs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredClub =
      clubs.length >= 0 &&
      clubs.filter((club) => {
        if (!searchClubByText) {
          return true;
        }
        return club?.name
          ?.toLowerCase()
          .includes(searchClubByText.toLowerCase());
      });
    setFilterClub(filteredClub);
  }, [clubs, searchClubByText]);
  return (
    <div className="text-[#141850]">
      <Table>
        <TableCaption>A List of Clubs You Recently Registered.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterClub?.map((club) => (
            <tr>
              <TableCell>
                <Avatar>
                  <AvatarImage src={club.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{club.name}</TableCell>
              <TableCell>{club.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 text-[#141850]">
                    <div
                      onClick={() => navigate(`/admin/clubs/${club._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default ClubsTable;
