import {createBrowserRouter} from 'react-router-dom'
import HomePage from '../pages/home';
import Otp from '../pages/otp';


const router = createBrowserRouter([
    {
      path : '/',
      element : <div> <HomePage/></div>,
      //errorElement : <NotFoundPage/>,
    },
    {
      path : '/otp',
      element : <Otp/>
    },
    /*{
      path : '/register',
      element : <Register/>
    },
    {
      path : '/home',
      element : <Home/>
    }*/
  ])

  export default router;