import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, } from 'react-router-dom'

function Course() {
    const lang = useSelector(store => store.lang)
    const navigate = useNavigate();
    const date = new Date();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    return (
        <div>
            <div>
                <h2 className="secondary-title">{lang.course}</h2>
                <div className="container select">
                    <div className="px-0 px-lg-3 mt-3 pb-4">
                        <Link to={`${date.getMonth() > 7 ? date.getFullYear() : date.getFullYear() - 1}/${date.getMonth() > 0 && date.getMonth() < 7 ? "12" : "11"}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">1-{lang.courseName}</p>
                            </div>
                        </Link>
                        <Link to={`${date.getMonth() > 7 ? date.getFullYear() - 1 : date.getFullYear() - 2}/${date.getMonth() > 0 && date.getMonth() < 7 ? "14" : "13"}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">2-{lang.courseName}</p>
                            </div>
                        </Link>
                        <Link to={`${date.getMonth() > 7 ? date.getFullYear() - 2 : date.getFullYear() - 3}/${date.getMonth() > 0 && date.getMonth() < 7 ? "16" : "15"}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi"></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">3-{lang.courseName}</p>
                            </div>
                        </Link>
                        <Link to={`${date.getMonth() > 7 ? date.getFullYear() - 3 : date.getFullYear() - 4}/${date.getMonth() > 0 && date.getMonth() < 7 ? "18" : "17"}`} className="row item mb-4">
                            <div className="col-1 header d-flex align-items-center justify-content-center">
                                <p className="m-0 tartiblovchi" ></p>
                            </div>
                            <div className="col d-flex align-items-center">
                                <p className="m-0 ps-2">4-{lang.courseName}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Course