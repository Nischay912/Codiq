// step262: can do "rfce" to get the boilerplate from the ES7+ React extension, thus here below.

// step263: now we can go on "localhost:5173/" and see the content of this and "/about" page for the content of AboutPage, thus here below.

// step264: see the next steps in App.jsx file now there, thus here below.
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

function HomePage() {
  return (
      <div>
        {/* step274: lets make a test button to test the toasts now thus here below ; which will run the toast function with the message written in it there, thus here below. */}

        {/* step275: now see the next steps in step276.txt file now there, thus here below. */}
        <button className='btn btn-secondary' onClick={() => toast.success("Test successful")}>Test Toast</button>

        {/* step271: now lets comment out the buttons from that App.jsx ther as by rule only <Route> components are allowed inside the outer <Routes> component there, so lets put all those buttons from APp.jsx here below, and comment them on the App.jsx file now there, thus here below. */}

        {/* step272: see the next steps in step273.txt file now there, thus here below. */}
      <SignedOut>
        <SignInButton mode='modal'>
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  )
}

export default HomePage
