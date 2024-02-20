import React, { useEffect, useState } from 'react'
import './Books.css'
import Shimmer from './Shimmer'

function Books() {
  const [searchterm, setSearchTerm] = useState([""])

  const [books, setBooks] = useState([])
  useEffect(() => {
    if (searchterm != "")
      getBooks()
  }, [searchterm])
  async function getBooks() {
    const data = await fetch(`https://openlibrary.org/search.json?title=${searchterm}`)
    const json = await data.json()
    //  console.log(json);
    setBooks(json?.docs)
    console.log(books);
  }

  return (
    <>

      <div className='border-2 border-cyan-100 w-full h-[100px]
    flex justify-center items-center'>

        <div className='nav flex justify-space items-center' >
          <h1>Search</h1>
          <input placeholder='Your Book' onChange={(e) => setSearchTerm(e.target.value)} type="text" className='border-2 border-red-500' />

          <h1>Here</h1>
        </div>

      </div>
      <div className='out'>
        {
          books.length == 0 ? <Shimmer /> : books.slice(0, 12).map((bk) => (
            <div className='lis'>
              <img src={`https://covers.openlibrary.org/b/id/${bk.cover_i}-L.jpg`} width="100px" />
              <h1>
                {bk.title}
              </h1>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Books