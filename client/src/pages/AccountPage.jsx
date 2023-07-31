import { useContext,useState} from "react";
import {UserContext} from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";



export default function AccountPage(){
    const {ready,user,setUser} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

   async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }


    if(!ready)
    {
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }
  
    function linkClasses (type = null){
        let classes = 'py-2 px-6';
        if(type === subpage ){
            classes+=' bg-primary text-white rounded-full';
        }
        return classes;
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(

        <div>
            <nav className="w-full flex justify-center mt-8 gap-2">
                <Link className={linkClasses('profile')} to={'/account'}>My profile </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}> My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}> My accomodoations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick ={logout} className="primary max-w-sm mt-2"> Logout</button>
                </div>
            )}
        </div> 
    );
}