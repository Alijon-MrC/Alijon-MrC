import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';


function Group() {
    const lang = useSelector(state => state.lang);
    const { facultyId, year } = useParams();
    const [groups, setGroups] = useState([])
    useEffect(() => {
        axios.get(`/groups?faculty=${facultyId}&lang=${lang.lang}&year=${year}`)
            .then(res => setGroups(res.data))
            .catch(err => console.log(err))
    }, [lang])



    return (
        <div>
            <h2 className="secondary-title">{lang.group}</h2>
            <div className="container select">
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
            </div>
        </div >
    )
}

export default Group