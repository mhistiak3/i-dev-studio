"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BiUser } from "react-icons/bi";

const HeaderProfile = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            href="/profile"
            labelIcon={<BiUser className={"size-4"} />}
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
};

export default HeaderProfile;
