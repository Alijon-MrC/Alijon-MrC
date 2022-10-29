import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/img/SamDU logo full.png'
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { changeLanguage } from '../store/redusers/languageSlice'
function Header() {
    const lang = useSelector(store => store.lang);

    const dispatch = useDispatch();
    function changeLang(code) {
        code !== lang.lang &&
            dispatch(changeLanguage(code))
    }
    return (
        <div className="sticky-top bg-white">
            <div className='py-2 head px-2 px-xl-3  justify-content-between align-items-center'>
                <h1 className='m-0  align-items-center'>
                    <img src={logo} alt="logo" />
                    <p className='m-0 ms-2'>{lang.title.name} <span> {lang.title.table} </span></p>
                </h1>
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
        </div>



    )
}

export default Header