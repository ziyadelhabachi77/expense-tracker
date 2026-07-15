import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../config/app";
import { useLogin } from "../hooks";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // ============ local state ==========
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isUserSubmit, setIsUserSubmit] = useState(false);

  // ============ login hook ========
  const { loginMutation, isPending } = useLogin();

  // login
  const handleLoginUser = (e) => {
    e.preventDefault();
    setIsUserSubmit(true);
    for (const value of Object.values(formData)) {
      if (value === "" || value == null) return;
    }
    loginMutation(formData, {
      onSuccess: () => {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      },
      onError:(error) => {
        toast.error(error?.response?.data?.message)
      }
    });

  };
  return (
    <div className="w-full max-w-100">
      <div className="flex items-center color-text-main gap-1 font-semibold justify-center py-4">
        <span>
          <Wallet strokeWidth={3} />
        </span>
        <span className="text-lg">{APP_CONFIG.name}</span>
      </div>
      <div className="bg-white rounded-md p-3 shadow-ld ring ring-gray-300">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Welcom Back</h1>
        </div>
        <form className="mt-5" onSubmit={handleLoginUser}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <p className="text-xs mt-1 text-red-500">
                {formData.email === "" && isUserSubmit
                  ? "Email is required"
                  : ""}
              </p>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <p className="text-xs mt-1 text-red-500">
                {formData.password === "" && isUserSubmit
                  ? "Password is required"
                  : ""}
              </p>
            </div>

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Log in..." : "Log in"}
            </Button>
          </div>
        </form>
        <div className="text-center py-3 mt-1">
          <p className="text-sm text-gray-500">
            You don't have an account?
            <button
              onClick={() => navigate("/register")}
              className="color-text-main font-semibold cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
