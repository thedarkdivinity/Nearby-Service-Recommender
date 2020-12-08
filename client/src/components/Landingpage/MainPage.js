import React from 'react'
import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import About from './About';
import Fast from './Fast';
import Farm from '../Farm';
import ContactForm from './ContactForm';


const MainPage = () => {
    return (
        <>
        <section className="mainPage">
        <Navigation/>
        <section className="heroImage">
        <div className="swipe_text animate__animated animate__slideInLeft "  >
        <h2 >Welcome to Nearby Service Recommender</h2>
        </div>
        <Button variant="contained" color="secondary" href="/auth" data-aos="flip-right" className="animate__animated animate__tada forever knowMoreButton"  >know more</Button>
       
        </section>
        
        
        <About/>

        <svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e7008a" fill-opacity="1" d="M0,96L60,85.3C120,75,240,53,360,69.3C480,85,600,139,720,170.7C840,203,960,213,1080,208C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>        </section>
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e7008a" fill-opacity="1" d="M0,96L60,85.3C120,75,240,53,360,69.3C480,85,600,139,720,170.7C840,203,960,213,1080,208C1200,203,1320,181,1380,170.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        
        <Fast/>
     
    <div className="containe" style={{
        display:"grid",
        placeItems:"center"
    }}>
    <ContactForm/>

    </div> 
    <div style={{marginTop:"100px"}}>
    <svg    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e7008a" fill-opacity="1" d="M0,96L60,85.3C120,75,240,53,360,69.3C480,85,600,139,720,170.7C840,203,960,213,1080,208C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>  
    </div>
    </>  )
}

export default MainPage;
