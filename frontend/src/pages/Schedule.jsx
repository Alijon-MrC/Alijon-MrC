import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';



function Schedule() {
    const { facultyId, semester, groupId, year } = useParams();
    const lang = useSelector(state => state.lang);
    const [schedule, setSchedule] = useState([]);
    const [loader, setLoader] = useState(false)
    const [saveData, setSave] = useState("")
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoader(true)
        axios.get(`schedule?lang=${lang.lang}&faculty=${facultyId}&group=${groupId}&semester=${semester}`)
            .then(res => {
                if (res.data.data.length !== 0) {
                    let dayArr = [[], [], [], [], [], []];
                    const weekStartTime = res.data.data[0].weekStartTime;
                    res.data.data.forEach(item => {
                        if (item.lesson_date === weekStartTime)
                            dayArr[0].push(item)
                        if (item.lesson_date === weekStartTime + 86400)
                            dayArr[1].push(item)
                        if (item.lesson_date === weekStartTime + 86400 * 2)
                            dayArr[2].push(item)
                        if (item.lesson_date === weekStartTime + 86400 * 3)
                            dayArr[3].push(item)
                        if (item.lesson_date === weekStartTime + 86400 * 4)
                            dayArr[4].push(item)
                        if (item.lesson_date === weekStartTime + 86400 * 5)
                            dayArr[5].push(item)
                    })
                    setSchedule(dayArr)
                }
                else setSchedule([])
                setLoader(false)
            })
            .catch(err => console.log(err))
    }, [lang]);

    const navigate = useNavigate();
    useEffect(() => {
        if (document.querySelector("#root").offsetWidth <= 1085 && document.querySelector("#root").offsetWidth >= 1070) {
            var timerID = setInterval(() => back(), 60000);
        }
        return () => {
            clearInterval(timerID)
        }
    }, [])

    function back() {
        navigate("/")
    }


    function save() {
        if (!localStorage.getItem("_data")) {
            setSave("1")
            localStorage.setItem("_data", JSON.stringify({
                facultyId,
                semester,
                groupId,
                year
            }))
        }
        else {
            localStorage.removeItem("_data")
            setSave("")
        }
    }

    return (
        <div>
            <h2 className="secondary-title">{lang.schedule}</h2>
            {
                loader ? (<div className='d-flex justify-content-center'>
                    <Spinner className='d-flex justify-content-center' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>) : (
                    <div className="container timetable">

                        <div className="mt-3 pb-4">
                            {
                                schedule.length !== 0 ?
                                    (schedule?.map((item, index) => (
                                        <div key={index} className="row item mb-4">
                                            <div className="col-12 col-md-1 header py-4 d-flex align-items-center justify-content-center">
                                                <p className="m-0 writing-mode">{lang.week[index]}</p>
                                            </div>
                                            <div className="col-12 col-md-11">
                                                <table className="table table-striped w-100">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">{lang.table.start_time}</th>
                                                            <th scope="col">{lang.table.end_time}</th>
                                                            <th scope="col">{lang.table.subject}</th>
                                                            <th scope="col">{lang.table.auditorium}</th>
                                                            <th scope="col">{lang.table.trainingType}</th>
                                                            <th scope="col">{lang.table.employee}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            item.map(lesson => (
                                                                <tr key={lesson.id}>
                                                                    <th scope="row">{lesson.lessonPair.name}</th>
                                                                    <td>{lesson.lessonPair.start_time}</td>
                                                                    <td>{lesson.lessonPair.end_time}</td>
                                                                    <td>{lesson.subject.name}</td>
                                                                    <td>{lesson.auditorium.name}</td>
                                                                    <td>{lesson.trainingType.name}</td>
                                                                    <td>{lesson.employee.name}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))) : (<h2 className='text-center'>Sizda dars jadvali shakillanmagan</h2>)
                            }
                            <div className='d-flex justify-content-end d-block d-lg-none'>
                                <Button onClick={save} className='border-0 w-100' style={{ backgroundColor: "#20c997" }}>Guruhni {!localStorage.getItem("_data") ? `saqlab qo'yish` : "o'chirish"} </Button></div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Schedule