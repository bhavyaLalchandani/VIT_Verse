import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Position = ({ position }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(position?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(position?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={position?.club?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{position?.club?.name}</h1>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{position?.title}</h1>
        <p className="text-sm text-gray-600">{position?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-[#ed7966] font-bold"} variant="ghost">
          {position?.openings - position?.applications?.length} Positions
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${position?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#141850] hover:bg-[#ed7966]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Position;
