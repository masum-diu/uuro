import { Box } from "@mui/material";
import React from "react";

const Banner = ({ image }) => {
  const defaultImage = "/assets/images/Banner-2.png"; // Set your default image path here

  return (
    <img
      src={image || defaultImage}
      alt="Banner"
      style={{
        width: "100%",
        height: "850px",
        objectFit: "cover",
        background: "none",
      }}
    />
  );
};

export default Banner;
