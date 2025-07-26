import profile_pic from '../assets/riccardo_2.jpg';
import './Hero.css';

export default function Hero() {
    return (
        <div className="hero">
            <img src={profile_pic} alt="Profile" className='profile-pic' />
            <h1><span>I'm Riccardo Giordanella,</span> a Front/Back end developer based in Italy</h1>
            <p>I'm a passionate developer with a knack for creating stunning web applications.</p>
            <div className="hero-action">
                <div className="hero-connect">Connect with me</div>
                <div className="hero-resume">View my resume</div>
            </div>
        </div>
    );
}