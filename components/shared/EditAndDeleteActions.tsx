"use client";
import { deleteAnswer } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/question.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

interface EditAndDeleteProps {
    type: string;
    itemId: string;
}

const EditAndDeleteActions = ({type, itemId} : EditAndDeleteProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/question/edit/${JSON.parse(itemId)}`);
    };

    const handleDelete = async () => {
        if(type==='Question') {
            deleteQuestion({questionId: JSON.parse(itemId), path: pathname});
        } else if(type==='Answer') {
            deleteAnswer({answerId: JSON.parse(itemId), path: pathname});
        }
    };

  return (
    <div className='flex items-center justify-end gap-3 max-sm:w-full'>
        {type === 'Question' && (
            <Image src="/assets/icons/edit.svg" alt="edit" width={14} height={14} className='cursor-pointer object-contain' onClick={handleEdit}/>
        )}
        <Image src="/assets/icons/trash.svg" alt="delete" width={14} height={14} className='cursor-pointer object-contain' onClick={handleDelete}/>
    </div>
  )
}

export default EditAndDeleteActions