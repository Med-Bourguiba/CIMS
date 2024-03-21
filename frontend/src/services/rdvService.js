import axios from 'axios'

const RdvService = {}


RdvService.signIn = function(data){
    return axios.post('http://localhost:5000/rdvs/signin' , data)

}

RdvService.sendOTP = function(data){
    return axios.post('http://localhost:5000/rdvs/sendOtp' , data)
    
}

RdvService.verifyOTP = function(data){
    return axios.post('http://localhost:5000/rdvs/verifyOTP' , data)
    
}


export default RdvService;