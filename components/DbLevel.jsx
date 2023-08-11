import React from "react";

const DbLevel = ({ title, icon, db }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs">{db}</p>
      </div>
    </div>
  );
};

export default DbLevel;
