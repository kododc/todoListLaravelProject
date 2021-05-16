import Todo from './Todo'

const Todos = ({ todos, onDelete, onToggle }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Todos