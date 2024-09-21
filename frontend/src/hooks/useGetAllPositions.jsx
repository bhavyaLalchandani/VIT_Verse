import { setAllPositions } from "@/redux/positionSlice";
import { POSITION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllPositions = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.position);
  useEffect(() => {
    const fetchAllPositions = async () => {
      try {
        const res = await axios.get(
          `${POSITION_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllPositions(res.data.positions));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPositions();
  }, []);
};

export default useGetAllPositions;
