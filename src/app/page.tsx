"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function ClientsHomePage() {
  const router = useRouter();

  const cards = [
    { title: "Add Client", path: "/clients/add" },
    { title: "List Clients", path: "/clients/list" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "75vh",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.title}
            sx={{
              width: 240,
              textAlign: "center",
              borderRadius: 3,
              boxShadow: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea onClick={() => router.push(card.path)}>
              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  {card.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
