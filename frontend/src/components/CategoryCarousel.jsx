/* eslint-disable react/jsx-key */
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/positionSlice";

const category = [
  "Content Writing",
  "Web Development",
  "Social Media",
  "Event Management",
  "UI/UX Design",
  "Finance Management",
  "Public Relations",
  "Photography",
  "Ideation",
  "Video Editing",
  "Graphic Design",
  "Content Writing",
  "Web Development",
  "Social Media",
  "Event Management",
  "UI/UX Design",
  "Finance Management",
  "Public Relations",
  "Photography",
  "Ideation",
  "Video Editing",
  "Graphic Design",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchPositionHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <Button
                onClick={() => searchPositionHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
