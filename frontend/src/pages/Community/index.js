import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Avatar, Typography, IconButton, Paper } from "@mui/material";
import { Favorite, ChatBubble, PersonAdd } from "@mui/icons-material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function Community() {
  const comments = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://via.placeholder.com/50",
      comment: "This artwork is amazing! 🎨",
    },
    {
      id: 2,
      user: "Sarah Smith",
      avatar: "https://via.placeholder.com/50",
      comment: "Great creativity, love the colors!",
    },
  ];

  const followedArtists = [
    {
      id: 1,
      name: "Emily Art",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Michael Sketch",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  const interactions = [
    {
      id: 1,
      user: "Alex Brown",
      action: "liked an artwork",
      icon: <Favorite color="error" />,
    },
    {
      id: 2,
      user: "Linda Green",
      action: "commented on a post",
      icon: <ChatBubble color="primary" />,
    },
  ];

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          {/* User Comments Section */}
          <Col md={6}>
            <Typography variant="h6" gutterBottom>
              User Comments
            </Typography>
            {comments.map((comment) => (
              <Paper key={comment.id} className="p-3 mb-4">
                <Row className="align-items-center">
                  <Col xs={2}>
                    <Avatar src={comment.avatar} alt={comment.user} />
                  </Col>
                  <Col>
                    <Typography variant="subtitle1">{comment.user}</Typography>
                    <Typography variant="body2">{comment.comment}</Typography>
                  </Col>
                </Row>
              </Paper>
            ))}
          </Col>

          {/* Followed Artists Section */}
          <Col md={3}>
            <Typography variant="h6" gutterBottom>
              Followed Artists
            </Typography>
            {followedArtists.map((artist) => (
              <Card
                key={artist.id}
                className="mb-2 p-2 d-flex align-items-center"
              >
                <Avatar
                  src={artist.avatar}
                  alt={artist.name}
                  className="me-2"
                />
                <Typography variant="body1">{artist.name}</Typography>
                <IconButton className="ms-auto">
                  <PersonAdd color="primary" />
                </IconButton>
              </Card>
            ))}
          </Col>

          {/* Recent Interactions Section */}
          <Col md={3}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {interactions.map((interaction) => (
              <Paper
                key={interaction.id}
                className="p-2 mb-2 d-flex align-items-center"
              >
                {interaction.icon}
                <Typography variant="body2" className="ms-2">
                  {interaction.user} {interaction.action}
                </Typography>
              </Paper>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}
