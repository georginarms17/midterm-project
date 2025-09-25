import React from "react";
import { Link } from "react-router-dom";

export default function SpotCard({ space }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img
        src={space.main_image}
        alt={space.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{space.name}</h3>
        <p className="text-sm text-slate-600">
          {space.location} • ₱{space.price}
        </p>
        <p className="mt-2 text-sm text-slate-700">
          {space.description.substring(0, 120)}...
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/space/${space.id}`}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            View
          </Link>
          <span className="text-sm text-slate-500">Hours: {space.hours}</span>
        </div>
      </div>
    </div>
  );
}
