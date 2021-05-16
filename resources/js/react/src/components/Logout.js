import Button from './Button'

const Header = ({ onLogout }) => {

  return (
    <header className='header'>
     
      <div>
         <Button
          text={'Déconnecter'}
          onClick={onLogout}
        /></div>
    </header>
  )
}

export default Header