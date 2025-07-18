import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  let profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  } else {
    let firstName = user.firstName || "";
    let lastName = user.lastName || "";
    // If the first and last name fields are null, trim the email address before the @ character and set it to the first name field.
    if (!firstName && !lastName) {
      const emailParts = user.emailAddresses[0].emailAddress.split("@");
      firstName = emailParts[0].trim();
      lastName = "";
    }
    profile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${firstName} ${lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
  return profile;
};
