import React, { useContext } from 'react'
import AdminLogin from './AdminLogin'
import AdminProfile from './AdminProfile';
import { GlobalVariableContext } from '../../App';


const Home = () => {
    let global = useContext(GlobalVariableContext);
  
  return (
    <div className=" h-[95vh]">
      {global.token?(
        <AdminProfile></AdminProfile>
      ):(

      <AdminLogin></AdminLogin>
   
      )}

      
     
    </div>
  );
}

export default Home