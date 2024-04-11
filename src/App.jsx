import { useEffect, useState } from 'react'
import './App.css'
import './output.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showComplete, setshowComplete] = useState(false)

  // useEffect(() => {
  //   let temp = showComplete;
  //   setshowComplete(!temp);
  // }, [showComplete])

  useEffect(() => {
    // setTodos(JSON.parse(localStorage.getItem('myTodo')))
    const data = localStorage.getItem('myTodo');
    console.log("data is  : " + data)
    if (data) {
      setTodos(JSON.parse(data));
      console.log("all todos are : ", JSON.parse(data))
    }
  }, [])


  const handleShowTodo = ()=>{
    setshowComplete(!showComplete)
  }

  const storeToLocalStorage = (t) => {
    let myTodos = [...todos]
    localStorage.setItem('myTodo', JSON.stringify(t))
  }

  const handleChange = (event) => {
    setTodo(event.target.value)
    // console.log(todo)
  }

  const saveTodo = (e) => {
    if (todo.trim() == "") {
      setTodo("");
      return;
    }
    let newTodos = [...todos, { "id": uuidv4(), todo, isComplete: false }]
    setTodos(newTodos);
    setTodo("")
    console.log(newTodos)
    storeToLocalStorage(newTodos);
  }

  const handleUpdate = (e, id) => {
    let toUpdateTodo = todos.findIndex(item => item.id === id);
    console.log(toUpdateTodo);

    setTodo(todos[toUpdateTodo].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    storeToLocalStorage(newTodos);
  }

  const handleDelete = (e, id) => {
    let newToDos = todos.filter(item => item.id !== id);
    if (confirm("Are you sure you want to remove this task from To Do list ? ")) {
      setTodos(newToDos);
      storeToLocalStorage(newToDos);
    }
  }

  const handleConditionChange = (e, id) => {
    let index = todos.findIndex(item => item.id === id);
    console.log("index is : " + index)
    let newTodos = todos.filter(item => item.id !== id);
    let singleTodo = todos[index];
    console.log(singleTodo.isComplete)
    singleTodo.isComplete = !singleTodo.isComplete;
    //Here when I remove above line and set below as !singleTodo.isComplete then it gives wrong , but why ? 
    setTodos([...newTodos, { "id": id, "todo": singleTodo.todo, "isComplete": singleTodo.isComplete }])
    console.log(todos)
    storeToLocalStorage([...todos]);
  }

  return (
    <>
      {/* ************ Navbar start ******************** */}
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

      {/* **************** Navbara end ***************** */}


      {/* **************** Main page start ***************** */}


      <div className="container bg-blue-200 min-h-[80vh] w-[78%] m-auto my-3 rounded-lg">
        {/* Add to do option start from here */}
        <div className="addTodo p-5 w-full  bg-blue-300">
          {/* input tag for taking  input from user */}
          <input type="text" className='min-w-[50%] focus:border-none focus:outline-none p-2' placeholder='Add To Do' value={todo} onChange={handleChange} />

          <button onClick={saveTodo} className='bg-blue-800 text-white font-bold p-2 px-3 hover:bg-blue-700 cursor-pointer rounded-md mx-3'>Save</button>
        </div>
        {/* Add to do option ended */}
        <div className="myTodos">
          {/* heading for To Do list */}
          <h2 className='text-xl p-5 text-center'><span className='border border-white p-2 bg-blue-400'>Your Todos</span></h2>

          {!todos.length && <div className="noItem m-3 text-lg font-bold">No tasks are available to show.</div>}


          {/* Option for showing completed tasks */}
          {todos.length != 0 && <div onChange={handleShowTodo} className="showOption flex gap-3 mt-1 mx-3 text-lg items-center">
            <input type="checkbox" name="" id='condition' className='cursor-pointer' />
            <label htmlFor="condition" className='cursor-pointer'>Show completed tasks</label>
          </div>}


          {/* All todo will be wrap in inside this container which is .todos */}
          <div className="todos">
            {todos.map((item, index) => {
              if ((showComplete == true && item.isComplete == true) || (item.isComplete == false)) {
                return <div key={item.id} className="todo flex justify-between my-3 p-3 bg-green-300 w-full">
                  <div onClick={(e) => { handleConditionChange(e, item.id) }} className="cursor-pointer left flex gap-3 text-lg items-center justify-center">
                    <input onChange={(e) => { handleConditionChange(e, item.id) }} type="checkbox" checked={item.isComplete} />
                    <div className={item.isComplete ? "line-through" : ""}><p>{item.todo}</p></div>
                  </div>
                  <div className="right flex gap-4 justify-center items-center">
                    <button className='border rounded-md p-2 bg-green-800 text-white hover:bg-green-700' onClick={(event) => { handleUpdate(event, item.id) }}>Update</button>
                    <button onClick={(event) => { handleDelete(event, item.id) }} className='border rounded-md p-2 bg-red-800 text-white hover:bg-red-700'>delete</button>
                  </div>
                </div>
              }
            })}

            {/* <div className="todo flex justify-between my-3 p-3 bg-green-300 w-full">
              <div className="left flex gap-3 text-lg items-center justify-center">
                <input type="checkbox" name="" />
                <div className="description"><p>This is the demo todo</p></div>
              </div>
              <div className="right flex gap-4">
                <button className='border rounded-lg p-2 bg-green-800 text-white hover:bg-green-700'>Update</button>
                <button className='border rounded-lg p-2 bg-red-800 text-white hover:bg-red-700'>delete</button>
              </div>
            </div> */}
          </div>
        </div>

      </div >

      {/* **************** Main page end ***************** */}

    </>
  )
}

export default App
