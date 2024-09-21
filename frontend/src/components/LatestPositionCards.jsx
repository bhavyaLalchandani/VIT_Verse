import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestPositionCards = ({ position }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${position._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      {/* Club's Name */}
      <div>
        <h1 className="font-medium text-lg">{position?.club?.name}</h1>
      </div>
      {/* Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{position?.title}</h1>
        <p className="text-sm text-gray-600">{position?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {/* NO. of Openings/Vacancies */}
        <Badge className={"text-[#ed7966] font-bold"} variant="ghost">
          {position?.openings - position?.applications?.length} Openings
        </Badge>
      </div>
    </div>
  );
};

export default LatestPositionCards;
