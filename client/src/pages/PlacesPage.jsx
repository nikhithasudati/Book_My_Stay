import {Link,useParams} from 'react-router-dom';
import Perks from '../Perks.jsx';
import { useState } from 'react';
import  axios  from 'axios';

export default function PlacesPage(){
    const {action} = useParams();
        const {id} = useParams();
        const [title,setTitle] = useState('');
        const [address,setAddress] = useState('');
        const [addedPhotos,setAddedPhotos] = useState([]);
        const [photoLink,setPhotoLink] = useState('');
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
          async function addPhotoByLink(ev){
            ev.preventDefault();
            const {data:filename} = await axios.post('/upload-by-link',{link: photoLink });
            setAddedPhotos(prev =>{
                return [...prev,filename]
            });
            setPhotoLink('');
          }
           function uploadPhoto(ev){
            const files = ev.target.files;
            const data = new FormData();
            for(let i=0;i<files.length;i++){
                data.append('photos',files[i]);

            }

            axios.post('/upload',data,{
                headers :{'Content-type':'multipart/form-data'}
            }).then(response =>{
                const{data:filenames} = response;
                setAddedPhotos(prev => {
                    return[...prev,...filenames]
                });
                
            })
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

                        <div className='flex gap-2'>
                             <input type = "text" value = {photoLink} onChange = {ev => setPhotoLink(ev.target.value)} placeholder='add using a link' />
                                <button onClick = {addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'> Add photo</button>
                        </div>
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link} className='h-32 flex'>
                                    <img className = "rounded-2xl w-full object-cover "src={'http://localhost:3000/uploads/'+link} alt="" />
                                </div>
                            ))}
                            <label className='h-32 cursor-pointer flex gap-1 gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-3xl text-gray-600'>
                                <input type = "file" multiple className='hidden' onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>upload
                            </label>
                        </div>        
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