import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

export const AuthButton = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <UserButton afterSignOutUrl="/" />;
  }

  if (!isLoaded) {
    return <p>Loading</p>;
  }

  return (
    <>
      <SignUpButton mode="redirect">
        <button className="px-4 text-white rounded bg-primary p-4">
          Sign Up
        </button>
      </SignUpButton>
      <SignInButton mode="redirect">
        <button className="px-4 rounded text-primary p-4">Sign In</button>
      </SignInButton>
    </>
  );
};
