import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react"

function App() {
  return (
    <>
      {/* step52: so we deleted the things that were here before and now write the fresh content now, thus here below. */}
      <h1>Welcome to the app</h1>

      {/* step53: putting the sign in button here from clerk for now, thus here below ; can now test this using cd frontend > npm run dev > and now clicking signIn takes us to the clerk signIn page that we just did setup of it, thus here below. */}

      {/* step54: we put "modal" as the mode and not keep it as "redirect" which is there by default to make it now to show the signin popup there itself and not redirect to the signin page there, thus here below. */}

      {/* step55: now if we try to signin here, then it will show the signed in USER in the Users tab on the clerk dashboard there now, thus here below. */}
      {/* <SignInButton mode='modal'/> */}

      {/* step56: now on signing in, it still shows the signin button there, so now we want to only show it if the user is SignedOut, so we wrap the button with the SignedOut component from clerk there, thus here below. */}
      <SignedOut>
        <SignInButton mode='modal'>
          {/* step59: we can write texts here in this SignInButton component too and then add classes to it too in the button tag in which its been wrapped, thus here below. */}

          {/* step60: see the next steps in step61.txt file now there, thus here below. */}
          <button>
            Login
          </button>
        </SignInButton>
      </SignedOut>

      {/* step57: similarly if the user is signed in, then only show the Signout button there, thus here below. */}
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      {/* step58: we can also now have a User button coming from clerk , which we can click to signout or manage the account there too, thus here below ; and we are able to see the user button only when user is signed in, so no need to wrap this button with SignedIn too, thus here below. */}
      <UserButton />
    </>
  )
}

export default App
