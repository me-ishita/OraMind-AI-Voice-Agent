import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { CoachingExpert } from '@/services/Options'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

function UserInputDialog({ children, coachingOption }) {
    const [selectedExpert, setselectedExpert] = useState();
    const [topic, setTopic] = useState();
    const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();

    const OnClickNext = async() => {
        setLoading(true);
        const result = await createDiscussionRoom({
            topic : topic,
            coachingOption : coachingOption?.name,
            expertName:selectedExpert
        })
        console.log(result);
        setLoading(false);
        setOpenDialog(false);
        router.push('/discussion-room/' + result)
    }

    return (
        <Dialog open = {openDialog} onOpenChange = {setOpenDialog}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="rounded-3xl p-6 shadow-2xl"
                style={{
                    background: 'linear-gradient(to bottom right, #ffffff, #f3e8ff, #ede9fe)', // soft pastel gradient
                    border: '1px solid #e5d5f9'
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-purple-900 text-2xl font-bold tracking-wide">
                        {coachingOption.name}
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-4 text-sm text-gray-700">
                            <h2 className="text-blue-900 font-medium text-base mb-3">
                                Enter a topic to enhance your skills in <span className="font-semibold">{coachingOption.name}</span>
                            </h2>

                            <Textarea
                                placeholder="Enter your topic here..."
                                className="mt-2 p-3 text-black border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-xl shadow-sm"
                                onChange = {(e) => setTopic(e.target.value)}
                            />

                            <h2 className="text-amber-900 text-md font-semibold mt-6 mb-2 drop-shadow-sm tracking-wide">
                                Choose your Master
                            </h2>

                            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-3">
                                {CoachingExpert.map((expert, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setselectedExpert(expert.name)}
                                        className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300
                      ${selectedExpert === expert.name ? 'bg-purple-100 shadow-md scale-105' : 'hover:bg-purple-50'}
                      cursor-pointer`}
                                    >
                                        <Image
                                            src={expert.avatar}
                                            alt={expert.name}
                                            width={100}
                                            height={100}
                                            className={`rounded-full h-[80px] w-[80px] object-cover border-2 transition-transform duration-300
                        ${selectedExpert === expert.name ? 'border-purple-600' : 'border-transparent hover:scale-110'}`}
                                        />
                                        <p className="text-sm mt-2 text-gray-800 font-medium text-center">{expert.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex gap-5 justify-end mt-5'>
                                <DialogClose asChild>
                                    <Button varient = {'ghost'}>Cancel</Button>
                                </DialogClose>
                                
                                <Button disabled = {(!topic || !selectedExpert || loading)} onClick = {OnClickNext}>
                                    {loading && <LoaderCircle className='animate-spin'/>}
                                    Next</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default UserInputDialog
