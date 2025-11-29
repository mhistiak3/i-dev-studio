"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BiEdit, BiUser } from "react-icons/bi";

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
          <UserButton.Link
            label="Editor"
            href="/editor"
            labelIcon={<BiEdit className={"size-4"} />}
          />
          <UserButton.Link
            label="Snippets"
            href="/snippets"
            labelIcon={<BiEdit className={"size-4"} />}
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <div className="btn-primary">
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
};

export default HeaderProfile;
