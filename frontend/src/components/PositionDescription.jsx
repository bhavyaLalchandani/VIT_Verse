/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  POSITION_API_END_POINT,
} from "@/utils/constant";
import { setSinglePosition } from "@/redux/positionSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PositionDescription = () => {
  const { singlePosition } = useSelector((store) => store.position);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singlePosition?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const positionId = params.id;
  const dispatch = useDispatch();

  const applyPositionHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${positionId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSinglePosition = {
          ...singlePosition,
          applications: [
            ...singlePosition.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSinglePosition(updatedSinglePosition)); // this will update UI in real time
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSinglePosition = async () => {
      try {
        const res = await axios.get(
          `${POSITION_API_END_POINT}/get/${positionId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSinglePosition(res.data.position));
          setIsApplied(
            res.data.position.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePosition();
  }, [positionId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singlePosition?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-[#ed7966] font-bold"} variant="ghost">
              {singlePosition?.openings - singlePosition?.applications?.length}{" "}
              Openings
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyPositionHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-[#ed7966] cursor-not-allowed"
              : "bg-[#141850] hover:bg-[#ed7966]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Opening Details
      </h1>
      <div className="my-4">
        {/* Role */}
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal">{singlePosition?.title}</span>
        </h1>
        {/* Description */}
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal">
            {singlePosition?.description}
          </span>
        </h1>
        {/* No. of Applicants */}
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal">
            {singlePosition?.applications?.length}
          </span>
        </h1>
        {/* Date of Posting */}
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal">
            {singlePosition?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default PositionDescription;
