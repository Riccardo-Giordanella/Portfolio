import './Navbar.css';
import logo from '../assets/riccardo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
        <img src={logo} alt="Logo" className='logo' />
        <ul className="nav-menu">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Contact</li>
            <li>Resume</li>
        </ul>
        <div className="nav-connect">Connect with me</div>
    </nav>
  )
}
