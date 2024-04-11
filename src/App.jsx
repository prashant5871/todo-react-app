import { useState } from 'react'
import './App.css'
import './output.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className='flex bg-blue-500 shadow justify-between text-white p-3'>
        <div className="logo">
          <span className="font-bold mx-5 hover:text-gray-200 transition-all hover:cursor-pointer">myTodo</span>
        </div>
        <ul className="flex gap-3">
          <li className='hover:text-gray-200 transition-all hover:cursor-pointer'>Home</li>
          <li className='hover:text-gray-200 transition-all hover:cursor-pointer'>About</li>
          <li className='hover:text-gray-200 transition-all hover:cursor-pointer'>Contact</li>
        </ul>
      </nav>
    </>
  )
}

export default App
