import React from "react";
import { Box, Typography } from "@mui/material";

const Card = ({ image, title, description }) => {
  const defaultImage = "/assets/images/ftgesd.png"; // Set your default image path here

  return (
    <Box
      sx={{
        position: "relative",
        width: "440px",
        height: "549px",
        left: "24px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
        },
        "&:hover img": {
          transform: "scale(1.1)",
        },
        "&:hover .titleBar, &:hover .description": {
          transform: "translateY(0)",
        },
      }}
    >
      <Box
        className="imageContainer"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={image || defaultImage}
          alt={title}
          className="image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s",
          }}
        />
        <Box
          className="titleBar"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            background: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            padding: "10px",
            boxSizing: "border-box",
            transform: "translateY(-100%)",
            transition: "transform 0.3s",
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box
          className="description"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            padding: "20px",
            boxSizing: "border-box",
            transform: "translateY(100%)",
            transition: "transform 0.3s",
          }}
        >
          <Typography variant="body2">{description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
