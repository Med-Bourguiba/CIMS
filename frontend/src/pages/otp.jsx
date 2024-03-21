import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import RdvService from '../services/rdvService';

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await RdvService.verifyOTP(otp);
      console.log('response ==>', response);

      if (response.data.success) {
        navigate('/fiche_inscri');
      } else {
        Swal.fire({
          title: 'Erreur!',
          text: 'Code OTP incorrect',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Une erreur s\'est produite lors de la vérification du code OTP.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='body-otp'>
     
      <div className="container-otp">
      <h1 className='title-otp'> Vérification OTP</h1>
      <form onSubmit={handleOtpVerification}>
      <div className="input-container-otp">
        <div className='otp-icon'>
        <img className='otp-img' src='one-time-password.png' alt=''/>
        <label className="label-otp">Code OTP :</label>
        </div>
        <input
          className="input-otp "
          placeholder='Insérez votre code de vérification SMS'
          type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <button className="button-otp"type="submit">
        Vérifier le code 
      </button>
     
      </form>
      
    </div>
   
    </div>
);

}

export default Otp;