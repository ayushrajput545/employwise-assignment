
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}) => {

    const{token} = useSelector((state)=>state.auth);
    console.log(token)

      if(token===null){
        return children
      }
      else{
        return <Navigate to='/userlist'/>
      }
}

export default OpenRoute