// step960: lets first get the react function export component boilerplate first using "rfce" > enter, thus here below.

// step961: first lets get this library by doing > cd frontend >"npm i date-fns" > then use the package here below to automatically convert and format dates easily for us than manually writing equations to do so, thus here below.
import { formatDistanceToNow } from "date-fns"
import { Clock, FolderOpen, History, Loader, Loader2Icon, Trophy, Users } from "lucide-react"
import { getDifficultyBadgeClass } from "../lib/utils"

// step962: now lets get the props passed here by destructuring them as by rules its passed as an object and must be destructure dhere below using the {....} syntax in order to use them here below in this function here/there & the name of the props must match to the left hand side of the prop names we gave while passing it to this component in the DashboardPage.jsx file here/there at that time here/there ; so instead of just getting (props) and later using props.sessions or props.isLoading we use the destructured props here below for more easiness and more easily usability, thus here below.
function RecentSessions({ sessions, isLoading }) {
  return (

    // step963: so the div below : uses DaisyUI + Tailwind CSS where card (DaisyUI) applies the structured card component styling with padding and layout defaults, bg-base-100 (DaisyUI theme color) sets the card background to the base surface color, border-2 (Tailwind) applies a 2px border, border-accent/20 uses the DaisyUI accent theme color with 20% opacity for a subtle border, hover:border-accent/30 increases the accent border opacity on hover for interactive feedback, and mt-8 adds top margin spacing to separate this card from elements above it, thus here below.
    <div className="card bg-base-100 border-2 border-accent/20 hover:border-accent/30 mt-8">

      {/* step964: here below : card-body applies proper internal padding and layout spacing inside the card component, keeping consistent structure according to DaisyUI card design system, thus here below. */}
      <div className="card-body">

        {/* step965: now here below in the div : we use Tailwind CSS where flex arranges the icon container and heading horizontally, items-center vertically aligns them in the center, gap-3 adds spacing between them, and mb-6 creates larger spacing below this header row before the content section starts, thus here below. */}
        <div className="flex items-center gap-3 mb-6">

          {/* step966: so here in the flex box, we have the texts and the icon, thus here below. */}

          {/* step967: so here below the div is for the box surrounding the icon, so : the div here below : uses Tailwind CSS with DaisyUI theme colors where p-2 adds inner padding around the icon, bg-gradient-to-br applies a gradient background from top-left to bottom-right, from-accent and to-secondary use DaisyUI theme colors for gradient styling, and rounded-xl gives moderately large rounded corners for smooth visual design, thus here below. */}
          <div className="p-2 bg-gradient-to-br from-accent to-secondary rounded-xl">
            <History className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black">Your Previous Sessions</h2>
        </div>

        {/* step968: now outside the flexbox, but inside the card-body, we now have another div for the grid to show the past sessions, thus here below. */}

        {/* step969: so here below, the div : uses Tailwind CSS where grid enables CSS Grid layout, grid-cols-1 sets 1 column by default (mobile), md:grid-cols-2 changes to 2 columns on medium screens, lg:grid-cols-3 changes to 3 columns on large screens for responsive layout, and gap-4 adds consistent spacing between grid items, thus here below. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* step970: now we do conditional rendering and while the API calls being made to fetch these, we show the first component, else we show the second component, thus here below. */}
          {isLoading 
            ? (
              // step971: so here below now, the div uses : Tailwind CSS where col-span-full makes this element span across all grid columns, flex enables flexbox, items-center vertically centers content, justify-center horizontally centers content, and py-20 adds large vertical padding for proper loading state spacing, thus here below.
              <div className="col-span-full flex items-center justify-center py-20">

                {/* step972: now here below for the loader component, here : animate-spin applies continuous rotation animation for loading effect, and text-primary applies the primary theme color to the loader icon, thus here below. */}

                {/* step973: ALSO : NOTE HERE THAT HERE BELOW : instead of w-20 and h-20 since value for both are same, we can use instead "size-20" by rule REMEMBER THIS, MAY BE USEFUL IN FUTURE BUT FOR NOW CAN KEEP THEM SEPERATELY AS w-20 and h-20 TOO HERE NO PROBLEM BY THAT OBVIOUSLT BUT SIZE-20 IS BETTER always here/there, thus here below.  */}
                <Loader className="w-5 h-5 text-primary animate-spin" />
              </div>
            )

            // step974: so rule is to wrpa these ternary operators rendering in (...) and not {...} ; else will cause syntax JSX error, thus here below.
            : (
              // step975: now when the loading is complete, then we again check if the sessions exist or not to be shown ; if yes then show the first component, else show the second component, thus here below.
              
                sessions.length > 0

                // step976: again rule is to wrpa these ternary operators rendering in (...) and not {...} ; else will cause syntax JSX error, thus here below.
                ? (
                  // step977: now here below, the div : uses Tailwind CSS where col-span-full makes this element span across all grid columns, thus here below.

                  // step978: mapping done same as done in active sessions , so if any doubt can see the ActiveSessions component, thus here below.
                  sessions.map((session) => (
                    <div
                      // step979: we know that each session object in the sessions array of objects : it has the id assigned in "_id" by rule by mongodb that we can use as key as by rule we must put a unique key here when using "map" alwyas by rule of react ; and the key should be placed in the element being rendered for each item, here we render this div for each item, so put the key inside this div as a field, using the syntax as mentioned below here, thus here below.
                      key = {session._id}

                      // step980: now here below : card: applies the DaisyUI card component styling & relative: sets position to relative so that the absolutely positioned elements inside (like status badge) this div now are positioned relative to this card parent div, thus here below.

                      // step981: when the session is active, the class given there : uses Tailwind CSS with DaisyUI theme color where bg-success/10 applies light green background (10% opacity), border-success/30 gives subtle green border, and hover:border-success/60 increases border opacity on hover to highlight active sessions ; and when its not active ; it : uses DaisyUI + Tailwind CSS where bg-base-200 applies neutral background color, border-base-300 gives subtle neutral border, and hover:border-primary/30 adds light primary colored border on hover for inactive sessions, thus here below.
                      className={`card relative
                        ${session.status === "active" 
                          ? "bg-success/10 border-success/30 hover:border-success/60"
                          : "bg-base-200 border-base-300 hover:border-primary/30"
                        }
                      `}
                    >
                      {/* step981: then inside the div for each session we are mapping and returning, we see below now and do conditional rendering i.e. if the session is active ; only then show this BADGE OF ACTIVE DOT PINGING THERE, else no need to render the following for the completed sessions, thus here below. */}

                      {session.status === "active" && (

                      // step982: so here below : the dive : uses Tailwind CSS where absolute positions this element absolutely inside its nearest relative parent which was the div we made above , so its positioned at the top and right mentioned below from/with respect to the nearest parent div with "relative" class in it here/there above, thus here below ; then here : top-3 moves it slightly from top, and right-3 positions it slightly from right corner, placing the status badge neatly at the top-right of the card, thus here below.
                        <div className="absolute top-3 right-3">

                          {/* step983: so now : the div below : uses DaisyUI + Tailwind CSS where badge creates the pill-style component, badge-success applies green success theme color, and gap-1 adds small spacing between badge content elements inside it, thus here below. */}
                          <div className="badge badge-success gap-1">

                            {/* step984: now the div below is a self-closing div : uses Tailwind CSS with DaisyUI theme color where w-1.5 h-1.5 creates a very small dot, bg-error gives it red color, rounded-full makes it perfectly circular, and animate-pulse applies pulsing animation to indicate live/active state visually ; so eventually this active badge will look like a pulsing red dot there in the badge, thus here below. */}
                            <div className="w-1.5 h-1.5 bg-error rounded-full animate-pulse" />
                              ACTIVE
                          </div>
                        </div>
                      )}

                      {/* step985: now here below : we have a div, which : uses DaisyUI + Tailwind CSS where card-body (DaisyUI) applies structured internal padding and layout for card content, and p-5 (Tailwind CSS) overrides/adds uniform padding on all sides for slightly tighter spacing control, thus here below. */}
                      <div className="card-body p-5">

                        {/* step986: now inside the card body div, we now below have another flexbox div that : uses Tailwind CSS where flex arranges children horizontally, items-start aligns them at the top instead of center (useful for multi-line text alignment), gap-3 adds spacing between icon container and text section, and mb-4 creates spacing below this block before next content, thus here below. */}
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            // step987: now here below : we have div that : uses Tailwind CSS where: w-12 h-12 : sets fixed square size (48px), rounded-xl: applies moderately large rounded corners, flex: enables flexbox inside the box, items-center: vertically centers the icon, and justify-center: horizontally centers it, while the conditional gradient classes dynamically change background styling based on session status, thus here below.

                            // step988: then we also have a class based onn if the session is active then the class: uses Tailwind CSS with DaisyUI theme color where bg-gradient-to-br applies gradient from top-left to bottom-right, from-success starts with green success color, and to-success/70 fades to 70% opacity of the same color for active session visual indication ; else if not then : we have a class that : uses Tailwind CSS with DaisyUI theme colors where the gradient transitions from primary theme color to secondary theme color for non-active sessions, giving visual differentiation, thus here below.
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              session.status === "active"
                                ? "bg-gradient-to-br from-success to-success/70"
                                : "bg-gradient-to-br from-primary to-secondary"
                            }`}
                          >
                            {/* step989: now we have the icon in white color its outlines using text-white and since both w-6 h-6 used, so we can also have : size-6 instead of w-6 h-6 as by rule : size-6 is a substitute for w-6 h-6, thus here below. */}
                            <Code2 className = "w-6 h-6 text-white" />
                          </div>

                          {/* step990: now lets have a div which : uses Tailwind CSS where flex-1 allows this section to take remaining horizontal space inside flex layout, and min-w-0 prevents overflow by allowing content like long titles to shrink properly inside flex container, thus here below ; so basically like we told about uses of min-w-0 in activeSessions component too, can see there if want to know why used, its basically used to ensure that the text has minm of some enought width possible and is not overflown ; its usually always used as parent of class with truncate" , we surely have truncate class below it which makes extra part into ... ; but then for rest to fit there and not overflow, this min-w-0 is used here/there, to make sure that its not overflown here/there, thus here below. */}

                          {/* step991: and flex-1 ensures that we make the problem statement here to take all remaining space in the flexbox layout, thus here below. */}
                          <div className="flex-1 min-w-0">

                            {/* step992: so now the div here below : uses Tailwind CSS where font-bold increases font weight, text-base keeps standard readable size, mb-1 adds small spacing below title, and truncate prevents long text from breaking layout by applying ellipsis (...) when it overflows in a single line, thus here below. */}
                            <h3 className="font-bold text-base mb-1 truncate">{session.problem}</h3>

                            {/* step993: so now here below : the div : uses DaisyUI + Tailwind CSS where, badge: creates pill-style label component, badge-sm: reduces its size, and getDifficultyBadgeClass(session.difficulty): dynamically adds theme color classes (like success, warning, error) based on difficulty level, thus here below. */}
                            <span className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`} >
                              {session.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* step994: now outside the flexbox i.e. belwo the heading of the card ; but still inside the card-body, now lets have the session details one below the other, with space-y-2 telling the gap between each of the components inside it vertically there to be, thus here below. */}

                        {/* step995: so the div below : uses Tailwind CSS where space-y-2 adds vertical spacing between each direct child element, text-sm sets smaller font size for secondary information, opacity-80 slightly fades the text for subtle UI tone, and mb-4 adds spacing below this block before the next section, thus here below. */}
                        <div className="space-y-2 text-sm opacity-80 mb-4">

                          {/* step996: now we have a flexbox here below to have the clock icon and the time shown in a same horizontal row, thus here below. */}
                          <div className="flex items-center gap-2">

                            {/* step997: so the icon below : uses Tailwind CSS where w-4 h-4 sets fixed icon size (16px) to keep it small and consistent with metadata styling, and since both w-6 h-6 used, so we can also have : size-6 instead of w-4 h-4 as by rule : size-4 is a substitute for w-4 h-4, thus here below. thus here below. */}
                            <Clock className="w-4 h-4" />

                            {/* step998: then next to the icon in the flexbox, we have a span that has the time duration like how long ago the session started, thus here below. */}
                            <span>
                              {/* step999: so the date-fn package provides with this function "formatDistanceToNow" which tells : How much time has passed between a given date and now ; example: if session was created at : 2026-02-09 2:00 AM ; and time now is : 2026-02-09 4:00 AM, then it returns : 2 hours, thus here below. */}

                              {/* step1000: we know mongoDB gave us the session object, so it has createdAt: "2026-02-09T01:45:00.000Z" ; createdAt is stired as a string ; its not a Date object yet ; but : formatDistanceToNow() needs a Date object, not a string ; So we convert the string into a real JavaScript Date object using new Date(), thus here below. */}

                              {/* step1001: new Date("2026-02-09T01:45:00.000Z") : so now JavaScript understands it as a real date ; and then we can add an optional object called { addSuffix: true } to formatDistanceToNow() to get the time duration with also 'ago' at the end in it like "2 hours ago", thus here below. */}

                              {/* step1002: so overall it compares time passed in it to the current time and returns the duration, thus here below. */}

                              {/* step1003: it knows the current current time and date using the new Date function that reads the current date and time from the system clock or from the NodeJs running in the serve there in the backend, from there gets the current server time and date, and thus gets the local time zone, thus here below. */}
                              {formatDistanceToNow(new Date(session.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>

                          {/* step1004: now below the time duration, we have another flexbox now below it ; this is another div, so it will be below the above flexbox ; but it will have now all the contents i.e. the users icon and the number of participants will be in the same horizontal row now in the same flexbox, thus here below. */}
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />

                            {/* step1005: now beside the icon, lets have the number of participants, thus here below. */}
                            <span>
                              {/* step1006: so here below, we see if the session that was created by the host had any participant joined in it or not ; and then : if there is a participant, then it will show 2 participants, else it will show 1 participant, thus here below. */}
                              {session.participant ? "2" : "1"} participant

                              {/* step1007: again based on if 2 is there we show plural i.e. "participants" or else in case of 1, we show singular i.e. "participant", thus here below. */}
                              {session.participant ? "s" : ""}
                            </span>
                          </div>
                        </div>

                          {/* step1008: now below the above flexbox, we have another flexbox now below it ; this is another div, so it will be below the above flexbox ; but it will have now all the contents i.e. the status of the session and the date created will be in the same horizontal row now in the same flexbox, thus here below. */}

                          {/* step1009: so we have another flexbox here, with justify between, so now the status will be on the leftmost side and date on rightmost with space in between due to "justify-between", thus here below. */}

                          {/* step1010: so the div below : uses Tailwind CSS + DaisyUI theme color where flex arranges children horizontally, items-center vertically aligns them, justify-between pushes one item to the left and the other to the right, pt-3 adds padding at the top to create spacing from content above, border-t adds a top border line, and border-base-300 applies a neutral theme border color from DaisyUI for subtle separation, thus here below. */}
                          <div className="flex items-center justify-between pt-3 border-t border-base-300">

                            {/* step1011: so now below we have a text, that : uses Tailwind CSS where text-xs makes the label small, font-semibold slightly increases font weight for emphasis, opacity-80 softens the visibility a bit, and uppercase transforms the text into all capital letters for stylistic section labeling, thus here below. */}
                            <span className="text-xs font-semibold opacity-80 uppercase">Completed</span>

                            {/* step1012: then we have the below span to show the date when the session was last updated , and its the 2nd item of the flexbox , so it will be on the rightmost side with space in between with the component above, due to the usage of "justify-between" in the/ in this flexbox here/there made above here/there, thus here below. */}
                            <span className="text-xs opacity-40">

                              {/* step1013: now for the date of last updated, we pass the updatedAt field coming from MongoDB into this new Date() function to convert it into a Date object from a string that comes as a string usually from the backend i.e. from the MongoDB database there, thus here below. */}

                              {/* step1014: so now we get the updatedAt field and then use the built-in method to : Convert this date into a readable string based on the user’s location ;  so instead of : Mon Feb 09 2026 08:00:00 GMT+0530, it becomes : 09/02/2026 or 2/9/2026 depending on the local pc or computer of the user, thus here below. */}

                              {/* step1015: so : Locale = your regional settings ; 🇮🇳 India → 09/02/2026 ; 🇺🇸 USA → 2/9/2026 ; 🇬🇧 UK → 09/02/2026 and so on... , thus here below.*/}
                              {new Date(session.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                      </div>
                    </div>
                  ))
                )
                // step1016: now we show the following if there are no sessions yet i.e. sessions.length > 0 is false, thus here below
                : (
                  // step1017: so we have the div here below that : uses Tailwind CSS where col-span-full makes this element span across all columns in a grid layout ; as the grid we had had many columns but now we want to show this text there in whole grid across wholw of it, so we use this to make it span across all columns of grid and show this in the whole grid and text-centre to centrally place it in the grid and dhow its contents there, thus here below ; then we have text-center that/which : horizontally centers all inner text, and py-16 adds large vertical padding to create spacious empty-state design, thus here below.
                  <div className="col-span-full text-center py-16">

                    {/* step1018: then we have the following flexbox with a single item, just to use items and justify centre on the icon in this and thus keep it centrally aligned and placed there, thus here below. */}

                    {/* step1019: so the below div : uses Tailwind CSS with DaisyUI theme colors where w-20 h-20 sets fixed square size (80px), mx-auto horizontally centers the box, mb-4 adds spacing below it, bg-gradient-to-br applies a gradient from top-left to bottom-right, from-accent/20 and to-secondary/20 use DaisyUI theme colors with 20% opacity for a soft background effect, rounded-3xl gives large rounded corners, and flex items-center justify-center centers the icon perfectly inside the box, thus here below. */}
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                      <FolderOpen className="w-10 h-10 text-accent/50" />
                    </div>

                    {/* step1020: then now we have two paragraphs one belwo the other ther, as by rule <p> is a block level element, so: the second paragraph will be placed below the first paragraph automatically there as its not in a flexbox to keep it horizontally in one row; so it appers one below the other and also below the icon as icon was also in a div and div is also a block level element ; so thus here the icon and these 2 paragraphs, all appear one below the other here/there, thus here below. */}

                    {/* step1021: so the following paragraph uses: Tailwind CSS where text-lg increases font size for emphasis, font-semibold slightly thickens the text, opacity-70 softens the tone for UI balance, and mb-1 adds small spacing below before the next paragraph, thus here below. */}
                    <p className="text-lg font-semibold opacity-70 mb-1">No sessions yet</p>

                    {/* step1022: finally this paragraph uses: Tailwind CSS where text-sm reduces font size for secondary message and opacity-50 makes it lighter to visually indicate supportive descriptive text, thus here below. */}

                    {/* step1023: see the next steps in step1024.txt file now there, thus here below. */}
                    <p className="text-sm opacity-50">Start your coding journey today!</p>
                  </div>
                )

            )
          }
          
        </div>


      </div>
    </div>
  )
}

export default RecentSessions
