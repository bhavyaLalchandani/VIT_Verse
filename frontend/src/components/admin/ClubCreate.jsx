/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CLUB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleClub } from '@/redux/clubSlice'

const ClubCreate = () => {
    const navigate = useNavigate();
    // Name and Email Mandatory 
    const [clubName, setClubName] = useState();
    const [clubEmail, setClubEmail] = useState();
    const dispatch = useDispatch();

    const registerNewClub = async () => {
        if (!clubName || !clubEmail) {
            toast.error("Both Club Name and Club Email are required!");
            return;
        }
        try {
            const res = await axios.post(`${CLUB_API_END_POINT}/register`, { clubName, clubEmail }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleClub(res.data.club));
                toast.success(res.data.message);
                const clubId = res?.data?.club?._id;
                navigate(`/admin/clubs/${clubId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto text-[#141850]'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Take the 1st step and register your Club!</h1>
                    <p className='text-[#ed7966]'>Enter the details asked below! you can change these later.</p>
                </div>

                <Label>Club Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="ELA, Meraki etc."
                    onChange={(e) => setClubName(e.target.value)}
                />

                <Label>Club Email</Label> {/* New input for club email */}
                <Input
                    type="email"
                    className="my-2"
                    placeholder="example@college.ac.in"
                    onChange={(e) => setClubEmail(e.target.value)}
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/clubs")}>Cancel</Button>
                    <Button className='hover:bg-[#ed7966]' onClick={registerNewClub}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default ClubCreate