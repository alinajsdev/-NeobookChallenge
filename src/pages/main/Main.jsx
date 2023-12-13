import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Main = () => {
    const [name, setName] = useState('')

    useEffect( ()=>{
        (
            async()=>{
                const {data} = await axios.get(`users/me`)

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