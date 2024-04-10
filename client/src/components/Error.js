import React from 'react'

function Error() {
  return (
    <div className='d-flex'>
        <h1 className='text-danger'>Something went wrong ......</h1>
        <img className='mt-4 w-50 mx-auto' id="error" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKOBnsjOtwmsOXksBPUBsO7WAoyD1fN1pcCy9xHZleqrUPTclyieSqB4B-mijxRQ9MWgU&usqp=CAU" alt="err"/>
    </div>
  )
}

export default Error;