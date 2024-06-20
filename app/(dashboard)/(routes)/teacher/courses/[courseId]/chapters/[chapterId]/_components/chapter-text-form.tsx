"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, Text } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import Link from "next/link"; // Import Link from next/link

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface ChapterTextFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  textUrl: z.string().min(1),
});

export const ChapterTextForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTextFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Урок обновлен");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Что-то пошло не так");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Материал курса
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Отмена</>}
          {!isEditing && !initialData.textUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Добавить
            </>
          )}
          {!isEditing && initialData.textUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Изменить
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.textUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Text className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2">
            <a
              href={initialData.textUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Просмотреть PDF
            </a>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterText"
            onChange={(url) => {
              if (url) {
                onSubmit({ textUrl: url });
              }
            }}
          />
        </div>
      )}
      {initialData.textUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Процесс может занять несколько минут. Обновите эту страницу если текст
          не появляется
        </div>
      )}
    </div>
  );
};
