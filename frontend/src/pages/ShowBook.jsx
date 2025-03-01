
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner';


const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/books/${id}`)
    .then(res => {
      // console.log(res.data);
      setBook(res.data)
      setLoading(false);
    })
    .catch(err => {
      console.log(err.message);
      setLoading(false);
    });
  },[]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-200 mx-auto rounded-xl w-fit p-4 shadow-2xl'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Auther</span>
            <span>{book.auther}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )
      
      }
    </div>
  )
}

export default ShowBook