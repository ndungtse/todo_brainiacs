import React from 'react';
import { FaTasks } from "react-icons/fa";
import { useTodos } from '../contexts/AppContext'

function Header() {
  const { edit } = useTodos()


  return (
    <div>
      <div className="w-2/3 mx-auto flex flex-col items-center">
      <h1 className='text-2xl'>PANGA</h1>
      <button className="add-btn mt-9">
        {edit?'Edit Todo':'Add Todo'}
      <FaTasks className="fa"></FaTasks>
      </button>
      </div>
    </div>
  )
}

export default Header