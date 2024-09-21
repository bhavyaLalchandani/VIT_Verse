import React from "react";
import LatestPositionCards from "./LatestPositionCards";
import { useSelector } from "react-redux";

const LatestPositions = () => {
  const { allPositions } = useSelector((store) => store.position);

  return (
    <div className="max-w-7xl mx-auto my-20 text-[#141850]">
      <h1 className="text-4xl font-bold">
        <span className="text-[#ed7966]">Latest & Top </span> Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5 ">
        {allPositions.length <= 0 ? (
          <span> No Openings Available</span>
        ) : (
          allPositions
            ?.slice(0, 6)
            .map((position) => (
              <LatestPositionCards key={position._id} position={position} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestPositions;
