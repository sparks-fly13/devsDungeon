import AnswersTab from '@/components/shared/AnswersTab';
import ProfileLink from '@/components/shared/ProfileLink';
import QuestionsTab from '@/components/shared/QuestionsTab';
import Stats from '@/components/shared/Stats';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserProfileData } from '@/lib/actions/user.action';
import { formatDate } from '@/lib/utils';
import { URLProps } from '@/types'
import { auth, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Profile = async ({params, searchParams} : URLProps) => {
    const userDetails = await getUserProfileData({userId: params.id});
    const {userId : clerkId} = auth();
    return (
        <>
            <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
                <div className='flex flex-col items-start gap-4 lg:flex-row'>
                    <Image src={userDetails?.user.avatar} alt='avatar' width={140} height={140} className='rounded-full w-40 h-40 object-cover' />
                    <div className='mt-3'>
                        <h2 className='h2-bold text-dark100_light900'>{userDetails?.user.name}</h2>
                        <p className='paragraph-regular text-dark200_light800'>@{userDetails?.user.username}</p>

                        <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
                            {userDetails.user.portfolioLink && (
                                <ProfileLink 
                                    imgUrl = "/assets/icons/link.svg"
                                    href = {userDetails.user.portfolioLink}
                                    title = "Portfolio"
                                />
                            )}

                            {userDetails.user.location && (
                                <ProfileLink 
                                    imgUrl = "/assets/icons/location.svg"
                                    title = {userDetails.user.location}
                                />
                            )}

                            <ProfileLink 
                                imgUrl = "/assets/icons/calendar.svg"
                                title = {`Joined ${formatDate(userDetails?.user.joinedAt)}`}
                            />
                        </div>

                        {userDetails.user.bio && (
                            <p className='paragraph-regular text-dark400_light800 mt-8'>{userDetails.user.bio}</p>
                        )}

                    </div>
                </div>

                <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
                    <SignedIn>
                        {clerkId === userDetails.user.clerkId && (
                            <Link href="/profile/edit">
                                <Button className='btn-secondary paragraph-medium text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>Edit Profile</Button>
                            </Link>
                        )}
                    </SignedIn>
                </div>
            </div>

            <Stats totalQuestions={userDetails.totalQuestions} totalAnswers={userDetails.totalAnswers} badges={userDetails.badgeCount} reputation={userDetails.reputation}/>

            <div className='mt-10 flex gap-10'>
            <Tabs defaultValue="top-posts" className="flex-1">
                <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
                    <TabsTrigger value="top-posts" className='tab'>Top Posts</TabsTrigger>
                    <TabsTrigger value="answers" className='tab'>Answers</TabsTrigger>
                </TabsList>
                <TabsContent value="top-posts">
                    <QuestionsTab searchParams={searchParams} userId={userDetails.user._id} clerkId={clerkId} />
                </TabsContent>
                <TabsContent value="answers">
                    <AnswersTab searchParams={searchParams} userId={userDetails.user._id} clerkId={clerkId} />
                </TabsContent>
            </Tabs>

            </div>
        </>
    )
    }

export default Profile