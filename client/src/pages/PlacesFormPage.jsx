import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
export default function PlacesFormPage(){
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
    const [redirect,setRedirect] = useState(false);
    const [price,setPrice] = useState(100);
     useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);

        });
    },[id]);
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
      async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests,price,
        };
        if (id) {
          // update
          await axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('/places', placeData);
          setRedirect(true);
        }
    
      }
      if(redirect){
        return <Navigate to = {'/account/places'} />
      }
    return(
        <div> 
                    <AccountNav />
                    <form  onSubmit = {savePlace}>
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
                        <div className='grid gap-2 grid-cols-2 md:grid-cols-4' >
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
                            <div>
                                <h3 className='mt-2 mb-1'> Price per night</h3>
                                <input type="number" value ={price} onChange={ev => setPrice(ev.target.value)}
                                placeholder='4' />
                            </div>



                        </div>
                        <div  >
                            <button className='primary my-4'> Save</button>
                        </div>

                    </form>
                </div>
            
    )
}