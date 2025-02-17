import { getUserById } from "@/actions/user";
import { auth } from "@/auth";
import { Button } from "../button";
import { SigninDialog } from "./signin-dialog";
import { UserProfileDropdown } from "./user-profile-dropdown";
const renderSigninDialog = () => (
  <SigninDialog>
    <Button size="sm">Sign In</Button>
  </SigninDialog>
);

export const UserProfile = async () => {
  const session = await auth();
  // console.log("session", session);

  // Ensure session and session.user.id exist
  const userId = session?.user?.id;
  if (!userId) {
    return renderSigninDialog();
  }

  const user = await getUserById(userId);
  // console.log("user", user);

  if (!user) {
    return renderSigninDialog();
  }

  return <UserProfileDropdown user={user} />;
};
