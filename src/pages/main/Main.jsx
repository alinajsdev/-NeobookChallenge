import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const history = useNavigate();
const {access} = useSelector(s => s.accessToken)
  const refresh = localStorage.getItem('refreshToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('users/me', {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        
        });
        console.log(data);
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

            console.log(retryResponse.data, 'name');
          } catch (refreshError) {
            console.error(refreshError);
          }
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [access, refresh]);

  useEffect(() => {
    // Перенаправление на страницу входа
    history('/login');
  }, [history]);



  return (
    <div>
      
      Main</div>
  )
}

export default Main
