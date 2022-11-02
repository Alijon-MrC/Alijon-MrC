import React from 'react'
import { useSelector } from 'react-redux'

function NotFound() {
    const lang = useSelector(state => state.lang)
    return (
        <h3 className='text-center p-5'>{lang.notFound}</h3>
    )
}

export default NotFound