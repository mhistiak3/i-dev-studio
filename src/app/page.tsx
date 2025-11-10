import { SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SignUpButton>Sign Up</SignUpButton>
      <SignOutButton>Sign Out</SignOutButton>
    </>
  );
}
