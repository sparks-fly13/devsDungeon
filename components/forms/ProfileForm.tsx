"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react'
import { profileSchema } from "@/lib/schema"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "@/lib/actions/user.action"

interface EditProfileProps {
    clerkId: string;
    user: string;
}

const ProfileForm = ({ clerkId, user }: EditProfileProps) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const parsedUser = JSON.parse(user);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: parsedUser.name,
            username: parsedUser.username,
            portfolio: parsedUser.portfolio || '',
            location: parsedUser.location || '',
            bio: parsedUser.bio || '',
        },
    })

    async function onSubmit(values: z.infer<typeof profileSchema>) {
        setSubmitting(true);
        try {
            await updateUser({
                clerkId,
                updateData: {
                    name: values.name,
                    username: values.username,
                    portfolioLink: values.portfolio,
                    location: values.location,
                    bio: values.bio,
                },
                path: pathName
            })
            router.back();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full gap-9 flex-col">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Name <span className="text-primary-500">*</span> </FormLabel>
                            <FormControl>
                                <Input placeholder="kimi no na wa" className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Username <span className="text-primary-500">*</span> </FormLabel>
                            <FormControl>
                                <Input placeholder="Your username" className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Portfolio Link</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="Your portfolio link" className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="You live here" className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="space-y-3.5">
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your biography goes here" className="no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-7 flex justify-end">
                    <Button type="submit" className="primary-gradient w-fit" disabled={submitting}>{submitting ? "Saving..." : "Save"}</Button>
                </div>

            </form>
        </Form>
    )
}

export default ProfileForm