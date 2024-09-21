import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminPositionsTable from "./AdminPositionsTable";
import useGetAllAdminPositions from "@/hooks/useGetAllAdminPositions";
import { setSearchPositionByText } from "@/redux/positionSlice";

const AdminPositions = () => {
  useGetAllAdminPositions();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchPositionByText(input));
  }, [input]);
  return (
    <div className="text-[#141850]">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-[#141850] hover:bg-[#ed7966]"
            onClick={() => navigate("/admin/positions/create")}
          >
            New Openings
          </Button>
        </div>
        <AdminPositionsTable />
      </div>
    </div>
  );
};

export default AdminPositions;
