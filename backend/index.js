const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");

const app = express();
var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET",
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

axios.defaults.baseURL = "https://student.samduuf.uz/rest/v1/data/";

dotenv.config();

// Fakuletlar olish uchun so'rov -----------------------------
app.get("/api/facultets", (req, res) => {
  const lang = req.query.lang;

  axios
    .get(`department-list?_structure_type=11&l=${lang}.`, {
      headers: {
        Authorization: process.env.Authorization,
        accept: "application/json",
      },
    })
    .then((response) => {
      res.status(200).send({
        data: response.data.data.items,
        error: false,
      });
    })
    .catch((err) =>
      res.status(400).send({
        error: true,
        data: err,
      })
    );
});

// Guruhlarni olish uchun so'rov -----------------------------
app.get("/api/groups", (req, res) => {
  const faculty = req.query.faculty;
  const lang = req.query.lang;
  const year = req.query.year;
  axios
    .get(`group-list?l=${lang}&_department=${faculty}&limit=200`, {
      headers: {
        Authorization: process.env.Authorization,
        accept: "application/json",
      },
    })
    .then((response) => {
      const regex = new RegExp(year);
      res.status(200).send({
        data: response.data.data.items.filter((item) => regex.test(item.name)),
        error: false,
      });
    })
    .catch((err) =>
      res.status(400).send({
        error: true,
        data: err,
      })
    );
});

// Jadvallarni olish uchun so'rov -----------------------------
app.get("/api/schedule", (req, res) => {
  const faculty = req.query.faculty;
  const group = req.query.group;
  const lang = req.query.lang;
  const semester = req.query.semester;
  axios
    .get(
      `schedule-list?l=${lang}&_faculty=${faculty}&_group=${group}&_semester=${semester}&limit=200`,
      {
        headers: {
          Authorization: process.env.Authorization,
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data.data.items.length !== 0) {
        let week =
          response.data.data.items[response.data.data.items.length - 1][
            "_week"
          ];
        res.status(200).send({
          // data: response.data,
          data: response.data.data.items.filter(
            (item) => item["_week"] === week
          ),
          error: false,
        });
      } else {
        res.status(200).send({
          // data: response.data,
          data: [],
          error: false,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        data: err,
      });
    });
});

app.listen(process.env.PORT, () =>
  console.log(`app is running ${process.env.PORT}`)
);
