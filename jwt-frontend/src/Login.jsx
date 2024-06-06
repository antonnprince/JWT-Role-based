import React, { useState } from 'react'

const Login = () => {
    
    const [email,setEmail]=useState("")
    const [pass,setPassword] = useState("")
    return (
    <div className='flex-col items-center text-center'>
        <h2>
            Enter email 
        </h2>
        <input className='w-65 p-1 rounded-lg  bg-zinc-200' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <h2>
            Enter password
        </h2>
        <input className='w-65 p-1 rounded-lg bg-zinc-200' type='password' value={pass} onChange={e=>setPassword(e.target.value)} />
    </div>
  )
}

export default Login