import PropTypes from 'prop-types'
import Button from './Button'



const Header = ({ title, onAdd, showAdd, onLogout }) => {

  function logout() {
    onLogout(true)
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <div>
      <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Fermer' : 'Ajouter'}
          onClick={onAdd}
        />
         <Button
          text={'Déconnecter'}
          onClick={logout}
        /></div>
    </header>
  )
}

Header.defaultProps = {
  title: 'ToDoList',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header