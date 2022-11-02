import React, { useEffect } from "react";
import timeTable from '../assets/img/timetable.png'
import logo from '../assets/img/SamDU logo full.png'
import { Link, useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("_data")) {
            const savedData = JSON.parse(localStorage.getItem("_data"));
            navigate(`schedule/${savedData.facultyId}/${savedData.year}/${savedData.semester}/${savedData.groupId}`);
        }
    }, [])
    return (
        <div className="container-fluit main">
            <div className="d-flex align-items-center pt-5 flex-column">
                <div className="logo"><img src={logo} alt="logo" /></div>
                <h1 className="begin-title">
                    Samarqand Davlat Unversiteti <span> Darslar Jadvali </span>
                </h1>
                <div>
                    <Link to="/schedule" className="btn-begin">Boshlash</Link>
                </div>
                <div className="time-table">
                    <img src={timeTable} alt={timeTable.toString()} />
                </div>
            </div>
        </div>
    )
}

export default Home;