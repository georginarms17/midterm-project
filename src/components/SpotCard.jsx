import React from "react";
import { Link } from "react-router-dom";

const SpotCard = ({ space }) => {
  const getAsset = (path) => path?.replace("/public", "");

  return (
    <div className="relative bg-[#FFDBDB] rounded-xl rounded overflow-hidden shadow-lg">
      <img
        src={getAsset(space.main_image)}
        alt={space.name}
        className="w-full h-65 object-cover"
      />
      <div className="p-4 pb-10">
        <h3 className="text-[#004A3F] font-bold text-[25px] mb-3">
          {space.name}
        </h3>
        <p className="mb-6 text-[18px] text-gray-600">{space.location}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[#004A3F] text-[25px] font-bold absolute bottom-4 left-4 ">₱{space.price}</span>
          <Link
            to={`/space/${space.id}`}
            className="absolute bottom-4 right-4 inline-block bg-[#004A3F] text-white font-bold px-4 py-2 rounded-lg shadow hover:bg-[#006655] transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
