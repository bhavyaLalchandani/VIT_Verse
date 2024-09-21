import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/positionSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-[#fae5df] text-[#141850] font-medium">
          VIT's Solution to your Extra Curricular Needs{" "}
        </span>
        <h1 className="text-5xl font-bold text-[#141850]">
          Search, Apply & Join Your <br />
          <span className="text-[#ed7966]">Favourite Club or Society Now!</span>
        </h1>
        <p className="text-[#303179]">
          {" "}
          Unlock endless opportunities with VIT Verse! Discover the perfect
          club, chapter, or team, streamline your applications, and dive into
          your passions—all in one place!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find the role that's made for you"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#303179]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
