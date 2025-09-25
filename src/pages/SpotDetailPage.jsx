import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json";
import BookingForm from "../components/BookingForm";

export default function SpotDetailPage() {
  const { spaceId } = useParams();
  const navigate = useNavigate();

  const space = spacesData.find((s) => String(s.id) === String(spaceId));
  if (!space)
    return (
      <div>
        Space not found —{" "}
        <button onClick={() => navigate(-1)} className="underline">
          Go back
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded shadow overflow-hidden">
        <img
          src={space.main_image}
          alt={space.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold">{space.name}</h2>
          <p className="text-slate-600 mt-1">
            {space.location} • ₱{space.price}/hr
          </p>
          <p className="mt-4 text-slate-700">{space.description}</p>

          <div className="mt-4">
            <h4 className="font-semibold">Amenities</h4>
            <ul className="flex gap-3 mt-2 flex-wrap">
              {space.amenities.map((a) => (
                <li
                  key={a}
                  className="text-sm px-2 py-1 bg-slate-100 rounded"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {space.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${space.name}-${idx}`}
                className="w-full h-28 object-cover rounded"
              />
            ))}
          </div>

          <BookingForm space={space} />
        </div>
      </div>
    </div>
  );
}
