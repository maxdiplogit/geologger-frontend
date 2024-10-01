import RegisterForm from "./RegisterForm/RegisterForm";


const Register = () => {
    return(<div className="h-full w-full flex flex-col justify-center items-center">
        
        <div className="w-fit border rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center pb-4">Register</h1>
            <RegisterForm />
        </div>

    </div>)
}


export default Register;