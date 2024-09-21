// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedPositionTable = () => {
  const { allAppliedPositions } = useSelector((store) => store.position);
  return (
    <div className="text-[#141850]">
      <Table>
        <TableCaption>A list of your applied positions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedPositions.length <= 0 ? (
            <span>You haven&apos;t applied to any position yet.</span>
          ) : (
            allAppliedPositions.map((appliedPosition) => (
              <TableRow key={appliedPosition._id}>
                <TableCell>
                  {appliedPosition?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>{appliedPosition.position?.title}</TableCell>
                <TableCell>{appliedPosition.position?.club?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedPosition?.status === "rejected"
                        ? "bg-red-400"
                        : appliedPosition.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedPosition.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedPositionTable;
