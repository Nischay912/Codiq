import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react"
import { Navigate, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ProblemsPage from "./pages/ProblemsPage"
import { Toaster } from "react-hot-toast"

function App() {

  // step267: so now we will use the useUser hook of clerk, to get various values, thus here below.
  const { isSignedIn } = useUser()
  return (
    <>
      {/* step257: under the Routes component, all the components acn be <Route > only , so <h1> below should be removed, else it will show an error, thus here below. */}
      <Routes>
        {/* step52: so we deleted the things that were here before and now write the fresh content now, thus here below. */}
        {/* <h1 className="text-red-500 bg-blue-500 p-10 text-3xl">Welcome to the app</h1> */}

        {/* step258: now lets add the first Route here below, thus here below. */}

        {/* step259: it tells here below that, if the user visits the "/" home or the root route, then we will show the below component/element there, thus here below. */}
        <Route path="/" element = {<HomePage />} />

        {/* step260: similarly do for the other pages too like "/about" too (this about page deleted later as we won't be having this page in the final application there), thus here below. */}

        {/* step261: see the next steps in HomePage.jsx file now there, thus here below. */}
        {/* <Route path = "/about" element = {<AboutPage />} /> */}

        {/* step265: now lets get the component to be rendered for the "/problems" page, thus here below. */}

        {/* step266: but now we want to authenticate this route i.e. only authenticated users can see this page ; and if user is not authentciated, then we want to redirect them to the "/" page, thus here below. */}

        {/* step268: so the isSignedIn, tells us if user is signed in or not, so wrap the below route with it so that only if user is signed in with clerk, then they will see the problem page, else navigate them using the Navigate component to the home "/" page, thus here below. */}

        {/* step269: so now if we are not logged in & we try to visit the "/problems" page, then we will be redirected to the "/" page automatically there, thus here below. */}

        {/* step270: see the next steps now in HomePage.jsx file now there, thus here below. */}
        <Route path = "/problems" element = {isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} />

        {/* step53: putting the sign in button here from clerk for now, thus here below ; can now test this using cd frontend > npm run dev > and now clicking signIn takes us to the clerk signIn page that we just did setup of it, thus here below. */}

        {/* step54: we put "modal" as the mode and not keep it as "redirect" which is there by default to make it now to show the signin popup there itself and not redirect to the signin page there, thus here below. */}

        {/* step55: now if we try to signin here, then it will show the signed in USER in the Users tab on the clerk dashboard there now, thus here below. */}
        {/* <SignInButton mode='modal'/> */}

        {/* step56: now on signing in, it still shows the signin button there, so now we want to only show it if the user is SignedOut, so we wrap the button with the SignedOut component from clerk there, thus here below. */}
        {/*
        <SignedOut>
          <SignInButton mode='modal'>
            {/* step59: we can write texts here in this SignInButton component too and then add classes to it too in the button tag in which its been wrapped, thus here below. 

            {/* step60: see the next steps in step61.txt file now there, thus here below. 
            <button>
              Login
            </button>
          </SignInButton>
        </SignedOut>

        {/* step57: similarly if the user is signed in, then only show the Signout button there, thus here below.
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        {/* step58: we can also now have a User button coming from clerk , which we can click to signout or manage the account there too, thus here below ; and we are able to see the user button only when user is signed in, so no need to wrap this button with SignedIn too, thus here below. 
        <UserButton />
      */}
      </Routes>

      <Toaster toastOptions={ {duration: 3000} } />
    </>
  )
}

export default App