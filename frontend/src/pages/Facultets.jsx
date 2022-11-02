import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

function Facultets() {

    const lang = useSelector(store => store.lang)
    const [facultets, setFacultets] = useState([]);
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoader(true)
        axios.get(`facultets?lang=${lang.lang}`)
            .then(res => {
                setFacultets(res.data)
                setLoader(false)
            }
            )
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


    return (
        <div>
            <h2 className="secondary-title">{lang.faculty}</h2>
            {
                loader ? (<div className='d-flex justify-content-center'>
                    <Spinner className='d-flex justify-content-center' animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>) : (
                    <div className="container select">
                        <div className="px-0 px-lg-3 mt-3 pb-4">
                            {
                                facultets?.data?.map((faculty, index) => (
                                    <Link key={faculty.id} to={faculty.id.toString()} className="row item mb-4">
                                        <div className="col-1 header d-flex align-items-center justify-content-center">
                                            <p className="m-0 tartiblovchi" >{index + 1}</p>
                                        </div>
                                        <div className="col d-flex align-items-center">
                                            <p className="m-0 ps-2">{faculty.name}</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Facultets