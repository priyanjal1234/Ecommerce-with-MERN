import React from 'react'

const SubmitBtn = ({btnText}) => {
  return (
    <button className='w-[400px] h-[45px] bg-[#9333EA] rounded-lg' type='submit'>
        {btnText}
    </button>
  )
}

export default SubmitBtn