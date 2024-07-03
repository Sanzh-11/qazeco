import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { File, ArrowLeftToLine } from "lucide-react";
import Link from "next/link";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, attachments, nextChapter, userProgress } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const pdfUrl = chapter.textUrl || "";

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 mt-10">
          <a
            href={pdfUrl}
            target="_blank"
            className="flex items-center p-3 w-full bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 hover:underline"
          >
            <File />
            <p className="line-clamp-1">{`${chapter.title}_material`}</p>
          </a>
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          <div className="p-4 mt-20">
            <p className="text-2xl font-semibold">Below are course exercises</p>
            <p className="text-sm text-gray-500 mb-4">
              Feel free to complete them at any time you want
            </p>
            <div className="flex items-center space-x-2 mt-4"></div>
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 dark:bg-sky-800 text-sky-700 dark:text-sky-300 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
