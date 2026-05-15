import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import fetchLogin from "../api/auth";
import getUserRole from "../utils/GetUserRole";

function Login(){
    const [enrollNumber, setEnrollNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        if(errorMessage){
            const timer = setTimeout(() =>{
                setErrorMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleLogin = async (e) =>{
        e.preventDefault();

        setErrorMessage('');

        try{
            await fetchLogin(enrollNumber, password)

            const role = getUserRole();

            switch(role){
                case 'Admin':
                    navigate("/admin/home");
                    break;
                case 'Employee':
                    navigate("/employee/home");
                    break;
                case 'HR':
                    navigate("/hr/home");
                    break;
                case 'Supervisor':
                    navigate("/supervisor/home");
                    break; 
                case 'Manager':
                    navigate("/manager/home");
                    break;
                default:
                    navigate('/');
                    break;
            }

        }catch(error){
            setErrorMessage(error.message);
        }
    }

    return(
        <div className="w-full min-h-screen m-0 p-0 flex items-center justify-center bg-taupe-100">
            <form className="login-container w-100 h-100 rounded-lg shadow-xl border-1 border-gray-200 bg-white flex 
            flex-col items-center gap-5" onSubmit={handleLogin}>

                <h1 className="text-3xl mt-5 mb-9 font-medium">LOGIN</h1>

                <div className="enrollNumber-label-input flex flex-col gap-2">

                    <label>Enroll Number</label>
                    <input className="border-1 border-gray-300 rounded-md box-border h-9 w-60 p-3" 
                    type="text" 
                    name="enrollNumber" 
                    placeholder="Enter enroll number" 
                    value={enrollNumber}
                    onChange={(e) => setEnrollNumber(e.target.value)}
                    required
                    />

                </div>

                <div className="password-label-input flex flex-col gap-2">

                    <label>Password</label>
                    <input className="border-1 border-gray-300 rounded-md box-border h-9 w-60 p-3" 
                    type="password" 
                    name="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                    required    
                    />

                </div>

                <div className="login-btn-container">
                    <button type="submit" className="login-btn bg-green-600 text-white w-40 h-9 rounded-md 
                    hover:bg-green-800 cursor-pointer">
                        Submit
                    </button>
                </div>

                <ErrorMessage message={errorMessage}/>
            </form>

  
                
      
        </div>
    )
}

export default Login