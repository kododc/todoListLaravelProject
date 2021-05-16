import { useState, useEffect } from 'react'
import Header from './components/Header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import Login from './components/Login'

const App = () => {
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [todos, setTodos] = useState([])
  const [token, setToken] = useState("")
  const [msg, setMsg] = useState("")
 
  const getTokenValue = () => {
    if (window.sessionStorage.getItem("token") === null || window.sessionStorage.getItem("token") == "false") {
      setShowLogin(true)
      return ""
    }
    else {
      setShowLogin(false)
      return window.sessionStorage.getItem("token");
    }
  }
  
  

  useEffect(() => {
   getTokenValue()
   if (!showLogin || getTokenValue()!= "") {
    getTodos()
    setTodos(getTodos()) 
   }
  }, [])

  const getTodos = async () => {
    return await fetchTodos()
  }

  // Get Token
  const fetchToken = async (user) => {
    const res = await fetch('http://127.0.0.1:8000/api/login',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body : JSON.stringify(user)
    })
    const data = await res.json()
    if (data.token) {
      setShowLogin(false)
      window.sessionStorage.setItem("token", data.token);
      setMsg("")
      fetchTodos()
    }
    else setMsg("Utilisateur inconnue!")
    return data
  }

  // Save User
  const saveUser = async (user) => {
    const res = await fetch('http://127.0.0.1:8000/api/user-create',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body : JSON.stringify(user)
      })
      fetchToken(user)
  }

  // Fetch Todos
  const fetchTodos = async () => {
    
    const res = await fetch('http://127.0.0.1:8000/api/todos',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getTokenValue()
      }
    })
    const data = await res.json()
    setTodos(data.data)
    return data.data
  }

  // Fetch Todo
  const fetchTodo = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/todo/${id}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getTokenValue()
      }
    })
    const data = await res.json()
    return data.data
  }

  // Add Todo
  const addTodo = async (todo) => {
    const res = await fetch('http://127.0.0.1:8000/api/todo',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getTokenValue()
      },
      body: JSON.stringify(todo)
    })

    const data = await res.json()

    setTodos([...todos, data.data])
  }

  // Delete Todo
  const deleteTodo = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/todo/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getTokenValue()
      }
    }) 
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTodos(todos.filter((todo) => todo.id !== id))
      : alert('Error Deleting This Todo')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const todoToToggle = await fetchTodo(id)
    console.log(todoToToggle.completed)
    const updTodo = { ...todoToToggle, completed: !todoToToggle.completed }

    const res = await fetch(`http://127.0.0.1:8000/api/todo`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getTokenValue()
      },
      body: JSON.stringify(updTodo),
    })

    const data = await res.json()
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: data.data.completed } : todo
      )
    )
  }

  function logout(log)
  {
    if (log) {
      setShowLogin(true)
      setMsg("")
      setTodos([])
      console.log(todos)
      sessionStorage.removeItem('token')
    }
  }

  return (
    
      <div className='container '>
      {
        !showLogin && getTokenValue != ""  ? (
          <div>
          <Header
          onAdd={() => setShowAddTodo(!showAddTodo)}
          showAdd={showAddTodo}  onLogout={logout}
        />
        {showAddTodo && <AddTodo onAdd={addTodo} />}
        {todos.length > 0 ? (
          <Todos
            todos={todos}
            onDelete={deleteTodo}
            onToggle={toggleReminder}
          />
        ) : (
          'Aucune Todo enregistré'
        )}
          </div>
      ) : 
      (
        <Login onLogin={fetchToken} onRegister={saveUser} />
      ) 
      }
      {msg}
      </div>
    
  )
}

export default App