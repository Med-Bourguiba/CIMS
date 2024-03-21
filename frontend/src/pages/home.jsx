import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import RdvService from '../services/rdvService';

const HomePage = () => {
  const navigate = useNavigate();
  const [NUM_RDV, setNUM_RDV] = useState('');
  const [COD_BENEF, setCOD_BENEF] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  const login = async (e) => {
    e.preventDefault();

    if (!NUM_RDV || !COD_BENEF || !selectedHospital) {
      Swal.fire({
        position: 'top',
        title: 'Index, Num RDV et choix de l\'hôpital sont obligatoires !',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      NUM_RDV: NUM_RDV,
      COD_BENEF: COD_BENEF,
      selectedHospital: selectedHospital 
    };

   

    try {
      const response = await RdvService.signIn(data);
      console.log('response ==>', response);
      

      const otpCode = generateOTP();

      const data2 = {
        GSM: response.data.rdv.GSM,
        otpCode: otpCode
      }
      console.log(otpCode);
      const otpResponse = await RdvService.sendOTP(data2);
      console.log('OTP Response:', otpResponse);

      localStorage.setItem('rdv_data', JSON.stringify(response.data.rdv));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('selectedHospital', selectedHospital); 

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: '',
        showConfirmButton: false,
        timer: 2000
      });

      setNUM_RDV('');
      setCOD_BENEF('');

      navigate('/otp');

    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message;
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  return (
      <div>
          <section id="header">
        <div className="header container">
        <div className="nav-bar">
            <div className="brand">
            <a href="#hero">
                <div className='title-logo'>
            <img className='logo1' src='logo.jpg' alt=''/>
            <h1><span>C</span>im<span>s</span> la santé pour tous</h1>
            </div>
            
          </a>
        </div>
        <div className="nav-list">
          <div className="hamburger">
            <div className="bar"></div>
          </div>
          <ul>
            <li><a href="#hero" data-after="Home">Home</a></li>
            <li><a href="#services" data-after="Service">Services</a></li>
            <li><a href="#projects" data-after="Projects">aide</a></li>
            <li><a href="#contact" data-after="Contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
            <section id="hero">
    <div className="hero container">
      <div className='form-discription'>


      <div>
      <h1>Bonjour, <span></span></h1>
        <h1>Avez vous<span></span></h1>
        <h1>un rendez-vous? <span></span></h1>
        <a href="#projects" type="button" className="cta">Besoin d'aide ?</a>
      </div>
       


        
        <div className='register'>
            <div className='register-content'>
        
 
                    <p className='sous-titre'>Inserer vos cordonnées</p>
                

                <div className='form-container-home'>
                    <form onSubmit={login}>
                    <div className='form-group'>
                        
                    <label>Hopital<span style={{ color: 'red' }}>*</span></label>
                      <select className='option' defaultValue=""  onChange={(e)=>setSelectedHospital(e.target.value)}>
                          <option disabled value="">Choisissez l'hôpital</option>
                          <option>Hopital Charles Nicole</option>
                          <option>Hopital Rabta</option>
                          <option>Hopital Militaire</option>
                          <option>Hopital Erazzi</option>
                      </select>
                        
                    </div>

                        <div className='form-group'>
                        
                            <label>Num RDV<span style={{ color: 'red' }}>*</span></label>
                            <input className='input' placeholder='entrer votre numero du rendez-vous' type="text" value={NUM_RDV} onChange={(e)=>setNUM_RDV(e.target.value)}/>
                            
                        </div>

                        

                        <div className='form-group'>
                            <label>Index<span style={{ color: 'red' }}>*</span></label>
                            <input className='input' placeholder='entrer votre index' type="password" value={COD_BENEF} onChange={(e)=>setCOD_BENEF(e.target.value)}/>
                
                        </div>

                    

                        <button className='btn' type='submit'>Connection</button>
                    </form>
                </div>
             
         </div> 

     </div>
      </div>
    </div>
  </section>

  {/*<section id="services">
    <div class="services container">
      <div class="service-top">
        <h1 class="section-title">Serv<span>i</span>ces</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum deleniti maiores pariatur assumenda quas
          magni et, doloribus quod voluptate quasi molestiae magnam officiis dolorum, dolor provident atque molestias
          voluptatum explicabo!</p>
      </div>
      <div class="service-bottom">
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>Web Design</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis debitis rerum, magni voluptatem sed
            architecto placeat beatae tenetur officia quod</p>
        </div>
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>Web Design</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis debitis rerum, magni voluptatem sed
            architecto placeat beatae tenetur officia quod</p>
        </div>
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>Web Design</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis debitis rerum, magni voluptatem sed
            architecto placeat beatae tenetur officia quod</p>
        </div>
        <div class="service-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/services.png" /></div>
          <h2>Web Design</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis debitis rerum, magni voluptatem sed
            architecto placeat beatae tenetur officia quod</p>
        </div>
      </div>
    </div>
  </section>
 
  <section id="projects">
    <div class="projects container">
      <div class="projects-header">
        <h1 class="section-title">Bienvenue <span>au Centre d'Assistance</span></h1>
      </div>
      <div class="all-projects">
        <div class="project-item">
          <div class="project-info">
            <h1>FAQ sur la consultation en ligne des rendez-vous</h1>
            <h2>Vous avez des questions sur la manière de prendre des rendez-vous en ligne ?</h2>
            <p>Consultez notre FAQ détaillée pour obtenir des réponses à toutes vos interrogations.
               Nous avons rassemblé 
              les questions les plus fréquemment posées par nos utilisateurs et y avons apporté des réponses claires
               et concises pour vous aider à tirer le meilleur parti de notre système de consultation en ligne des rendez-vous. 
               Que vous souhaitiez savoir comment accéder au calendrier des disponibilités, comment modifier ou annuler un rendez-vous existant,
                ou tout 
              simplement comment naviguer sur notre plateforme, vous trouverez toutes les réponses dont vous avez besoin ici.</p>
          </div>
          <div class="project-img">
            <img src="img-1.png" alt="img"/>
          </div>
        </div>
        <div class="project-item">
          <div class="project-info">
            <h1>Project 2</h1>
            <h2>Coding is Love</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto cupiditate voluptatum impedit unde
              rem ipsa distinctio illum quae mollitia ut, accusantium eius odio ducimus illo neque atque libero non sunt
              harum? Ipsum repellat animi, fugit architecto voluptatum odit et!</p>
          </div>
          <div class="project-img">
            <img src="img-1.png" alt="img"/>
          </div>
        </div>
        <div class="project-item">
          <div class="project-info">
            <h1>Project 3</h1>
            <h2>Coding is Love</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto cupiditate voluptatum impedit unde
              rem ipsa distinctio illum quae mollitia ut, accusantium eius odio ducimus illo neque atque libero non sunt
              harum? Ipsum repellat animi, fugit architecto voluptatum odit et!</p>
          </div>
          <div class="project-img">
            <img src="img-1.png" alt="img"/>
          </div>
        </div>
        <div class="project-item">
          <div class="project-info">
            <h1>Project 4</h1>
            <h2>Coding is Love</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto cupiditate voluptatum impedit unde
              rem ipsa distinctio illum quae mollitia ut, accusantium eius odio ducimus illo neque atque libero non sunt
              harum? Ipsum repellat animi, fugit architecto voluptatum odit et!</p>
          </div>
          <div class="project-img">
            <img src="img-1.png" alt="img"/>
          </div>
        </div>
        <div class="project-item">
          <div class="project-info">
            <h1>Project 5</h1>
            <h2>Coding is Love</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto cupiditate voluptatum impedit unde
              rem ipsa distinctio illum quae mollitia ut, accusantium eius odio ducimus illo neque atque libero non sunt
              harum? Ipsum repellat animi, fugit architecto voluptatum odit et!</p>
          </div>
          <div class="project-img">
            <img src="img-1.png" alt="img"/>
          </div>
        </div>
      </div>
    </div>
  </section>
  

 
  <section id="contact">
    <div class="contact container">
      <div>
        <h1 class="section-title">Contact <span>info</span></h1>
      </div>
      <div class="contact-items">
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/phone.png" /></div>
          <div class="contact-info">
            <h1>Phone</h1>
            <h2>+1 234 123 1234</h2>
            <h2>+1 234 123 1234</h2>
          </div>
        </div>
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/new-post.png" /></div>
          <div class="contact-info">
            <h1>Email</h1>
            <h2>info@gmail.com</h2>
            <h2>abcd@gmail.com</h2>
          </div>
        </div>
        <div class="contact-item">
          <div class="icon"><img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" /></div>
          <div class="contact-info">
            <h1>Address</h1>
            <h2>Fatikchhari, Chittagong, Bangladesh</h2>
          </div>
        </div>
      </div>
    </div>
  </section>*/}
  
  <section id="footer">
    <div className="footer container">
      <div className="brand">
        <h1><span>C</span>IM<span>S</span></h1>
      </div>
      
      <div className="social-icon">
        <div className="social-item">
          <a href="#"><img src="https://img.icons8.com/bubbles/100/000000/facebook-new.png" alt=''/></a>
        </div>
        <div className="social-item">
          <a><img src="https://img.icons8.com/bubbles/100/000000/instagram-new.png" alt=''/></a>
        </div>
        <div className="social-item">
          <a><img src="icons_twitter-.png" alt=''/></a>
        </div>
        <div className="social-item">
          <a><img src="https://img.icons8.com/bubbles/100/000000/behance.png" alt=''/></a>
        </div>
      </div>
      <p>Copyright © 2024 CIMS. All rights reserved</p>
    </div>
  </section>
  
      </div>
    
    
    






















  
  );
};

export default HomePage;
