import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
toast.configure()

export const success= (msg) => {
    return (toast.success(msg, {
        position: "top-right",
        autoClose: 4000,
        closeOnClick: true,
        pauseOnHover: true,
    }))
}

export const error = (msg) => {
    return(
        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: true,
        })
    )
}