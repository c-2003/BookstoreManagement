import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  
  const handleDeleteBook =() =>{
    setLoading(true)

    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(res =>{
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully', {variant : 'success'});
      navigate('/');
    })
    .catch(err =>{
      setLoading(false);
      // alert('An error occured!! Please check console')
      enqueueSnackbar('Error Deleting book', {variant : 'error'})
      console.log(err.message);
    })
  }
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete book</h1>
      <div className='flex flex-col items-center border-2 border-sky-200 rounded-xl w-[600px] p-8 mx-auto'>
        <h3>Sre you sure you want to delete this book?</h3>
        <button 
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook