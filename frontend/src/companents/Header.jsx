import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/img/SamDU logo full.png'
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { changeLanguage } from '../store/redusers/languageSlice'
import { Link, useNavigate } from 'react-router-dom';
function Header() {
    const lang = useSelector(store => store.lang);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [date, setDate] = React.useState(new Date());

    function changeLang(code) {
        code !== lang.lang &&
            dispatch(changeLanguage(code))
    }
    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    useEffect(() => {
        if (localStorage.getItem("_data")) {
            const savedData = JSON.parse(localStorage.getItem("_data"));
            navigate(`${savedData.facultyId}/${savedData.year}/${savedData.semester}/${savedData.groupId}`);
        }
    }, [])

    function tick() {
        setDate(new Date());
    }

    return (
        <div className="sticky-top bg-white">
            <div className='py-2 head px-2 px-xl-3  justify-content-between align-items-center'>
                <Link to="/">
                    <h1 className='m-0  align-items-center'>
                        <img src={logo} alt="logo" />
                        <p className='m-0 ms-2'>{lang.title.name} <span> {lang.title.table} </span></p>
                    </h1>
                </Link>
                <Dropdown autoClose="true" as={ButtonGroup} className='drop-down'>
                    <Dropdown.Toggle id="dropdown-basic">
                        {lang.type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.ItemText onClick={() => changeLang("uz-UZ")} >O'zbek</Dropdown.ItemText>
                        <Dropdown.ItemText onClick={() => changeLang("en-US")} >English</Dropdown.ItemText>
                        <Dropdown.ItemText onClick={() => changeLang("ru-RU")} >Русский</Dropdown.ItemText>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="justify-content-between  time">

                <button className='btn' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                        <path color='#00B9C2' d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                    </svg>
                </button>
                <p className="clock" id="date" >
                    <span>{date.getHours().toLocaleString().length === 1 ? `0${date.getHours()}` : date.getHours()}</span>
                    <span className='tick'>:</span>
                    <span>{date.getMinutes().toLocaleString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()}</span>
                    <span className='tick'>:</span>
                    <span>{date.getSeconds().toLocaleString().length === 1 ? `0${date.getSeconds()}` : date.getSeconds()}</span>
                </p>
                <div style={{ width: '96px' }}></div>
            </div>
        </div>



    )
}

export default Header