import React from "react";
import { useParams, Link } from "react-router-dom";
import spaces from "../data/spaces.json";
import BookingForm from "../components/BookingForm";

const SpotDetailPage = () => {
  const { spaceId } = useParams();
  const space = spaces.find((s) => String(s.id) === String(spaceId));

  if (!space)
    return (
      <div>
        Space not found. <Link to="/">Back to home</Link>
      </div>
    );

  const getAsset = (path) => path?.replace("/public", "");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-6">
        <img
          src={getAsset(space.main_image)}
          alt={space.name}
          className="w-1/2 h-80 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{space.name}</h2>
          <p className="text-gray-600">{space.location}</p>
          <p className="mt-4">{space.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Amenities</h4>
            <ul className="list-disc pl-5">
              {space.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <strong>Hours:</strong> {space.hours}
          </div>
          <div className="mt-4">
            <strong>Price:</strong> ₱{space.price}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <BookingForm space={space} />
      </div>
    </div>
  );
};

export default SpotDetailPage;
