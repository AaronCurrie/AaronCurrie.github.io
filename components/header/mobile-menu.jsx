import './mobile-menu.css'

const MobileMenu = ({isOpen, handleBurgerClick}) => {
return (
        <button className='menu' aria-label='open menu' onClick={handleBurgerClick}>             
            <div  className="hamburger-lines">
                <span className={`line ${isOpen? 'line1cross': 'line1'}`}></span>
                <span className={`line ${isOpen? 'line2cross': 'line2'}`}></span>
                <span className={`line ${isOpen? 'line3cross': 'line3'}`}></span>
            </div>
        </button>
    )
}

export default MobileMenu