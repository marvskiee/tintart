import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const StarLayout = ({ rating, setRating, data }) => {
  return (
    <div className='flex gap-2'>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((item, key) => (
        <>
          <AiFillStar
            key={'star-' + key}
            size={30}
            className={`${rating < item ? 'text-zinc-400' : 'text-yellow-300'}`}
            onClick={() => setRating({ ...data, rating: item })}
          />
        </>
      ))}
    </div>
  )
}

export default StarLayout
