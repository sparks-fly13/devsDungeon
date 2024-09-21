"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { questionSchema } from "@/lib/schema";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";

const type: any = "create";

interface userIdProps {
  userId: string;
}

const QuestionForm = ({ userId }: userIdProps) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      questionBody: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);
    try {
      //Make an async call to API to create a question with all form data and then navigate to homepage
      await createQuestion({
        title: values.title,
        questionBody: values.questionBody,
        tags: values.tags,
        author: JSON.parse(userId),
        path: pathName,
      });
      router.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value.trim();
      if (value !== "") {
        if (value.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tags cannot be more than 15 characters",
          });
        }
        if (!field.value.includes(value)) {
          form.setValue("tags", [...field.value, value]);
          input.value = "";
          form.clearErrors("tags");
        } else {
          return form.setError("tags", {
            type: "required",
            message: "Tag already exists",
          });
        }
      } else {
        return form.setError("tags", {
          type: "required",
          message: "Tags cannot be empty",
        });
      }
      form.trigger("tags");
    }
  };

  const handleTagDelete = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and descriptive. Imagine you're asking the question
                to another person in real life.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="questionBody"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Provide a detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) =>
                    //@ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: true,
                    plugins:
                      "autolink anchor charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter | " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce your problem and explain it in at least 50 characters.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleTagKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any, key: number) => (
                        <Badge
                          key={key}
                          className="subtle-medium background-light800_dark300 text-light-400 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="Close"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                            onClick={() => handleTagDelete(tag, field)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 5 tags to describe what your question is about. Press
                enter to add the tag.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
