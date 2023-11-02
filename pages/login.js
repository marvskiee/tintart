import { Button, Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { toastOptions } from '../styles/modalOption'
import { authLogin } from '../services/auth.services'
import { hasBlankValue } from '../services/tools'
import { useAppContext } from '../context/AppContext'
import { addUser } from '../services/user.services'
import { useRouter } from 'next/router'
import { TextInput } from '../components'

const Login = () => {
    const { state, dispatch } = useAppContext();
    const initial_credentials = {
        role: 0,
        first_name: "",
        last_name: "",
        email: "",
        contact_no: "",
        password: '',
        confirm_password: '',
    }
    const [credentials, setCredentials] = useState(initial_credentials)
    const [isLoading, setIsLoading] = useState(false)
    const [loginMode, setLoginMode] = useState("login")
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault()
        const { email, password, confirm_password } = credentials
        const passwordMatch = password === confirm_password
        let hasBlank = hasBlankValue(Object.values({ email, password }))
        if (loginMode == "register") {
            console.log(credentials)
            if (!passwordMatch)
                return toast.error('Password Mismatch!', toastOptions)
        }

        if (hasBlank) return toast.error('Please enter valid values!', toastOptions)

        setIsLoading(true)
        //do something else
        setTimeout(async () => {
            if (["login", "admin-login"].indexOf(loginMode) > -1) {
                const { success, errors, data } = await authLogin(credentials)
                if (!success) {
                    console.log(errors)
                    toast.error('Wrong email or password, Please try again!', toastOptions)
                    setIsLoading(false)
                } else {
                    console.log(data)
                    let path = (([0, 1].indexOf(data.role) > -1 && loginMode == "login") ? "/" :
                        (data.role == 2 && loginMode == "admin-login") && "/admin/dashboard")
                    router.push(path)
                    toast.success('Login Succesfuly!', toastOptions)
                    dispatch({ type: 'LOGIN_SUCCESS', value: data })
                }

            } else if (loginMode == "register") {
                const { success, errors } = await addUser(credentials)
                if (await success) {
                    setCredentials(initial_credentials)
                    setLoginMode("login")
                    toast.success(`Registered successfuly!`, toastOptions)
                } else {
                    console.log(errors)
                    toast.error(errors || 'Something went wrong!', toastOptions)
                }
                setIsLoading(false)
            }

        }, 1000);
    }
    const fields = [
        {
            label: 'First Name',
            name: 'first_name',
            value: credentials?.first_name,
            setValue: e => setCredentials({ ...credentials, first_name: e.target.value }),
            type: "text",
            formType: ["register"]
        },
        {
            label: 'Last Name',
            name: 'last_name',
            value: credentials?.last_name,
            setValue: e => setCredentials({ ...credentials, last_name: e.target.value }),
            type: "text",
            formType: ["register"]
        },
        {
            label: 'Email',
            name: 'email',
            value: credentials?.email,
            setValue: e => setCredentials({ ...credentials, email: e.target.value }),
            type: "email",
            formType: ["login", "admin-login", "register"]
        },
        {
            label: 'Contact No.',
            name: 'contact',
            value: credentials?.contact_no,
            setValue: e => setCredentials({ ...credentials, contact_no: e.target.value }),
            type: "number",
            formType: ["register"]
        },
        {
            label: 'Password',
            name: 'password',
            value: credentials?.password,
            setValue: e => setCredentials({ ...credentials, password: e.target.value }),
            type: "password",
            formType: ["login", "admin-login", "register"]
        },
        {
            label: 'Confirm Password',
            name: 'confirm_password',
            value: credentials?.confirm_password,
            setValue: e => setCredentials({ ...credentials, confirm_password: e.target.value }),
            type: "password",
            formType: ["register"]
        },
    ]
    const filterFields = fields.filter((item) => item?.formType.indexOf(loginMode) > -1)

    return (
        <div className='flex '>
            <div className={`w-full  mx-auto ${loginMode == "admin-login" && "max-w-[25rem]"}`}>
                <div className='bg-white rounded-md p-10 flex min-h-[100vh] items-center flex-col justify-center gap-4'>
                    <img src='/images/logo-dark.png' className=' max-h-[2rem]' onClick={() => setLoginMode("login")} />
                    <p className='font-semibold text-2xl'>{loginMode == "register" ? "Create account" : "Welcome Back"}</p>
                    <div className={`grid grid-cols-1 ${loginMode == "register" && "lg:grid-cols-2"} w-full gap-4`}>
                        {filterFields.map((item, key) => (
                            <div key={'login-' + key} className='col-span-1'>
                                <Label className=''>{item.label}</Label>
                                <TextInput
                                    disabled={isLoading}
                                    value={item?.value}
                                    onChange={e => item?.setValue(e)}
                                    type={item?.type}
                                />
                            </div>
                        ))}
                    </div>
                    {loginMode == "login" &&
                        <p className='text-left w-full underline' onClick={() => setLoginMode("forgot")}>Forgot Password?</p>
                    }
                    <Button disabled={isLoading} color="failure" className='w-full' onClick={submitHandler}>{!isLoading ? "Sign In" : "Signing In..."}</Button>
                    {loginMode == "login" ?
                        <p className='text-center ' onClick={() => setLoginMode("register")}>Don't have an account? <span className='underline cursor-pointer'>Create Account</span></p>
                        : loginMode == "register" &&
                        <p className='text-center ' onClick={() => setLoginMode("login")}>Already have an account? <span className='underline cursor-pointer'>Click here</span></p>
                    }
                </div>

            </div>
            <div className={`w-full h-[100vh] lg:relative  ${loginMode == "admin-login" ? "hidden" : "lg:block hidden"} `}>
                <img src="/images/about1.png" className='w-full h-full object-cover' />
                <img onClick={() => setLoginMode("admin-login")} className='absolute bottom-10 right-10 max-h-[2rem]' src='/images/logo-dark.png' />
            </div>
        </div>
    )
}

export default Login