import { Course, Profile } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
  chapters: { id: string }[];
  progress: number | null;
};

export type SafeProfile = Omit<Profile, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
