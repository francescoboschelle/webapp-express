import connection from "../db/connection.js";

// GET /
function index(req, res) {
  const sql = "SELECT * FROM movies;";

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });

    if (results.length === 0)
      return res.status(404).json({
        error: true,
        message: "Not found",
      });

    return res.json(results);
  });
}

// GET /:d
function show(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res.status(400).json({
      error: true,
      message: "Bad request",
    });

  const sql =
    "SELECT m.*, r.id AS review_id, r.name, r.vote, r.text FROM movies AS m LEFT JOIN reviews AS r ON m.id = r.movie_id WHERE m.id = ?;";

  connection.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({
        error: true,
        message: err.message,
      });

    if (result.length === 0)
      return res.status(404).json({
        error: true,
        message: "Not found",
      });

    const formattedResult = {
      id: result[0].id,
      title: result[0].title,
      director: result[0].director,
      genre: result[0].genre,
      release_year: result[0].release_year,
      image: result[0].image,
      created_at: result[0].created_at,
      updated_at: result[0].updated_at,
      reviews: [],
    };

    result.forEach((movieObj) => {
      if (
        movieObj.review_id &&
        !formattedResult.reviews.includes(movieObj.review_id)
      ) {
        formattedResult.reviews.push({
          review_id: movieObj.review_id,
          name: movieObj.name,
          vote: movieObj.vote,
          text: movieObj.text,
        });
      }
    });

    return res.json(formattedResult);
  });
}

export default {
  index,
  show,
};
