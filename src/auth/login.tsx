import React, { useState, useContext, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DispatchContext } from '../store/app-context.js'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../services/auth.js'
import { SNACKBAR_OPEN } from '../reducers/index.jsx'
import loginBackground from '../assets/logo.png';
import logoImage from '../assets/logo1.png';

const loginSchema = z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(1, 'Password is required')
})

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email')
})

const Login = () => {
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showForgotModal, setShowForgotModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const containerRef = useRef(null)
    const dispatch = useContext(DispatchContext)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsActive(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const {
        register: registerForgot,
        handleSubmit: handleForgotSubmit,
        formState: { errors: forgotErrors }
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const onLoginSubmit = async (values: { email: string; password: string }) => {
        setLoading(true)
        try {
            const response = await authApi.login(values.email, values.password)

            // Store tokens
            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('refresh_token', response.refresh)
            localStorage.setItem('token', JSON.stringify({ token: response.token }))
            localStorage.setItem('user', JSON.stringify(response.user))

            if (response.user.is_staff) {
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        ...response.user,
                        token: response.token,
                        authenticated: true
                    }
                })
                dispatch({
                    type: SNACKBAR_OPEN,
                    payload: {
                        isNotify: true,
                        severity: "success",
                        message: "Login successful",
                    },
                })
                navigate("/admin/home")
            } else {
                throw new Error('Not authorized')
            }
        } catch (err) {
            dispatch({
                type: SNACKBAR_OPEN,
                payload: {
                    isNotify: true,
                    severity: "error",
                    message: err instanceof Error ? err.message : "Incorrect email or password",
                },
            })
        } finally {
            setLoading(false)
        }
    }

    const onForgotPasswordSubmit = async (values) => {
        setLoading(true)
        try {
            dispatch({
                type: SNACKBAR_OPEN,
                payload: {
                    isNotify: true,
                    severity: "success",
                    message: "Password reset link sent to your email",
                },
            })
            setIsActive(false)
        } catch {
            dispatch({
                type: SNACKBAR_OPEN,
                payload: {
                    isNotify: true,
                    severity: "error",
                    message: "Failed to send reset link",
                },
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen p-5"
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div
                ref={containerRef}
                className={`relative w-full max-w-[850px] h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden transition-all duration-700 ${isActive ? 'active' : ''
                    }`}
            >
                {/* LOGIN FORM */}
                <div
                    className={`absolute top-0 right-0 sm:w-1/2 w-full h-full flex items-center justify-center p-10 bg-white z-10 transition-all duration-700 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="w-full text-center">
                        <img src={logoImage} alt="logo" className="w-20 h-30 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                        <h6 className="text-lg font-regular text-gray-400 mb-6">Please Login to continue</h6>

                        <div className="mb-8 text-left">
                            <div className="flex items-end gap-3 pb-2 border-b-2 border-gray-300">
                                <i className="bx bxs-envelope text-2xl text-gray-600"></i>
                                <div className="flex-1">
                                    <label className="text-gray-600 text-sm">Email <span className="text-red-500">*</span></label>
                                    <input
                                        {...registerLogin('email')}
                                        type="email"
                                        autoComplete="email"
                                        placeholder=""
                                        className="w-full bg-transparent outline-none text-gray-800 text-lg"
                                    />
                                </div>
                            </div>
                            {loginErrors.email && (
                                <p className="text-red-500 text-xs mt-2">{String(loginErrors.email.message)}</p>
                            )}
                        </div>

                        <div className="mb-8 text-left">
                            <div className="flex items-end gap-3 pb-2 border-b-2 border-gray-300">
                                <i className="bx bxs-lock-alt text-2xl text-gray-600"></i>
                                <div className="flex-1">
                                    <label className="text-gray-600 text-sm">Password <span className="text-red-500">*</span></label>
                                    <input
                                        {...registerLogin('password')}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder=""
                                        autoComplete="current-password"
                                        className="w-full bg-transparent outline-none text-gray-800 text-lg"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    {showPassword ? (
                                        <i className="bx bx-show text-2xl"></i>
                                    ) : (
                                        <i className="bx bx-hide text-2xl"></i>
                                    )}
                                </button>
                            </div>
                            {loginErrors.password && (
                                <p className="text-red-500 text-xs mt-2">{String(loginErrors.password.message)}</p>
                            )}
                        </div>

                        <div className="mb-6 sm:hidden">
                            <button
                                type="button"
                                onClick={() => setShowForgotModal(true)}
                                className="text-gray-600 text-sm hover:text-gray-800 transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors mb-4"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>

                {/* FORGOT PASSWORD FORM */}
                <div
                    className={`hidden sm:flex absolute top-0 left-0 w-1/2 h-full items-center justify-center p-10 bg-white text-center z-10 transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <form onSubmit={handleForgotSubmit(onForgotPasswordSubmit)} className="w-full">
                        <h1 className="text-4xl font-bold mb-6">Forgot Password?</h1>

                        <p className="text-gray-600 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>

                        <div className="relative mb-6">
                            <input
                                {...registerForgot('email')}
                                type="email"
                                placeholder="Email"
                                className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 placeholder-gray-500"
                            />
                            <i className="bx bxs-envelope absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            {forgotErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{String(forgotErrors.email.message)}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>

                {/* TOGGLE BACKGROUND */}
                <div
                    className={`hidden sm:block absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 z-20 ${isActive ? 'translate-x-full' : 'translate-x-0'
                        }`}
                ></div>

                {/* TOGGLE PANELS - Hidden on mobile */}
                <div
                    className={`hidden sm:flex absolute top-0 left-0 w-1/2 h-full flex-col items-center justify-center text-white z-20 transition-all duration-700 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <h1 className="text-3xl font-bold mb-4">Forgot Password?</h1>
                    <p className="text-sm mb-6">Need to reset your password?</p>
                    <button
                        onClick={() => setIsActive(true)}
                        className="px-8 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors"
                    >
                        Forgot Password?
                    </button>
                </div>

                <div
                    className={`hidden sm:flex absolute top-0 right-0 w-1/2 h-full flex-col items-center justify-center text-white z-20 transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <h1 className="text-3xl font-bold mb-4">Back to Login</h1>
                    <p className="text-sm mb-6">Remember your password?</p>
                    <button
                        onClick={() => setIsActive(false)}
                        className="px-8 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-colors"
                    >
                        Login
                    </button>
                </div>

                {/* FORGOT PASSWORD MODAL - Mobile only */}
                {showForgotModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
                        <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Reset Password</h2>
                            <p className="text-gray-600 text-sm mb-6">Enter your email address and we'll send you a link to reset your password.</p>

                            <form onSubmit={handleForgotSubmit(onForgotPasswordSubmit)}>
                                <div className="relative mb-6">
                                    <input
                                        {...registerForgot('email')}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-5 py-3 bg-gray-100 rounded-lg border-none outline-none text-gray-800 placeholder-gray-500"
                                    />
                                    <i className="bx bxs-envelope absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    {forgotErrors.email && (
                                        <p className="text-red-500 text-xs mt-1">{String(forgotErrors.email.message)}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors mb-3"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowForgotModal(false)}
                                    className="w-full h-12 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login
