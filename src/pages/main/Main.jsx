import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Main = () => {
  const {access} = useSelector(s => s.accessToken)
    const [name, setName] = useState('')


    useEffect( ()=>{
        (
            async()=>{
                const {data} = await axios.get(`users/me`,{
                  headers: {
                    'Authorization': `Bearer ${access}`
                }
                })

            // setName(data.name)
            console.log(data, 'name');
            }
        )()
    },[])


  return (
    <div>Main</div>
  )
}

export default Main