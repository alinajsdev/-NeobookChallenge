import axios from "axios";

axios.defaults.baseURL = "https://neobook.online/mobi-market/";

// const refresh = localStorage.getItem('refreshToken')

// axios.interceptors.response.use(resp => resp, async error => {
//     if(error.response.status === 401) {
//         const response = await axios.post('users/login/refresh/', refresh)

//         if(response.status === 200) {
//             axios.defaults.headers.common['Authorization']= `Bearer ${response.data['token']}`

//             return axios(error.config)
//         }
//     }
//     return error;
// })