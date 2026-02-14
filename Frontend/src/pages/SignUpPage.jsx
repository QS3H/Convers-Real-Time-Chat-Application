import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {}
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8"></div>
      </div>
    </div>
  )
}

export default SignUpPage
