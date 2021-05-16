import { useState } from 'react'

const AddTodo = ({ onAdd, onLog }) => {
  const [title, setText] = useState('')
  const [completed, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      alert('Ajouter un Todo')
      return
    }

    onAdd({ title, completed })

    setText('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Todo</label>
        <input
          type='text'
          placeholder='Ajouter un Todo'
          value={title}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      {/* <div className='form-control form-control-check'>
        <label>Complétè</label>
        <input
          type='checkbox'
          checked={completed}
          value={completed}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div> */}

      <input type='submit' value='Sauver Todo' className='btn btn-block' />
    </form>
  )
}

export default AddTodo