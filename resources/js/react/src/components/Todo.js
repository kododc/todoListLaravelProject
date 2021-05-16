
const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    
    <div
      className={`task ${todo.completed && 'completed'}`}
      onDoubleClick={() => onToggle(todo.id)}
    >
      <h3>
        {todo.title}{' '}
        <i className="fa fa-times"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(todo.id)}
        ></i>
      </h3>
    </div>
  )
}

export default Todo