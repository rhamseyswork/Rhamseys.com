import React from 'react'

const Footer_Box = (props) => {
  return (
    <div className="mt-8">
    <h2 className="text-lg text-center font-bold">{props.title}</h2>
    <hr className="border-2 border-black my-2 " />
    <div className="flex flex-col text-center">
      {props.children}
    </div>
  </div>
  )
}

export default Footer_Box