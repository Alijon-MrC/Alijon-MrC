const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const e = require('express');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

axios.defaults.baseURL = "https://student.samdu.uz/rest/v1/data";

dotenv.config();

// Fakuletlar olish uchun so'rov -----------------------------
app.get('/facultets', (req, res) => {
    const lang = req.query.lang;
    console.log(`/department-list?l=${lang}`);
    axios.get(`department-list?l=${lang}`, {
        headers: {
            Authorization: process.env.Authorization,
            accept: 'application/json'
        }
    })
        .then(response => {
            res.status(200).send({
                data: response.data.data.items.filter(item => item.structureType.code === "11" && item.id !== 2),
                error: false
            })
        })
        .catch(err => res.status(400).send({
            error: true,
            data: err,
        }))
})

// Guruhlarni olish uchun so'rov -----------------------------
app.get('/groups', (req, res) => {
    const faculty = req.query.faculty;
    const lang = req.query.lang;
    const year = req.query.year;
    console.log(`/group-list?l=${lang}&_department=${faculty}`);
    axios.get(`/group-list?l=${lang}&_department=${faculty}`, {
        headers: {
            Authorization: process.env.Authorization,
            accept: 'application/json'
        }
    })
        .then(response => {
            const regex = new RegExp(year);
            res.status(200).send({
                data: response.data.data.items.filter(item => regex.test(item.name)),
                error: false
            })
        })
        .catch(err => res.status(400).send({
            error: true,
            data: err,
        }))
})


app.get("/", (req, res) => {
    let count;
    const allData = []
    axios.get('/schedule-list?page=1&_faculty=1&_group=1649&_education_year=2022', {

    }).then(response => {
        count = response.data;
        let large = -Infinity;
        response.data.data.items.forEach(element => {
            console.log(element["_week"]);
            if (element["_week"] > large) large = element["_week"];
        });

        res.send(response.data.data.items.filter(item => +item["_week"] === large
        ));
    })

    // for (let i = 2; i <= count; i++) {
    //     axios.get('https://student.samdu.uz/rest/v1/data/department-list?page=' + i, {
    //         headers: {
    //             Authorization: process.env.Authorization,
    //             accept: 'application/json'
    //         }
    //     }).then(response => {
    //         allData.push(...response.data.data.items)
    //     })
    // }

    // data => res.status(200).send(data.data)
})

app.listen(process.env.PORT, () => console.log(`app is running ${process.env.PORT}`))