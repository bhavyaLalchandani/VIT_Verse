/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ClubsTable from "./ClubsTable";
import { useNavigate } from "react-router-dom";
import useGetAllClubs from "@/hooks/useGetAllClubs";
import { useDispatch } from "react-redux";
import { setSearchClubByText } from "@/redux/clubSlice";

const Clubs = () => {
  useGetAllClubs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchClubByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-[#141850] hover:bg-[#ed7966]"
            onClick={() => navigate("/admin/clubs/create")}
          >
            New Club
          </Button>
        </div>
        <ClubsTable />
      </div>
    </div>
  );
};

export default Clubs;
