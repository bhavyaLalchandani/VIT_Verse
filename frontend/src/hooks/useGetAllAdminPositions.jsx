import { setAllAdminPositions } from "@/redux/positionSlice";
import { POSITION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminPositions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminPositions = async () => {
      try {
        const res = await axios.get(
          `${POSITION_API_END_POINT}/getadminpositions`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllAdminPositions(res.data.positions));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminPositions();
  }, []);
};

export default useGetAllAdminPositions;
