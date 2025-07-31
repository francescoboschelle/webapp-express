import e from "express";
import moviesController from "../controllers/movies-controller.js";

const router = e.Router();

router.get("/", await moviesController.index);

router.get("/:id", await moviesController.show);

export default router;
