import React from "react";
import { Box } from "@mui/material";
import Card from "./card";

const CardList = () => {
  const cards = [
    {
      image: "/assets/images/StudentVisa(1).png",
      title: "Card Title 1",
      description: "This is the description of the first card.",
    },
    {
      image: "/assets/images/StudentVisa.png",
      title: "Card Title 2",
      description: "This is the description of the second card.",
    },
    {
      image: "/assets/images/Category-Study-(Hero-Banner).png",
      title: "Card Title 3",
      description: "This is the description of the third card.",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      ))}
    </Box>
  );
};

export default CardList;
