"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ExpertsList } from '@/services/Options';
import moment from 'moment';
import Image from 'next/image';
import SummeryBox from '../_components/SummeryBox';
import ChatBox from '../../discussion-room/[roomid]/_components/ChatBox';
import React from 'react';

function ViewSummery() {
  const { roomid } = useParams();
  const discussionRoom = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid });

  const GetAbstractImages = (option) => {
    const coachingOption = ExpertsList.find((item) => item.name === option);
    return coachingOption?.abstract ?? '/ab1.png';
  };

  if (!discussionRoom) return <div>Loading...</div>;

  return (
    <div className='-mt-10'>
      <div className='flex justify-between items-end'>
        <div className='flex gap-7 items-center'>
          <Image
            src={GetAbstractImages(discussionRoom.coachingOption)}
            alt='abstract'
            width={100}
            height={100}
            className='w-[70px] h-[70px] rounded-full'
          />
          <div>
            <h2 className='font-bold text-lg text-blue-800'>{discussionRoom.topic}</h2>
            <h2 className='text-gray-600'>{discussionRoom.coachingOption}</h2>
          </div>
        </div>
        <h2 className='text-gray-500'>
          {moment(discussionRoom?._creationTime).fromNow()}
        </h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5'>
        <div className='col-span-3'>
          <h2 className='text-lg font-bold mb-6'>Summary of Your Conversation</h2>
          <SummeryBox summery={discussionRoom.summery} />
        </div>
        <div className='col-span-2'>
          <h2 className='text-lg font-bold mb-6'>Your Conversation</h2>
          {discussionRoom?.conversation && (
            <ChatBox
              conversation={discussionRoom?.conversation}
              coachingOption={discussionRoom?.coachingOption}
              enableFeedbackNotes={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewSummery;
