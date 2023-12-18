import React from 'react'
import { MoonLoader } from "react-spinners";

const Loader = ({timer}) => {

  return (
    <div>
      <MoonLoader
  color="#494949"
  size={16}
  speedMultiplier={0.3}
  loading={timer > 0}
/>
    </div>
  )
}

export default Loader