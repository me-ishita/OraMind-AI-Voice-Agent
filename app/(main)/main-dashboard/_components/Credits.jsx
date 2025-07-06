import { UserContext } from '@/app/_context/UserContext'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@stackframe/stack';
import { Wallet2 } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react'

function Credits() {
    const user = useUser();

  return (
    <div>
        <div className='flex gap-5 items-center'>
            <Image src={user?.profileImageUrl} width={60} height={60} alt="User avatar"
            className='rounded-full'/>
            <div>
                <h2 className='text-lg font-bold text-blue-900'>{user?.displayName}</h2>
                <h2 className='text-gray-700'>{user?.primaryEmail}</h2>
            </div>
        </div>
        <hr className='my-3'></hr>
        <div>
            <h2 className='font-bold'>Token Usage</h2>
            <h2>{30000}/50000</h2>
            <Progress value={53} className='my-3'/>
            <div className='flex justify-between items-center mt-3'>
                <h2 className='font-bold'>Current Plan</h2>
                <h2 className='p-1 bg-secondary rounded-b-lg px-2'>Free Plan</h2>
            </div>

            <div className='mt-5 p-5 border rounded-2xl'>
                <div className='flex justify-between'>
                    <div>
                        <h2 className='font-bold'>Pro Plan</h2>
                        <h2>50,000 Tokens</h2>
                    </div>
                    <h2 className='font-bold'>$10/Month</h2>
                </div>
                <hr className='my-3'/>
                <Button className='w-full'> <Wallet2/> Upgrade $10 </Button>
            </div>
        </div>
    </div>
  )
}

export default Credits