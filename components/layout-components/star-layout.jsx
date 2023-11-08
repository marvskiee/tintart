import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const StarLayout = ({ rating, setRating, data }) => {
  let random = parseInt(Math.random() * 100)
  return (
    <div className='flex gap-2'>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((item, key) => (
        <AiFillStar
          key={`star-${random}-${key}`}
          size={30}
          className={`${rating < item ? 'text-zinc-400' : 'text-yellow-300'}`}
          onClick={() => setRating && setRating({ ...data, rating: item })}
        />
      ))}
    </div>
  )
}

export default StarLayout
