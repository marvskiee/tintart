import React, { useRef, useState } from 'react'
import { generateCode, hasBlankValue, isValidPassword } from '../services/tools'
import { toastOptions } from '../styles/modalOption'
import { Button, Label } from 'flowbite-react'
import { PasswordInput, TextInput } from '../components'
import useCountdown from '../hooks/useCountdown'
import { changePassword, recoveryPassword, updateUserByEmail, validateCode } from '../services/user.services'
import toast from 'react-hot-toast'
import { sendMessage } from '../services/email.services'
import DATA from '../utils/DATA'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
    const { seconds, start, isRunning } = useCountdown(2, () => {
        console.log('Countdown reached zero!');
    });
    const [isLoading, setIsLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [nextPage, setNextPage] = useState(false)
    const [formData, setFormData] = useState({
        recovery_code: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const userRef = useRef()
    const codeRef = useRef()
    const requestCodeHandler = async () => {
        start()
        codeRef.current = generateCode()
        const result = await updateUserByEmail({
            recovery_code: codeRef.current
        }, formData?.email)
        if (result?.success) {
            const user = result?.data
            userRef.current = user
            let { SUBJECT, BODY } = DATA.EMAILS.PASSWORD
            sendMessage({
                email: formData?.email,
                subject: SUBJECT,
                text: BODY({ name: user?.first_name + " " + user?.last_name, code: codeRef.current })
            }
            )
            toast.success("Recovery code has been sent to your email", toastOptions)
        } else {
            toast.error("Email is not registered!", toastOptions)
        }
    }
    const submitHandler = async () => {

        let { recovery_code,
            email } = formData
        const hasBlank = hasBlankValue(Object.values({
            recovery_code,
            email
        }))
        if (hasBlank)
            return toast.error('Please fill up the form!', toastOptions)
        setIsLoading(true)
        const result = await validateCode({ recovery_code: formData?.recovery_code, email: formData?.email })
        setIsLoading(false)
        if (!result?.data) {
            return toast.error('Invalid Code!', toastOptions)
        }
        const user = result?.data
        userRef.current = user
        setNextPage(true)
    }
    const router = useRouter()
    const saveChangesHandler = async () => {
        let { password,
            confirm_password } = formData
        const passwordValidation = isValidPassword(password)

        if (!passwordValidation)
            return toast.error('Your password must be at least 16 characters long and contain alphanumeric and special characters.', toastOptions)

        const hasBlank = hasBlankValue(Object.values({
            password,
            confirm_password
        }))
        if (hasBlank)
            return toast.error('Please fill up the form!', toastOptions)
        if (password != confirm_password)
            return toast.error('Password mismatch!', toastOptions)

       
        const result = await recoveryPassword({ password: formData.password }, userRef.current?._id)
        if (result?.success) {
            // generate again the code so it cannot be reused
            let newCode = generateCode()
            updateUserByEmail({
                recovery_code: newCode,
            }, formData?.email)

            setDisabled(true)
            toast.success("Password changed successfuly.", toastOptions)
            router.push("login")
        } else {
            toast.error("Something went wrong!.", toastOptions)
        }
    }


    return (
        <div className='flex items-center justify-center h-screen p-4'>
            {!nextPage ?
                <div className='border shadow-md min-w-full sm:min-w-[30rem] p-6 rounded-md flex flex-col gap-4'>
                    <p className=' text-center text-xl font-semibold'>Forgot Password</p>
                    <div >
                        <Label>Email:</Label>
                        <TextInput
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            type="text"
                        />
                    </div>
                    <Button
                        color="light"
                        className='w-full'
                        onClick={requestCodeHandler} disabled={isRunning}>{seconds == 0 || !isRunning ? "Send Code" : `[${seconds}]`}
                    </Button>
                    <div >
                        <Label>Recovery Code:</Label>
                        <TextInput
                            value={formData.recovery_code}
                            onChange={e => setFormData({ ...formData, recovery_code: e.target.value })}
                            type="text"
                        />
                    </div>
                    <Button className='w-full' disabled={isLoading} onClick={submitHandler}>Submit</Button>
                </div> :
                <div className='border shadow-md min-w-full sm:min-w-[30rem] p-6 rounded-md flex flex-col gap-4'>
                    <p className=' text-center text-xl font-semibold'>Forgot Password</p>
                    <div >
                        <Label>New Password: </Label>
                        <PasswordInput
                            value={formData.password}
                            setValue={e => setFormData({ ...formData, password: e.target.value })}
                            isLoading={disabled}

                        />
                    </div>
                    <div >
                        <Label>Confirm Password:</Label>
                        <PasswordInput
                            value={formData.confirm_password}
                            setValue={e => setFormData({ ...formData, confirm_password: e.target.value })}
                            isLoading={disabled}

                        />
                    </div>
                    <Button className='w-full' disabled={disabled} onClick={saveChangesHandler}>Submit</Button>
                </div>
            }
        </div>
    )
}

export default ForgotPassword