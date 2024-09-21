import { setClubs } from "@/redux/clubSlice";
import { CLUB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllClubs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(`${CLUB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("called");
        if (res.data.success) {
          dispatch(setClubs(res.data.clubs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClubs();
  }, []);
};

export default useGetAllClubs;
