'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import moment from 'moment';
import Image from 'next/image';
import ChatBox from '@/app/(main)/discussion-room/[roomid]/_components/ChatBox';
import SummeryBox from '@/app/(main)/view-summery/_components/SummeryBox';
import { ExpertsList } from '@/services/Options';
import AppHeader from '@/app/(main)/_components/AppHeader';
import React from 'react';

function ViewFeedback() {
  const { roomid } = useParams();

  const discussionRoom = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const GetAbstractImages = (option) => {
    const coachingOption = ExpertsList.find((item) => item.name === option);
    return coachingOption?.abstract ?? '/ab1.png';
  };

  if (!discussionRoom) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-indigo-200 to-blue-100">
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={GetAbstractImages(discussionRoom.coachingOption)}
              alt="abstract"
              width={70}
              height={70}
              className="rounded-full shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold text-purple-800">
                {discussionRoom.topic}
              </h2>
              <p className="text-gray-600">{discussionRoom.coachingOption}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {moment(discussionRoom._creationTime).fromNow()}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Feedback Section */}
          <div className="h-full bg-white/70 border border-gray-200 rounded-xl shadow-xl p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                Feedback / Summary
              </h3>
              <SummeryBox summery={discussionRoom.summery} />
            </div>
          </div>

          {/* Chat Section */}
          <div className="h-full bg-white/70 border border-gray-200 rounded-xl shadow-xl p-5 backdrop-blur-md flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              Conversation
            </h3>
            <ChatBox
              conversation={discussionRoom.conversation}
              coachingOption={discussionRoom.coachingOption}
              enableFeedbackNotes={false}
              readOnly={true}
            />
          </div>
        </div>

        {/* ✅ Sweet Thank You Note */}
        <div className="mt-20 text-center text-lg font-medium text-purple-700">
          <p className="bg-gradient-to-r from-purple-600 via-pink-400 to-blue-500 text-transparent bg-clip-text">
            Thank you for reaching out to us 💜. We hope to see you again soon!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewFeedback;
