import React from "react";
import { Link } from "react-router-dom";

const SpotCard = ({ space }) => {
  // spaces.json in the original upload uses path with `/public/assets`. Vite serves `public/` at root,
  // so we strip `/public` if present so images resolve to `/assets/...`.
  const getAsset = (path) => path?.replace("/public", "");

  return (
    <div className="border rounded overflow-hidden shadow">
      <img
        src={getAsset(space.main_image)}
        alt={space.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{space.name}</h3>
        <p className="text-sm text-gray-600">{space.location}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">₱{space.price}</span>
          <Link to={`/space/${space.id}`} className="text-blue-600">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
