import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Facultets() {

    const lang = useSelector(store => store.lang)
    const [facultets, setFacultets] = useState([]);
    useEffect(() => {
        // axios.get("afsa").catch(res => console.log(res))
        axios.get(`facultets?lang=${lang.lang}`)
            .then(res => {
                setFacultets(res.data)
                console.log(res.data)
            }
            )
            .catch(err => console.log(err))
    }, [lang]);




    return (
        <div>
            <h2 className="secondary-title">{lang.faculty}</h2>
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
        </div >
    )
}

export default Facultets