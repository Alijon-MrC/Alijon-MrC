import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';


{/* <div className="d-flex justify-content-center time">
  <div className="button-back"><a href="/facultyId-{{facultyId}}/course-{{course}}"><i className="bx bx-arrow-back" /></a></div>
  <p className="tertiary-title" id="date" />
  <div className="button-back1" />
</div> */}
function Schedule() {
    const { facultyId, semester, groupId } = useParams();
    const lang = useSelector(state => state.lang);
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
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


            })
            .catch(err => console.log(err))
    }, [lang])
    return (
        <div>
            <h2 className="secondary-title">{lang.schedule}</h2>
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
                                                    <th scope="col">Kirish</th>
                                                    <th scope="col">Chiqish</th>
                                                    <th scope="col">Fan nomi</th>
                                                    <th scope="col">Xona</th>
                                                    <th scope="col">Fan turi</th>
                                                    <th scope="col">O'qituvchi</th>
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
                </div>
            </div>
        </div>
    )
}

export default Schedule