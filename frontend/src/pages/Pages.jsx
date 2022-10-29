import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../companents/Header'

function Pages() {
    return (
        <div className='container-fluit main'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Pages