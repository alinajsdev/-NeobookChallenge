import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserDefault from "../../assets/images/user.png";
import FavoriteSvg from "../../assets/svg/FavoriteSvg";
import NextSvg from "../../assets/svg/NextSvg";
import Basket from "../../assets/svg/BasketSvg";
import ExitSvg from "../../assets/svg/ExitSvg";
import "./Profile.css";
import { Box } from '@chakra-ui/react';
import Admin from '../../components/Admin';
import Favorites from '../../components/Favorites';
import MyItems from '../../components/MyItems';
import Exit from '../../components/Exit';

const Main = () => {
  const [tab , setTab] = useState(1)
  const [modal, setModal] = useState(false)
  const [data,setData] = useState(null)
const {access} = useSelector(s => s.accessToken)
  const refresh = localStorage.getItem('refreshToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('users/me', {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshResponse = await axios.post('users/login/refresh/', {
              refresh: refresh,
            });

            const retryResponse = await axios.get('users/me', {
              headers: {
                Authorization: `Bearer ${refreshResponse.data.access}`,
              },
            });
              setData(retryResponse.data)
          
          } catch (refreshError) {
            // console.error(refreshError);
          }
        } else {
          // console.error(error);
        }
      }
    };

    fetchData();
  }, [access, refresh]);
  console.log(data, 'name');
  return (
    <>
    <div className="container">
    <div className="tabs">
      <div className="user "
      onClick={()=> setTab(1)}
      >
        <img className="user--image" src={UserDefault} alt="" width="60px" />
        <div className="user--titles">
          <h2 className="user--title">{data?.first_name}</h2>
          <h4 className="user--name">{data?.username}</h4>
        </div>
      </div>

      <div className="favorite"
              onClick={()=> setTab(2)}
      >
        <div className="favorite--title">
          <FavoriteSvg/>
          <h2 className="favorite--name">Понравившиеся</h2>
        </div>
        <NextSvg />
      </div>

      <div className="basket"
              onClick={()=> setTab(3)}
      >
        <div className="basket--title">
          <Basket />
          <h2 className="basket--name">Мои товары</h2>
        </div>

        <NextSvg />
      </div>
      <div className="exit tab"  onClick={()=> setModal(true)}>
        <div 
        
        className="exit--title">
          <ExitSvg />
          <h2 className="basket--name">Выйти</h2>
        </div>

        <NextSvg />
      </div>
    </div>

    {/* content */}

    <div className="tab--content">
     {tab === 1  &&  
     <div className="content">
        <Admin/>
      </div>}

       {tab === 2  &&  
     <div className="content">
        <Favorites/>
      </div>}
      {tab === 3  &&  
     <div className="content">
        <MyItems/>
      </div>}  
    </div>
  </div>
  <Box
      position="absolute"
      top={modal ? "29%" : "-800px"}
      zIndex="99"
      left='37%'
      transition="1s"
    >
      <Exit setModal={setModal} modal={modal} />
    </Box>
</>
  )
}

export default Main