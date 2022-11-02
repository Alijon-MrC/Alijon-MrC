import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Group() {
    const lang = useSelector(state => state.lang);
    const { facultyId, year } = useParams();
    const [groups, setGroups] = useState([])
    const [loader, setloader] = useState(false)
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setloader(true)
        axios.get(`/groups?faculty=${facultyId}&lang=${lang.lang}&year=${year}`)
            .then(res => {
                setGroups(res.data);
                setloader(false);
            })
            .catch(err => console.log(err))
    }, [lang])

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
            <h2 className="secondary-title">{lang.group}</h2>

            {
                loader ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner className='d-flex justify-content-center' animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (<div className="container select">
                    <div className="px-0 px-lg-3 mt-3 pb-4">
                        {
                            groups?.data?.map((group, index) => (
                                <Link to={group.id.toString()} key={group.id} className="row item mb-4">
                                    <div className="col-1 header d-flex align-items-center justify-content-center">
                                        <p className="m-0 tartiblovchi" >{index + 1}</p>
                                    </div>
                                    <div className="col d-flex align-items-center">
                                        <p className="m-0 ps-2">{group.name}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>)
            }
        </div >
    )
}

export default Group