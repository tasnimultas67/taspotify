import React from "react";

const MusicCard = ({ track }) => {
  return (
    <div className="bg-slate-900 rounded-2xl hover:scale-105 transition-all">
      <img
        src={track.image}
        alt={track.name}
        className="w-full h-48 object-cover rounded-t-2xl mb-4"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{track.name}</h2>
        <p className="text-gray-100">{track.artist_name}</p>
        <audio controls className="w-full mt-4">
          <source src={track.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default MusicCard;
