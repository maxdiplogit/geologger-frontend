import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
    return(
    <div className="h-full w-full flex flex-col justify-center items-center">
        
        <div className="w-fit border rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center pb-4">Login</h1>
            <LoginForm/>
        </div>

    </div>)
}

export default Login;