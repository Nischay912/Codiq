// step262: can do "rfce" to get the boilerplate from the ES7+ React extension, thus here below.

// step263: now we can go on "localhost:5173/" and see the content of this and "/about" page for the content of AboutPage, thus here below.

// step264: see the next steps in App.jsx file now there, thus here below.

// import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
// import toast from 'react-hot-toast'
import { Link } from "react-router"
import { ArrowRightIcon, CheckIcon, Code, CodeXml, Laptop, LaptopMinimalCheck, MonitorPlay, Users, VideoIcon, ZapIcon } from "lucide-react"
import { SignIn, SignInButton } from "@clerk/clerk-react"
import { useState } from "react"
import VideoModal from "../../components/VideoModal"


function HomePage() {

  // step320: now lets create a state to show the video, thus here below ; initially "false" means hide the youtube model initially when the page loads, thus here below.
  const [showVideo, setShowVideo] = useState(false)
  // step290: so we first commented out all from before and now lets start fresh, thus here below.
  return (
    // step291: adding the gradient from top-left to bottom-right using the colors using base i.e. daisyUI colors, where from-base is used to tell starting color, via-base is used to tell middle color and to-base is used to tell ending color, thus here below.
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">

      {/* step292: now lets make the navbar here below with background color having /80 i.e. 80% opacity ; then add blur effect behind the navbar like a glass look, then add border only at bottom with /20 i.e. 20% opacity, then stick it to the top and keep it sticky i.e. not moves when scrolling and z -index to keep navbar above all content and giev some shadow too, thus here below. */}

      {/* Here : "/80" if removed we won't be able to see the blur even if we add "backdrop-blur-md" in the nav, because : to Make the navbar background semi-transparent using /80 so content behind is visible and backdrop-blur can create the glass/frosted blur effect, otherwise with solid color the blur will not be visible, thus here below. */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">

        {/* step293: Make a centered container with max width limit, center it horizontally using auto margins, add padding for spacing, use flexbox layout, align items vertically center, and place items at left and right ends with space between them using justify-between, thus here below. */}
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* step294: now we will have a logo here which will be a Link component that takes us to "/" when clicked, thus here below. */}
          <Link 
            to={"/"}

            // step295: Use flexbox to arrange items in a row, center them vertically, add spacing between items, slightly zoom/enlarge on hover, and apply a smooth transform animation with 200ms duration to transform slowly and not jerkily and instantly, thus here below.
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >

            {/* step296: Set fixed square size (10), apply extra large rounded corners, add diagonal gradient background from primary → secondary → accent colors, use flexbox to center content both horizontally and vertically, and add large shadow for depth, thus here below. */}
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">

              {/* step297: now lets do > cd frontend > "npm i lucide-react" > then import this Code from lucide-react, thus here below. */}

              {/* step298: see the next steps in step299.txt file now there, thus here below. */}
              <CodeXml className="size-6 text-white" />
            </div>

            {/* step300: now lets have a column flexbox to keep the things one below the other there after the logo there in the navbar, thus here below. */}
            <div className="flex flex-col">

              {/* step301: Use extra bold/black font weight for strong text, set large text size, apply horizontal gradient from primary → secondary → accent colors, clip the gradient only inside the text, make text transparent to show the gradient, use monospace font style, and add wider letter spacing for a clean modern look, thus here below ; so the "clip" here below makes the gradient to be in the text and not in bg, thus here below. */}
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Codiq
              </span>
              {/* step302: Set extra small text size, apply base content color with 60% opacity for a subtle/light appearance, use medium font weight for better readability, and add a small negative top margin to slightly move the text upward and reduce spacing, thus here below. */}
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* step303: now on the right side of the navbar, we will have a signIn button coming from CLERK, like learnt earlier about it there, thus here below. */}

          {/* step304: so now we will show the signInbutton from react with mode "modal" i.e. show popup there itself and not redirect us to sign in page, thus here below. */}
          <SignInButton mode="modal">
            {/* step305: now lets have our custom designed button inside of it, thus here below. */}

            {/* step306: so now we : Make the button behave like a group for coordinated hover effects, add horizontal and vertical padding for size, apply gradient background from primary to secondary, give rounded extra-large corners, set white semi-bold small text, add large shadow that increases on hover, apply smooth transition for all effects with 200ms duration, slightly enlarge on hover, use flexbox to align content in a row with spacing between text and icon, and move the arrow icon slightly right on hover for a smooth interactive feel, thus here below. */}
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              
              {/* step307: we had put "group" on button and now here group-hover so that even if the button with group is hovered, the hover for allow will also happen, thus here below ; using group on the button and group-hover on the child element allows the child (arrow icon) to apply hover effects when the parent button is hovered, thus here below. */}
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* step308: now lets make the main body hero-section, thus here below. */}

      {/* step309: Create a centered container with maximum width limit, center it horizontally, add horizontal padding and large vertical padding for spacing, then use grid layout with two columns on large screens, add gap between grid items, and vertically align all items to the center for balanced layout, thus here below ; so this will be the grid in which we will have one item on left and the other on right, thus here below. */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* step310: now lets make the left side of the hero-section where we will have some vertical spacing between all items in this div, thus here below. */}
          <div className="space-y-8"> 

            {/* step311: now lets make a badge first using daisyUI of the primary theme color, thus here below. */}
            <div className="badge badge-primary badge-lg">
              <Laptop className="size-4" />
              Live-coding Workspace
            </div>

            {/* step312: now we will hav some text there with that y-8 space vertical between, thus here below. */}

            {/* step313: so now we : Set very large text size for default screens, increase to extra large text on large screens, apply extra bold/black font weight for strong emphasis, and keep tight line height to reduce space between lines and make the heading compact ; line height reduces the space between lines if the text is in 2 or more lines and makes the heading compact, thus here below. */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Code Together,
              </span>
              <br /> {/* to break line */}

              {/* step314: again now we: Apply the base content text color from the theme so the text uses the default readable color that matches the overall design system, thus here below. */}
              <span className="text-base-content">
                Grow Together
              </span>
            </h1>

            {/* step315: now lets have a paragraph there, thus here below ; so here we : Set slightly large paragraph text size for better readability, apply base content color with 70% opacity for a softer muted look, use relaxed line height to add more space between lines for comfortable reading, and limit the maximum width to extra-large so the text doesn’t stretch too wide, thus here below. */}
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The all-in-one platform for collaborative coding sessions and pair programming practice. Connect face-to-face, code live together, and crack your technical interviews.
            </p>

            {/* step316: now have more such badges classes from daisyUi to show the features of the website, thus here below ; so here : Use flexbox to arrange all badges in a row, allow wrapping to the next line if space is less, add spacing between each badge, style each item as a large outlined badge for a clean pill look, place a small success-colored check icon inside, and display the feature text beside it to highlight key functionalities clearly, thus here below.*/}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Calls and Chats
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Languages
              </div>
            </div>

            {/* step317: now lets have a buttons below it, thus here below ; the wrap method makes the buttons wrap to the next line if there is not enough space, thus here below. */}
            <div className="flex flex-wrap gap-4">

              {/* step318: again now lets have a button for signup, so we wrap it with SignInButton component, so that when clicked it will open the modal, thus here below. */}
              <SignInButton mode='modal'>
                <button className="btn btn-primary btn-lg">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              {/* step319: now lets have another button to watch demo video, thus here below. */}

              {/* step321: so now we make the button to make the video state true when clicked, thus here below. */}
              <button className="btn btn-outline btn-lg" onClick={() => setShowVideo(true)}>
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* step335: now lets show some stats of the website, thus here below ; so now we : Apply DaisyUI stats component styling, arrange stats vertically by default and switch to horizontal layout on large screens for responsiveness, set base background color matching the theme, and add a large shadow for a raised card-like appearance, thus here below. */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">

              {/* step336: again using a daisyUI stat, stat-value and stat-title components, thus here below. */}
              <div className="stat"> 
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Coders</div>
              </div>
              <div className="stat"> 
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions Completed</div>
              </div>
              <div className="stat"> 
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* step337: now lets put the image on the right side of the grid i.e. in the 2nd column, thus here below. */}
          <img
          // step338: "/" means we are in public folder and get this from there, thus here below.
            src="/hero2.png"

            // step339: now we add "alt" to be read by screen readers and to eb shown if the image fails to load there, thus here below.
            alt="Codiq"

            // step340: so now we : Set full width so the element fills its container, keep height automatic to maintain aspect ratio, apply extra large rounded corners for a smooth look, add strong shadow for depth, give a thick border with base theme color, slightly enlarge the element on hover using scale effect, and use transition-transform to smoothly animate only transform changes (like scale/zoom/move/rotate) with a 500ms duration for a clean hover animation, thus here below.

            // step341: TailwindCSS gets rid of the cursor-pointer by default for the buttons, so we can add a set of code in index.css there to add cursor to the buttons by default always , which is told to do like this in the Tailwind css docs, as per there, thus here below.
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* step342: so now lets have the features section below, so add the same styles to the outer div, like the hero section, thus here below. */}
      <div className="max-w-7xl mx-auto px-4 py-20">

        {/* step343: now lets add the title and subtitle of the features section, thus here below. */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4"> {/* mb means margin from bottom, thus here below. */}
            All the Tools You Need to <span className="text-primary font-mono">Crack Interviews</span>
          </h2>

          {/* step344: so here we : Set slightly large text size for comfortable reading, apply base content color with 70% opacity for a soft muted look, limit the maximum width to prevent the paragraph from becoming too wide, and center it horizontally using auto margins for a clean balanced layout, thus here below. */}
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Smart features designed for faster practice and real-world preparation
          </p>
        </div>

        {/* step345: now lets have the features grid below, thus here below ; so we: Use grid layout to organize content, switch to three equal columns on medium and larger screens for responsive design, and add spacing between each grid item to keep the layout clean and well separated, thus here below. */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* step346: now lets have the features in each column of the grid, thus here below. */}

          {/* step347: so we now : Create a "DaisyUI card component" with base theme background and strong shadow for a raised look, place content inside the DaisyUI card-body, center all items and text for proper alignment, then add a fixed square icon container with light primary-colored background, rounded corners, use flexbox to perfectly center the icon, and give bottom margin for spacing from the content below, thus here below. */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <MonitorPlay className="size-8 text-primary" />
              </div>

              {/* step348: so we : Apply DaisyUI’s card-title utility to style the heading inside a card with larger font size, bold weight, and proper spacing so it stands out clearly as the main title of the card, thus here below. */}
              <h3 className="card-title">Virtual Interview Room</h3>

              {/* step349: so here we : Apply the base content text color from the DaisyUI theme with 70% opacity to create a softer, muted paragraph appearance that is readable but less prominent than headings, thus here below. */}
              <p className="text-base-content/70">Smooth video & audio for realistic mock sessions</p>
            </div>
          </div>
          

            {/* step350: similarly lets have the other 2 columns of the grid, thus here below. */}

            {/* step351: now see the next steps in App.jsx file now there, thus here below. */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Code className="size-8 text-primary" />
                </div>
                <h3 className="card-title">Pair Programming Editor</h3>
                <p className="text-base-content/70">Code together with live execution and highlighting</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="size-8 text-primary" />
                </div>
                <h3 className="card-title">Live Collaboration</h3>
                <p className="text-base-content/70">Share screens, discuss ideas, and solve faster</p>
              </div>
            </div>
        </div>
      </div>
      
      {/* step322: now lets have the following conditional rendering below to show the below component, only if showVideo state is true, and later close the modal by setting video state to false, thus here below. */}

      {/* step323: so we pass these two values in the VideoModal component, thus here below. */}

      {/* step324: see the next steps in VideoModal.jsx file now there, thus here below. */}
      <VideoModal show={showVideo} onClose={() => setShowVideo(false)} />

    </div>
    /*
      <div>
        {/* step274: lets make a test button to test the toasts now thus here below ; which will run the toast function with the message written in it there, thus here below. 

        {/* step275: now see the next steps in step276.txt file now there, thus here below. 
        <button className='btn btn-secondary' onClick={() => toast.success("Test successful")}>Test Toast</button>

        {/* step271: now lets comment out the buttons from that App.jsx ther as by rule only <Route> components are allowed inside the outer <Routes> component there, so lets put all those buttons from APp.jsx here below, and comment them on the App.jsx file now there, thus here below. 

        {/* step272: see the next steps in step273.txt file now there, thus here below. 
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
  */
  )
}

export default HomePage
