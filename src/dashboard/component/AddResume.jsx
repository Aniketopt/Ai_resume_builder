import { Loader2, LoaderIcon, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'; 
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../../service/GlobalApi'


function AddResume() {

    const [openDialog,setOpenDialog]=useState(false)
    const [resumeTitle,setResumeTitle]=useState();
    const[loading,setLoading]=useState(false);
    const {user}=useUser();
    const navigation=useNavigate();


     const onCreate=async()=>{
      setLoading(true)
        const uuid=uuidv4();
       const data={
             data:{
              title:resumeTitle,
              resumeId:uuid,
              userEmail:user?.primaryEmailAddress?.emailAddress,
              userName:user?.fullName
             }
       }

        GlobalApi.CreateNewResume(data).then(resp=>{
          console.log(resp.data.data.documentId);
          if(resp)
          {
            setLoading(false);
            navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
          }
        },(error)=>{
          setLoading(false);
        }
      )
        

       
     }

    return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transitio-all hover:shadow-md cursor-pointer' onClick={()=>setOpenDialog(true)}>

            <PlusSquare/>
        </div>
   <Dialog open={openDialog}>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
        <p>Add title for your new resume</p>
        <Input className="my-2" placeholder="Ex.Full Stack resume" onChange={(e)=>setResumeTitle(e.target.value)}/>
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button onClick={()=>setOpenDialog(false)} variant="ghost">Cancel</Button>
        <Button disabled ={!resumeTitle||loading}
         onClick={()=>onCreate()}>
          {loading?
          <Loader2 className='animate-spin'/>:'Create'
        }
          Create</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume