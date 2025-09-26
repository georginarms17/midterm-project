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
      <div className="flex flex-col items-center">
        <img
          src={getAsset(space.main_image)}
          alt={space.name}
          className="w-full h-150 object-cover rounded-xl mb-6"
        />

        {space.images && space.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-4 mb-6">
            {space.images.map((img, idx) => (
              <img
                key={idx}
                src={getAsset(img)}
                alt={`${space.name} ${idx + 1}`}
                className="w-full h-50 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#FFDBDB] mt-2 p-10 rounded-4xl">
        <h2 className="bg-[#F2CD76] text-[60px] text-[#004A3F] text-center rounded-full mb-4 px-10">{space.name}</h2>
        <p className="text-[25px] text-gray-600 text-center px-6">{space.location}</p>
        <p className="text-[20px] text-[#004A3F] mt-4 mb-8">{space.description}</p>

        <div className="mt-6 flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="flex-1">
            <h4 className="bg-[#F2CD76] text-[30px] text-[#004A3F] inline-block rounded-full px-[30px] mb-2">
              Amenities
            </h4>
            <ul className="text-[20px] text-[#004A3F] list-disc pl-5">
              {space.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="bg-[#F2CD76] text-[30px] text-[#004A3F] inline-block rounded-full px-[30px]">
              Open Hours
            </h4>
            <p className="text-[30px] text-[#004A3F]">{space.hours}</p>

            <h4 className="bg-[#F2CD76] text-[30px] text-[#004A3F] inline-block rounded-full px-[30px] mt-8">Price</h4>
            <p className="text-[30px] text-[#004A3F]">₱{space.price}</p>
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
