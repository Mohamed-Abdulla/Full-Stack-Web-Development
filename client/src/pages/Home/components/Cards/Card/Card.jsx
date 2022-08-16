import { Typography, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CardItem = ({ img, title, desc }) => {
  return (
    <Link to={`/filter?mealtype=${title}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card sx={{ display: "flex", width: "360px", height: "160px", marginBottom: "30px" }}>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              height: "160px",
              width: "160px",
            }}
            image={img}
            alt="meals"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h1" color="#192F60">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
};

export default CardItem;
