import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold mb-4">Page not found</h2>
    <Link to="/" className="text-blue-600">
      Go back home
    </Link>
  </div>
);

export default NotFound;
