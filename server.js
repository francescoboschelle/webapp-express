import e from "express";
import moviesRouter from "./routers/movies.js";
import { errorHandler, routeNotFound } from "./middlewares/middleware.js";

const app = e();
const PORT = 3030;

app.use(e.json());
app.use(e.static("images"));
app.use("/api/movies", moviesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

app.use(errorHandler);
app.use(routeNotFound);

app.listen(PORT, (err) => {
  console.log("Server listening on port", PORT);
  if (err) console.error(err);
});
