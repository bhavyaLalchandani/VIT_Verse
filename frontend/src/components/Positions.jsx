import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Position from "./Position";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Positions = () => {
  const { allPositions, searchedQuery } = useSelector(
    (store) => store.position
  );
  const [filterPositions, setFilterPositions] = useState(allPositions);

  useEffect(() => {
    if (searchedQuery) {
      const filteredPositions = allPositions.filter((position) => {
        return (
          position.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          position.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase())
        );
      });
      setFilterPositions(filteredPositions);
    } else {
      setFilterPositions(allPositions);
    }
  }, [allPositions, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterPositions.length <= 0 ? (
            <span>No Openings Available, Search for a different role!</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterPositions.map((position) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={position?._id}
                  >
                    <Position position={position} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Positions;
