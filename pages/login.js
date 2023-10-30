import { Button, Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [loginMode, setLoginMode] = useState(0)

    return (
        <div className='flex '>
            <div className={`w-full  mx-auto `}>
                <div className='bg-white rounded-md lg:p-10 p-4 flex min-h-[100vh] items-center flex-col justify-center gap-4'>
                    <div className='w-full'>
                        <img src='/images/logo-dark.png' className='float-left max-h-[2rem]' onClick={() => setLoginMode("login")} />
                    </div>
                    <p className='font-semibold text-2xl'>Welcome Back</p>
                    <div className='w-full'>
                        <Label>Email</Label>
                        <input
                            disabled={isLoading}
                            value={data?.email}
                            onChange={e => setData({ ...data, email: e.target.value })}
                            type='email'
                            className='
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                        />
                    </div>
                    <div className='w-full'>
                        <Label>Password</Label>
                        <input
                            disabled={isLoading}
                            value={data?.password}
                            onChange={e => setData({ ...data, password: e.target.value })}
                            type='password'
                            className='
              bg-zinc-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                        />
                    </div>
                    <p className='text-left w-full underline' onClick={() => setLoginMode("forgot")}>Forgot Password?</p>
                    <Button color="failure" className='w-full'>Sign In</Button>
                    <p className='text-center ' onClick={() => setLoginMode("register")}>Don't have an account? <span className='underline cursor-pointer'>Create Account</span></p>
                </div>

            </div>
            <div className={`w-full h-[100vh] lg:relative ${loginMode == "admin-login" && "hidden"} lg:block hidden`}>
                <img src="/images/about1.png" className='w-full h-full object-cover' />
                <img onClick={() => setLoginMode("admin-login")} className='absolute bottom-10 right-10 max-h-[2rem]' src='/images/logo-dark.png' />
            </div>
        </div>
    )
}

export default Login