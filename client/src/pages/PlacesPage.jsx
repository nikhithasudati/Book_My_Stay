import {Link,useParams} from 'react-router-dom';
import Perks from '../Perks.jsx';
import { useState } from 'react';
import  axios  from 'axios';
import PhotosUploader from '../PhotosUploader.jsx';

export default function PlacesPage(){
    const {action} = useParams();
        const {id} = useParams();
        const [title,setTitle] = useState('');
        const [address,setAddress] = useState('');
        const [addedPhotos,setAddedPhotos] = useState([]);
        const [description,setDescription] = useState('');
        const [perks,setPerks] = useState([]);
        const [extraInfo,setExtraInfo] = useState('');
        const [checkIn,setCheckIn] = useState('');
        const [checkOut,setCheckOut] = useState('');
        const [maxGuests,setMaxGuests] = useState();
        function inputHeader(text) {
            return (
              <h2 className="text-2xl mt-4">{text}</h2>
            );
          }
          function inputDescription(text) {
            return (
              <p className="text-gray-500 text-sm">{text}</p>
            );
          }
          function preInput(header,description) {
            return (
              <>
                {inputHeader(header)}
                {inputDescription(description)}
              </>
            );
          }
          
    return(
        <div>
            {action != 'new' && (
                    <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                      Add new place
                    </Link>
                  </div>

            )}
            {action === 'new' && (
                <div> 
                    <form >
                        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                        <input type = "text" value = {title} onChange = {ev => setTitle(ev.target.value)} placeholder='Title' />
                        {preInput('Address', 'Address to this place')}

                        <input type = "text" value = {address} onChange = {ev => setAddress(ev.target.value)}  placeholder='Address' />
                        {preInput('Photos','more = better')}
                        <PhotosUploader  addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                        
                        {preInput('Description','description of the place')}
                        <textarea  value = {description} onChange = {ev => setDescription(ev.target.value)} />
                        {preInput('Perks','select all the perks of your place')}
                        <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-6'> 
                        <Perks selected={perks} onChange={setPerks}/>

                        </div>
                        {preInput('Extra Info','house rules,etc')}
                        <textarea value={extraInfo} onChange = {ev => setExtraInfo(ev.target.value)} />
                        {preInput('Check in&out times', 'add checkin and check out times.')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 mb-1'> Check in Time</h3>
                                <input type="number" value ={checkIn} onChange={ev => setCheckIn(ev.target.value)} 
                                placeholder='14'/>
                            </div>
                            <div>
                                <h3 className='mt-2 mb-1'> Check out Time</h3>
                                <input type="number" value ={checkOut} onChange={ev => setCheckOut(ev.target.value)}
                                placeholder='12' />
                            </div>
                            <div>
                                <h3 className='mt-2 mb-1'> Max Number of Guests</h3>
                                <input type="number" value ={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
                                placeholder='4' />
                            </div>

                        </div>
                        <div  >
                            <button className=' flex text-center primary'> save</button>
                        </div>

                    </form>
                </div>
            )}
         
        </div>
    )
}