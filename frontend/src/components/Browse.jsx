import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Position from "./Position";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/positionSlice";
import useGetAllPositions from "@/hooks/useGetAllPositions";
const Browse = () => {
  useGetAllPositions();
  const { allPositions } = useSelector((store) => store.position);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allPositions.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allPositions.map((position) => {
            return <Position key={position._id} position={position} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
