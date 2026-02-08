// step892: lets first get the react function export component boilerplate first using "rfce" > enter, thus here below.

import { ArrowRightIcon, Code2Icon, CodeXml, CornerDownLeft, Loader2Icon, LoaderIcon, Radio, RadioTower, UserIcon, Users, UsersIcon, UserStar } from "lucide-react"
import { getDifficultyBadgeClass } from "../lib/utils"
import { Link } from "react-router"

// step893: now lets get the props passed here by destructuring them as by rules its passed as an object and must be destructure dhere below using the {....} syntax in order to use them here below in this function here/there & the name of the props must match to the left hand side of the prop names we gave while passing it to this component in the DashboardPage.jsx file here/there at that time here/there, thus here below.
function ActiveSessions({
  sessions,
  isLoading,
  isUserInSession
}) {
  return (
    // step894: so here : This div uses lg:col-span-2 so on large screens and above it spans 2 columns of the parent grid layout, making it wider than single-column cards ; as we had in the parent dashboardpage that it was a grid with 3 columns in whihc this component was there, so the statscard component took 1 column space adn this now takes 2 column space to look wider there ; while still behaving normally on smaller screens, card comes from DaisyUI (built on Tailwind CSS) and provides the structured card layout with padding and rounded corners, bg-base-100 applies the theme’s main surface background color, border-2 adds a slightly thicker border for clear separation, border-primary/20 gives a soft primary-colored border with low opacity for a subtle look, hover:border-primary/30 slightly increases the border intensity when hovered for interactive feedback, and h-full ensures the card stretches to take the full height of its grid cell so it aligns evenly with neighboring elements, thus here below.
    <div className="lg:col-span-2 card bg-base-100 border-2 border-primary/20 hover:border-primary/30 h-full">

      {/* step895: so here we use : a DaisyUI class (built on Tailwind CSS) that gives proper inner spacing and layout to the card content, thus here below. */}
      <div className="card-body">

        {/* step896: now lets have the header section at the top first in the card, thus here below. */}

        {/* step897: now inside this div: uses Tailwind where flex places children in a row, items-center vertically centers them, justify-between pushes left content (icon/title area) and right content apart with space between, and mb-6 adds spacing below this header section, thus here below. */}

          {/* step898: now in this flexbox we will have the title and icon at both ends with space between due to justify-between, thus here below. */}
        <div className="flex items-center justify-between mb-6">

          {/* step899: now here we have another flexbox at the left part in the parent flexbox : to align the icon container and text side by side with equal spacing between them, thus here below. */}
          <div className="flex items-center gap-3">

            {/* step900: the below div now : creates a small colored icon box where p-2 adds inner padding, bg-gradient-to-br applies a diagonal gradient background, from-primary to-secondary uses DaisyUI theme colors for the gradient, and rounded-xl gives smooth rounded corners, thus here below. */}
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <RadioTower className="size-5" />
            </div>

            {/* step901: now in the left side after the icon, we will have the text too ; so : this h2 uses Tailwind where text-2xl makes the heading larger and bold-looking while font-black gives extra thick weight so “Live Sessions” stands out clearly as the section title, thus here below. */}
            <h2 className="text-2xl font-black">Live Sessions</h2>
          </div>

          {/* step902: now on the right side of the outer flexbox , we again have a flexbox to have the text and the icon side by side with equal spacing between them, thus here below. */}
          <div className="flex items-center gap-2">

            {/* step903: this small div with size-2 bg-success rounded-full creates a tiny green circular dot using Tailwind and DaisyUI theme color where bg-success gives the success (green) color and rounded-full makes it perfectly circular, thus here below. */}
            <div className="animate-pulse size-2 bg-success rounded-full" />

            {/* step904: this small div with size-2 bg-success rounded-full creates a tiny green circular dot using Tailwind and DaisyUI theme color where bg-success gives the success (green) color and rounded-full makes it perfectly circular, thus here below. */}
            <span className="text-sm font-medium text-success">{sessions.length} active</span>
          </div>
        </div>

        {/* step905: now outside the flexbox but inside the card-body, we now render the sessions list, thus here below. */}

        {/* step906: so now : this div uses Tailwind where space-y-3 adds vertical spacing between each direct child element so items don’t stick together, max-h-[400px] limits the container height to 400px so it doesn’t grow too tall, overflow-y-auto enables a vertical scrollbar only when content exceeds that height, and pr-2 adds small right padding so the scrollbar doesn’t overlap the content, thus here below. */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">

          {/* step907: now we do conditional rendering and if the API is being called and the isLoading is true, then we render the LoadingSpinner, thus here below. */}
          {isLoading
            ? (
              // step908: so now we render the loading spinner when isLoading is true, thus here below.

              // step909: so now : this div uses Tailwind flex layout with items-center and justify-center to perfectly center the spinner horizontally and vertically inside the container, and py-20 adds large vertical spacing so the loader appears nicely spaced in the middle area, thus here below.
              <div className="flex items-center justify-center py-20">

                {/* step910: now : the LoaderIcon inside uses size-10 to make the icon larger and clearly visible, text-primary applies the primary theme color from DaisyUI so it matches the app theme, and animate-spin from Tailwind CSS adds a continuous smooth rotation animation so the icon spins while data is loading, thus here below. */}
                <Loader2Icon className="size-10 animate-spin text-primary" />
              </div>
            )
            : (
              // step911: here in else part also : we see again that if there are sessions there, then render them , else show no sessions message, thus here below.
              sessions.length > 0
              ? (
                // step912: so now : we know and we saw in DashboardPage.jsx that we console logged there and saw backend sent us an array of objects where it sent us an array with each session like : [{session1}, {session2}, {session3}, .... so on ...] there named "sessions" and that array we will now map ; as by rule "map" can be used only with arrays, thus here below.

                /* step913: so the sessions which was passed here containing the result rescieved in the variable "activeSessionsData" in DashboardPage.jsx file here/there, we get from backend is like -

                Example backend response for "activeSessionsData":

                {
                  sessions: [
                    {
                      _id: "65f1a1b2c3d4e5f601",
                      problem: "Two Sum",
                      difficulty: "easy",
                      host: {
                        clerkId: "user_2abc123",
                        name: "Nischay"
                      },
                      participant: {
                        clerkId: "user_5xyz789",
                        name: "Rahul"
                      },
                      createdAt: "2026-02-08T10:15:30.000Z"
                    },
                    {
                      _id: "65f1a1b2c3d4e5f602",
                      problem: "Binary Search",
                      difficulty: "medium",
                      host: {
                        clerkId: "user_9lmn456",
                        name: "Aman"
                      },
                      participant: {
                        clerkId: "user_3pqr111",
                        name: "Priya"
                      },
                      createdAt: "2026-02-08T11:00:00.000Z"
                    },
                  ]
                }

                ; and in dashboard page we did activeSessionsData.sessions to be saved in activeSessions there i.e. to get the array from the object here above; converting or extracting array was very much needed there as by rule "map" can be used only with arrays ; and then here/there we passed that array with prop name "sessions" to this component here below, thus here below.
                */

                // step913: so now we map this array of sessions, as by rule "map" can be used only with arrays, thus here below.

                // NOTE HERE : so now here "session" is each session inside the "sessions" array, thus here below.
                sessions.map((session) => (
                  <div
                  // step914: it has the id assigned in "_id" by rule by mongodb that we can use as key as by rule we must put a unique key here when using "map" alwyas by rule of react ; and the key should be placed in the element being rendered for each item, here we render this div for each item, so put the key inside this div as a field, using the syntax as mentioned below here, thus here below.
                    key = {session._id}

                    // step915: now the outer container here is the div below, so : this div uses DaisyUI’s card component built on Tailwind CSS where card gives structured padding and layout styling, bg-base-200 applies a slightly darker theme background color compared to base-100 for visual contrast, border-2 adds a visible medium thickness border, border-base-300 gives it a neutral theme border color, and hover:border-primary/50 changes the border to a semi-transparent primary theme color when hovering to create a subtle interactive highlight effect, thus here below.
                    className="card bg-base-200 border-2 border-base-300 hover:border-primary/50"
                  >
                    {/* step916: now we will have one more div here to be a flexbox , with justify-between to make the items present in it to be pushed apart at both left and the right ends, with space in between them there, thus here below. */}
                    <div className="flex items-center justify-between gap-4 p-5">

                      {/* step917: now the left side of the flexbox which has justify between to push the items apart, now has the left section being made now here/there, thus here below. */}

                      {/* step918: so now : this div also uses Tailwind where flex keeps its children in a row, items-center vertically aligns them, gap-4 adds spacing between icon and text section, and flex-1 makes this left section expand to take remaining horizontal space inside the parent flex container as much as possible ; so this left side will take all place possible and will be horizontally the longer section, thus here below. */}
                      <div className="flex items-center gap-4 flex-1">

                        {/* step919: now here : this div creates the main icon container using Tailwind where relative allows absolute elements inside it to position correctly, size-14 sets equal width and height, rounded-xl gives smooth rounded corners, bg-gradient-to-br with from-primary to-secondary applies a diagonal gradient background using DaisyUI theme colors, and flex items-center justify-center centers the icon perfectly inside the box, thus here below. */}
                        <div className="relative size-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">

                          {/* step920: now lets have the icon first in this icon container, thus here below. */}
                          <Code2Icon className="size-7 text-white" />

                          {/* step921: now : this self-closing div creates the green online indicator dot using Tailwind where absolute positions it relative to the parent container ; thats why we had relative in the parent, so that the absolute will be used to position it w.r.t the parent with relative class and position it at : -top-1 and -right-1 i.e. slightly offset it outside the corner ; -top-1 means move the element slightly upwards from the top edge (negative top value), and -right-1 means move it slightly outside towards the right side from the right edge — both work only when the element is absolute and the parent is relative, so it gets positioned a little outside the top-right corner instead of sitting fully inside it ; size-4 sets width and height, bg-success applies DaisyUI success theme color (green), rounded-full makes it perfectly circular, and border-2 border-base-100 adds a small border around it so it looks clean and separated from the gradient background, thus here below. */}

                          {/* step922: this is the green online indicator dot, that is to be positioned at the top-right corner of the icon container */}
                          <div className="absolute -top-1 -right-1 size-4 bg-error rounded-full border-2 border-base-100 animate-pulse" />
                        </div>

                        {/* step922: now lets have another div here inside the flexbox on the left itslef ; to have the next title and subtitle there with the icon there, thus here below. */}

                        {/* step923: so the div here below : uses Tailwind where flex-1 allows this div to take up the remaining available space inside its parent flex container and thus this will take the maximum longer space possible apart from the right component of this flexbox of justify-between, and min-w-0 is very important in flex layouts because it allows the content inside (like long text) to shrink properly instead of overflowing outside the container, thus here below. */}

                        {/* step924: here : min-w-0 is important inside flex layouts because by default flex items have min-width: auto which means they are not allowed to shrink smaller than their content width, so if the text is long the element refuses to shrink and truncate (...) will not work properly, but when we add min-w-0 we explicitly allow the flex item to shrink all the way down to 0px if needed, so now flexbox can reduce its width, the text overflows, and since truncate (which uses overflow-hidden, whitespace-nowrap and text-ellipsis) is applied, the ellipsis (...) appears correctly, thus here below. */}
                        <div className="flex-1 min-w-0">

                          {/* step925: the following dov now : uses Tailwind where flex places the title and badge in one horizontal row, items-center vertically aligns them in the center, gap-2 adds small spacing between the problem title and difficulty badge, and mb-2 adds spacing below this row before the next content, thus here below. */}
                          <div className="flex items-center gap-2 mb-2">

                            {/* step926: here the div now : uses Tailwind where font-bold makes the text thicker, text-lg increases the font size slightly for emphasis, and "truncate" ensures that if the problem title is too long it will not break the layout but instead show an ellipsis (...) at the end while staying in one line, thus here below. */}

                            {/* step927: so the use fo truncate is to show an ellipsis (...) at the end of the problem title if it is too long to fit in one line ; and for this only the class above "min-w-0" was important as it allows the text to shrink all the way down to 0px if needed and thus allows the ellipsis (...) to appear correctly here/there, thus here below. */}
                            <h3 className="font-bold text-lg truncate">{session.problem}</h3>
                            <span

                              // stgep928: now here dynamically we show the difficulty badge class function that we had defined earlier based on the difficulty field present in the session object, thus here below.
                              className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                              >
                                {/* {session.difficulty} */}

                              {/* step929: since the above line was getting difficulty from backend, where we took it as all lower case from enum : we had defined in sessionSchema in backend for difficulty; but we want the first letter to be in capital, so we need to convert it to title case, thus here below. */}

                              {/* step930: now we so : take the character at 0th index and convert it to the upper-case & then add the "session.difficulty" after that from 1 index onverts, thus only the first letter will be in capital and rest small as we wanted, thus here below.  */}
                              {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                            </span>
                          </div>

                          {/* step931: now we have another div made here below to be present below the title and badge ; its still inside the leftmost div of the flexbox ; so will be on the left ; but its below the above flex div , so it will be to the next line ; its insdie the flex-1 div but flex-1 aims at making it take up the maximum possible space inside the flexbox and not to be in the same line and since div is a block element, so: since the structure is like -
                          
                          <div className="flex items-center gap-2 mb-2">
                            <h3 ...>...</h3>
                            <span ...>...</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm opacity-80">
                            <div className="flex items-center gap-1.5">
                                <UserStar />
                            </div>
                          </div>
                          
                          ; so clealry this new div with the userstar and all : will go to the next line, thus here below. */}

                          {/* step932: but again now here below we have 2 flexboxes continnously as the first one here below : will help to get the [ (Star + Name) ]    [ (UsersIcon + 1/2) ] i.e. these two flexboxes inside a same row, thus here below. */}

                          {/* step933: then we have below format as -
                          
                          <outer flexbox to keep the inner two in same line>
                              <flexbox1> -> (Star + Name)
                              <flexbox2> -> (UsersIcon + 1/2 : number of participants)
                          </outer flexbox>

                          ; so here thats why we have total 2 inner flexbox here too along with outer flexbox ; to help in : keeping more gap between each flexboxes , but lesser gap between elements of same flexbox , like star and name have less gap but (flexbox1) and (flexbox2) have more gap ; thats why instead of having 4 items in one flexbox, we grouped them each to be together with lesser gap together here/there, thus here below.
                          */}

                          {/* step934: so here this div : uses Tailwind CSS where flex creates a horizontal flex layout, items-center vertically centers all children, gap-4 adds spacing between each child element, text-sm sets small font size, and opacity-80 slightly fades the whole content to 80% visibility for subtle UI styling, thus here below. */}
                          <div className="flex items-center gap-4 text-sm opacity-80">

                            {/* step935: the div below now : uses Tailwind CSS where flex arranges icon and text in one row, items-center vertically aligns them properly, and gap-1.5 adds small spacing between the icon and text for tight grouping, thus here below. */}
                            <div className="flex items-center gap-1.5">

                              {/* step936: size-4 sets equal width and height (16px) to keep the icon small and consistent with surrounding text, thus here below. */}
                              <UserStar className="size-4" />

                              {/* step937: so we do ?. optional chaining to prevent crash and rather just show nothing or undefined ther einstead of error like "cannot read property 'name" of undefined", so rather have it undefined, so that the span shows "empty" there, thus here below. */}
                              <span className="font-medium">{session.host?.name}</span>
                            </div>

                            {/* step938: now inside another flex , have the users icon and the number of participants, thus here below. */}
                            <div className="flex items-center gap-1.5">

                              {/* step940: show the 1 user icon if 1/2 and 2 users icon if 2/2, thus here below. */}
                              {session.participant ? (<UsersIcon className="size-4" />) : (<UserIcon className="size-4" />)}
                              <span className="text-xs">

                                {/* step939: now if someone is seeing the session list there, and sees that the number is "2/2" it means there is a participant in it ; as by logic HOST toh rahega hi always in it and when a participant join it becomes 2/2 ; but if session has no participant i.e. session.participant is false or null or empty or undefined, then it will show "1/2" ; thus here below. */}
                                {session.participant ? "2/2" : "1/2"}
                              </span>
                            </div>

                            {/* step940: now the outermost div was a flexbox too so after the above two group of flexbox i.e. (star + name) and (usersicon + 1/2) + now show the badge here below and no need of flexbox here internally as its alone to be shown not with anything else so no need of grouped flexbox here/there, thus here below. */}

                            {/* step941: now here if the session has a participant && the current logged in user seeing it is not a part of it ; then he will see FULL there ; but lets say there is a host who created the session , then anothet logged-in user sees the session and since the session only has host and not session.participant ; then he will see OPEN there and can join ; also there can be a case that : the host who created the session somehow comes to the sesison list back by windows BACK button and in list sees that it has participant , but since he is already a part of session as a host, so he sees it OPEN and also if the joined participant sees the list, since he is part of session , so he sees it OPEN ; thus here below. */}

                            {/* step942: so out of the 4 cases above ; the top 2 are most likeley to happen and for that these two conditions are must to be checked there, thus here below. */}
                            {session.participant && !isUserInSession(session)
                            ? (
                              <span className="badge badge-error badge-sm">FULL</span>
                            )
                            : (
                              <span className="badge badge-success badge-sm">OPEN</span>
                            )
                            }
                          </div>
                      </div>
                    </div>

                    {/* step943: now here we come out of the outermost flexbox of the LEFT SIDE and now have the button here below to be shown on the extreme RIGHT SIDE , as the outer parent div of these is still a flexbox with justify-between so the elements inside it the two divs in it are always at the opposite ends, thus here below. */}

                    {/* step944: same conditions as above, we now here below show a disabled button if the session is FULL ; else show a button to join the session, thus here below. */}
                    {session.participant && !isUserInSession(session)
                    ? (
                      // step945: so this div below : uses DaisyUI where btn applies the base button styling with padding, rounded corners, and proper alignment, btn-disabled visually disables the button (usually faded and non-clickable) to indicate the session is full, and btn-sm reduces the button size to small for compact layout consistency, thus here below.
                      <button className="btn btn-disabled btn-sm">Full</button>
                    )
                    : (

                      // step946: else if its not FULL ; we use the Link component used to go to a path mentioned on clicking it ; so we go to the URL which is for the session, using the _id of the sesison given by mongoDB stored in backend, coming from there here in session, thus here below.
                      <Link 
                        to={`/session/${session._id}`} 

                        // step947: now here : btn : applies base button styles, btn-primary: gives the primary theme color (usually blue) to highlight it as the main action, btn-sm: keeps the button small in size, and gap-2 from (Tailwind CSS) adds spacing between the text and icon inside the button for proper alignment, thus here below.
                        className="btn btn-primary btn-sm gap-2"
                      >

                        {/* step948: now inside the button, if the user has joined the session earlier and that session has not yet ended ; then show the "Rejoin" button ; else show the "Join" button, thus here below. */}

                        {/* step949: in backend, the participant is till saved there even if he closes the tab goes ot new tab , goes back by windows BACK BUTTON, etc ; so when he comes back, he is still part of it , so the condition below is true ; so he sees "Rejoin" , but if a session is a fresh new for someone, he sees the "Join" button, thus here below. */}
                        {isUserInSession(session)
                        ? (
                          "Rejoin"
                        )
                        : (
                          "Join"
                        )
                        }

                        {/* step950: we also see a arrow symbol there in either of "Rejoin" or "Join", thus here below. */}
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    )
                    }
                  </div>
                </div>
                ))
              )
              : 
              (
              // step951: now finally this case, when there is no active sessions, then we : show the following div, thus here below.

              // step952: so the below div : uses Tailwind CSS where text-center horizontally centers all text inside this container, and py-16 adds large vertical padding (top and bottom) to create spacious empty-state layout so the content doesn’t feel cramped, thus here below.
              <div className="text-center py-16">

                {/* step953: then the div below : uses Tailwind CSS with DaisyUI theme colors where w-20 h-20 sets fixed width and height (80px) creating a square container, mx-auto horizontally centers it, mb-4 adds spacing below it, bg-gradient-to-br applies a gradient background from top-left to bottom-right, from-primary/20 and to-secondary/20 use DaisyUI theme colors with 20% opacity for soft gradient effect, rounded-3xl gives large rounded corners, flex enables flexbox, items-center vertically centers the icon, and justify-center horizontally centers the icon inside the box, thus here below. */}

                {/* NOTE HERE THAT HERE BELOW : instead of w-20 and h-20 since value for both are same, we can use instead "size-20" by rule REMEMBER THIS, MAY BE USEFUL IN FUTURE BUT FOR NOW CAN KEEP THEM SEPERATELY AS w-20 and h-20 TOO HERE NO PROBLEM BY THAT OBVIOUSLT BUT SIZE-20 IS BETTER always here/there, thus here below. */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">

                {/* step954: icon to be shown here below with primary text color and 50% opacity, giving a subtle, soft and light look / less visible /more transparent look in the icon appearance, thus here below. */}
                  <CodeXml className="w-10 h-10 text-primary/50" />
                </div>

                {/* step955: now here below we have two paragraphs : one of larger font, other smaller ; and one with more opacity than the other with lesser one ; lesse the OPACITY, the more transparent it is and the more light and more less visible it is ; and then we also keep some margin between the two so "mb-1" used to have bottom margin from top paragrpah thus margin/gap between the two paragraphs, thus here below. */}

                {/* step956: can test this by putting session.length > 0 to be replaced with false above ; as this is a conditional rendering and this section gets renderd only when session.length > 0 is false i.e. there are no active sessions here/there, thus here below. */}

                {/* step957: see the next steps in DashboardPage.jsx file now there, thus here below. */}
                <p className="text-lg font-semibold opacity-70 mb-1">No Ongoing Sessions</p>
                <p className="text-sm opacity-50">Create a session to get started!</p>
              </div>
              )
            )}
        </div>
      </div>
    </div>
  )
}

export default ActiveSessions
