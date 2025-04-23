import React, { useState } from "react";
import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from "next/link";

const ImageCard = ({ image, title, description, buttonText, link }) => {
    const [hover, setHover] = useState(false);

    return (
        <Card
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Background Image */}
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{ width: "100%", objectFit: "cover" ,height:"100%",minHeight:700, }}
            />

            {/* Overlay Content (Hidden by Default, Visible on Hover) */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "white",
                    opacity: hover ? 1 : 0,
                    // bgcolor: hover ? "rgba(0, 0, 0, 0.6)" : "transparent", // Darkened overlay on hover
                    transition: "opacity 0.5s ease-in-out, background-color 0.5s ease-in-out", // Smooth transition for bg color
                    p: 3,
                }}
            >
                {/* Title */}
                <Typography
                   className="bold"
                   sx={{
                        position: "absolute",
                        left: 0,
                        top: 80,
                        fontSize: { xl: 35, lg: 25 },
                        bgcolor: "#676767", // Background color for the title
                        px: 4,
                        py: 1,
                        color: "#fff",
                       
                        mb: 1,
                        zIndex: 999,
                    }}
                    variant="h5"
                >
                    {title}
                </Typography>

                {/* Full Cover Description with Bottom to Top Transition */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0, // Initially positioned at the bottom
                        left: 0,
                        width: "100%",
                        height: "100%", // Cover the entire height of the card
                        transform: hover ? 'translateY(0)' : 'translateY(100%)', // Bottom to Top transition effect
                        opacity: hover ? 1 : 0, // Fade-in effect
                        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out', // Apply both transition effects
                        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(181, 181, 182, 0.8), rgba(16, 17, 19, 0.8))", // Background color for description
                        padding: "20px", // Add padding around the description text
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 1,
                        justifyContent: "center", // Align the text towards the bottom
                        color: "#fff", // Text color
                        textAlign: "center", // Center text
                    }}
                >
                    <Typography
                       className="Regular"
                        sx={{
                            opacity: hover ? 1 : 0, // Ensure text fades in along with the container
                            transition: "opacity 0.5s ease-out",
                            fontSize: { xl: 20, lg: 16 },
                            // fontWeight: "bold",
                            textAlign:'justify',
                            pt: { xl: 0, lg: 10 }

                        }}
                    >
                        {description}
                    </Typography>
                </Box>

                {/* Shopping Cart Icon */}
                <Link href={link}>
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                            fontSize: 35,
                            zIndex: 1,
                        }}
                    >
                        <img src="/assets/Button.png" alt="" width={44} />
                    </IconButton>
                </Link>
            </Box>
        </Card>
    );
};

export default ImageCard;
