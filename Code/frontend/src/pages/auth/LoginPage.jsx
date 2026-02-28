import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../api/auth.api";
import { authStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email aur password required hain");
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.login(form.email, form.password);

      // Check if login successful
      if (res.data.success) {
        const {
          access_token,
          refresh_token,
          role,
          user_id,
          full_name,
          profile_picture_url,
        } = res.data.data;

        // profile_picture_url bhi store karo
        const user = {
          id: user_id,
          role,
          full_name,
          email: form.email,
          profile_picture_url,
        };

        authStore.setAuth(access_token, refresh_token, user);
        toast.success(`Welcome, ${full_name}!`);

        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "teacher") navigate("/teacher/dashboard");
        else navigate("/student/dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email, password) => {
    setForm({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/30">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            BZU Smart LMS
          </h1>
          <p className="text-blue-300/70 mt-1 text-sm">
            Bahauddin Zakariya University — Multan
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-xl mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-blue-200/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="your@bzu.edu.pk"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-blue-200/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/30 text-xs text-center mb-3">
              Quick Login (Testing)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  label: "Admin",
                  email: "admin@bzu.edu.pk",
                  pass: "Admin@123",
                  color:
                    "bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border-purple-500/20",
                },
                {
                  label: "Teacher",
                  email: "ms.ayesha@bzu.edu.pk",
                  pass: "Teacher@123",
                  color:
                    "bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border-emerald-500/20",
                },
                {
                  label: "Student",
                  email: "ali.hassan@student.bzu.edu.pk",
                  pass: "Student@123",
                  color:
                    "bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border-blue-500/20",
                },
              ].map(({ label, email, pass, color }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => quickLogin(email, pass)}
                  className={`${color} border text-xs font-medium py-2 rounded-lg transition-all duration-200`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          AI-Driven Smart LMS — Sarfraz RBSIT-21-13
        </p>
      </div>
    </div>
  );
}
