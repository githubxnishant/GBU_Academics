import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const res = await axios.post(
                `${server}/login`,
                { username, password },
            );
            if(!res){return toast.error("Invalid Credentials!")}
            localStorage.setItem("token", res.data.token);
            toast.success("Login Succesfully. Redirecting to Dashboard!")
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.log(err)
            toast.error("Error in login process!")
            setError(err.response?.data?.message || "Login failed");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex flex-col items-center mb-4">
                    <img
                        src="/Images/gbu_logo.png"
                        alt="University Logo"
                        className="h-16 mb-2"
                    />
                    <h2 className="text-2xl mb-3 font-semibold">Login</h2>
                    <p className="text-gray-500 text-sm">Sign in to continue to Admin Dashboard</p>
                </div>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                {/* <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p> */}

                <p className="text-center text-sm mt-4">
                    Contact Admin - <a href="https://nishantchauhan.me/" target="_blank" className="text-blue-500 hover:underline">Nishant Chauhan</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
