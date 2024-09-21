/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { CLUB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetClubById from "@/hooks/useGetClubById";

const ClubSetup = () => {
  const params = useParams();
  useGetClubById(params.id);
  const [input, setInput] = useState({
    name: "",
    email: "",
    description: "",
    website: "",
    file: null,
  });

  const { singleClub } = useSelector((store) => store.club);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("description", input.description);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${CLUB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/clubs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleClub.name || "",
      email: singleClub.email || "",
      description: singleClub.description || "",
      website: singleClub.website || "",
      file: singleClub.file || null,
    });
  }, [singleClub]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 text-[#141850]">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 py-2">
            <Button
              onClick={() => navigate("/admin/clubs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Club Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label>Club Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Club Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>
            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            {/* Website */}
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            {/* Logo */}
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 hover:bg-[#ed7966]">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClubSetup;
