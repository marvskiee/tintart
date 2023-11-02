import React from 'react'
import { CustomerLayout, CustomerWrapper } from '../../components'

const ProfileEdit = () => {
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <p className='font-semibold text-2xl'>Edit Profile</p>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default ProfileEdit