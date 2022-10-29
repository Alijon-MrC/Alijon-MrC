import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'

function Course() {
    const [addCourse, setAddCourse] = useState({
    });
    const lang = useSelector(store => store.lang)
    function addMyCourse(number) {
        const tuday = new Date();
        const courseYear = tuday.getFullYear() - number;
        const month = tuday.getMonth();
        let semester = getSemeter();

        function getSemeter() {
            if (number === 0 && month >= 0 && month <= 8) return "12"
            else if (number === 1 && month >= 0 && month <= 8) return "14"
            else if (number === 2 && month >= 0 && month <= 8) return "16"
            else if (number === 3 && month >= 0 && month <= 8) return "18"
            else if (number === 0 && month >= 9 && month <= 12) return "11"
            else if (number === 1 && month >= 9 && month <= 12) return "13"
            else if (number === 2 && month >= 9 && month <= 12) return "15"
            else if (number === 3 && month >= 9 && month <= 12) return "17"
        }

        setAddCourse({ courseYear: courseYear, semester: semester })

    }
    return (
        <div>
            <div>
                <h2 className="secondary-title">{lang.course}</h2>
                <div className="container select">
                    <div className="px-0 px-lg-3 mt-3 pb-4">
                        <Link onMouseEnter={() => addMyCourse(0)} to={`${addCourse.courseYear}/${addCourse.semester}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">1-kurs</p>
                            </div>
                        </Link>
                        <Link onMouseEnter={() => addMyCourse(1)} to={`${addCourse.courseYear}/${addCourse.semester}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">2-kurs</p>
                            </div>
                        </Link>
                        <Link onMouseEnter={() => addMyCourse(2)} to={`${addCourse.courseYear}/${addCourse.semester}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">3-kurs</p>
                            </div>
                        </Link>
                        <Link onMouseEnter={() => addMyCourse(3)} to={`${addCourse.courseYear}/${addCourse.semester}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">4-kurs</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Course