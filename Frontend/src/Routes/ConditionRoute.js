import React from 'react'
import { Navigate } from 'react-router-dom'

// import lib
import isLogin from '../lib/isLogin';

const ConditionRoute = (props) => {
    const { type, children } = props;
    //    console.log(children, 'children')
    if (type === 'auth' && isLogin() === true) {
        return <Navigate to='/' />
    } else if (type === 'private' && isLogin() === false) {
        return <Navigate to='/login' />
    }
    
    return children;
}

export default ConditionRoute;