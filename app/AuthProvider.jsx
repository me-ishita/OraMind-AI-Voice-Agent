"user client"
import { useUser } from '@stackframe/stack'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function AuthProvider({children}) {

    const user = useUser();
    const CreateUser = useMutation(api.users.CreateUser);
    const [userData, setUSerData] = useState();

    useEffect(() => {
        console.log(user)
        user && CreateNewUser();
    }, [user]) 

    const CreateNewUser = async() => {
        const result = await CreateUser({
            name: user?.displayName,
            email: user.primaryEmail
        });
        console.log(result);
        setUserData(result);
    }

  return (
    <div>
        <UserContext.Provider value={{userData, setUSerData}}>
            {children}
        </UserContext.Provider>
        
    </div>
  )
}

export default AuthProvider