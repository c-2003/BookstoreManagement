import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [auther,setAuther] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () =>{
    const data = {title, auther, publishYear};
  
    setLoading(true);
    
    axios
    .post('http://localhost:5555/books',data)
    .then(res =>{
      setLoading(false);
      
      enqueueSnackbar('Book created successfully',{variant : 'success'});
      navigate('/');
    })
    .catch(err =>{
      setLoading(false);
      // alert('An error occured!!  Please check the console')
      enqueueSnackbar('error',{variant : 'error'});
      console.log(err.message);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 roinded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Title</label>
          <input 
          type="text"
          value = {title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' 
          />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Auther</label>
          <input 
          type="text"
          value = {auther}
          onChange={(e) => setAuther(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' 
          />
        </div>
        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
          type="text"
          value = {publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' 
          />
        </div>
        <button className='p-2 bg-sky-200 m-8' onClick={handleSaveBook}>
           Save
        </button>
      </div>

    </div>
  )
}

export default CreateBook