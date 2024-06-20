import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { userId };
};

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f({
    text: { maxFileSize: "4MB" },
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "4MB" },
    audio: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "4MB" },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterText: f({
    pdf: { maxFileSize: "256MB" },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
