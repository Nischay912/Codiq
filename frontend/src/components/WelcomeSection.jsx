// step783: write "rfce" > enter to get the boilerplate first of react functional export component , thus here below.

import { useUser } from "@clerk/clerk-react"
import { ArrowRightIcon, CodeXml, MonitorPlay, SparkleIcon } from "lucide-react"

//  NOTE HERE THAT BELOW: we are getting the function sent as PROP here by syntax {..} to destructure and use the props here/there in this component, thus here below.
function WelcomeSection({ onCreateSession }) {
  // step784: use the useUser hook of clerk to get the logged-in user details, thus here below.
  const { user } = useUser()

  return (
    // step785: now we Set position to relative so child elements can be positioned properly inside it if needed and hide any overflowing content outside its boundary using overflow-hidden ; we should know that : overflow-hidden → hides extra content ; overflow-auto → adds scrollbar only if needed ; overflow-scroll → always shows scrollbar ; overflow-visible → lets content overflow outside normally (default), thus here below.
    <div className="relative overflow-hidden">

        {/* step786: inside the above div, we : set another container with relative positioning, limit maximum width to 7xl so content does not stretch too wide on large screens, center it horizontally using mx-auto, and add horizontal padding px-6 and vertical padding py-16 for proper spacing */}

        {/* step787: here we use "relative" so that if any child of it is positioned absolute top-0 right-0 and all it will be positioned relative to this div, and we had "relative" in outer too ; so for that div , its relative so its children will be absolute poistioned if done, w.r.t to that div then there, thus here below. */}
        <div className="relative max-w-7xl mx-auto px-6 py-16">

            {/* step788: then inside that use flex from Tailwind CSS to arrange items in a single row, align them vertically in center using items-center, and push them to opposite ends using justify-between so one item stays on left and the other on right, thus here below. */}
            <div className="flex items-center justify-between">

                {/* step789: now parent is flex with justify between, so it expects 2 direct children to be on both ends with space between ; so we have the 1st div here below, that has no classes, not needed ; its just to wrap the logo and all here as the 1st element of flexbox to eb together on the left end, thus here below. */}
                <div>

                    {/* step790: now here below : The outer div is using Tailwind CSS (and works nicely with DaisyUI theme colors) to place the logo and the welcome satetement in a single horizontal row, vertically centered, with some space between them and margin at the bottom for spacing from the next section, thus here below.*/}
                    <div className="flex items-center gap-3 mb-4">

                        {/* step791: now : The inner div creates a fixed-size square box (12x12), gives it large rounded corners, applies a gradient background using DaisyUI theme colors from primary to secondary diagonally, and then uses flexbox again to perfectly center whatever is inside it (like an icon) both horizontally and vertically, thus here below. */}
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <CodeXml className="w-6 h-6 text-white" />
                        </div>

                        {/* step792: now we have the following h1 : using Tailwind CSS + DaisyUI theme colors to create a big stylish gradient heading ; so here : text-5xl makes the text very large, font-black makes it extra bold and thick, bg-gradient-to-r from-primary via-secondary to-accent creates a left-to-right gradient background using DaisyUI theme colors (primary → secondary → accent), bg-clip-text clips that gradient so it only appears inside the text shape, and text-transparent makes the actual text color transparent so the gradient becomes visible through it, thus giving that colorful gradient text effect instead of normal plain text, thus here below. */}
                        <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">

                        {/* step793: now here below, we use optional chaining to prevent errors like "cannot read property 'name' of undefined" , so we check if the user is not defined no need to try to access the name as it will show "cannot read property 'name' of undefined" error and app may crash ; rather if left side of || is undefined , we show "coder" to fill the sentence "welcome back, coder" and look and sound good there, without breaking the app and crashing the website or the app here, thus here below. */}
                            Welcome back, {user?.firstName || "Coder"}!
                        </h1>
                    </div>

                    {/* step794: now we come out of the upper flexbox as now we want to show the paragraph below the logo and welcome line ; but we still are inside the single <div> we had as that div is the 1st element of the outer flexbox that has justify-between ; so overall this paragraph will still be aligned to the left of the outer flexbox, thus here below. */}

                    {/* step795: so here : text-xl makes the text a little larger than normal, text-base-content/60 uses DaisyUI theme color and applies 60% opacity so the text looks slightly faded or lighter (good for subtitle or secondary text), and ml-16 adds left margin spacing so the text shifts to the right side a bit (usually to align it under something like an icon or heading above it), thus here below. */}
                    <p className="text-xl text-base-content/60 ml-16">
                        Ready to improve your coding skills?
                    </p>
                </div>
                    {/* step796: now we come out of the 1st div inside the flexbox with justify between, so the button here below now will be on the right end of the flexbox as its the 2nd element of the flexbox with justify between here/there, thus here below. */}
                    <button
                        // step797: calls the function we passed as prop and makes the modal to be visible / TRUE there, as per the function defination that was passed got triggered when button clicked as it had () => and byy rule methods with () => are not executed automatically when rendered, but when clicked, thus here below.
                        onClick={onCreateSession}

                        // step798: so here : group is a Tailwind utility that lets child elements react to the parent’s hover state i.e. if parent is hovered then children will also be hovered if they use group-hover in their classes there ; (like using group-hover: inside children), px-8 py-4 adds horizontal and vertical padding to make the button/box bigger and well spaced, bg-gradient-to-r from-primary to-secondary applies a left-to-right gradient using DaisyUI theme colors primary → secondary, rounded-2xl gives large smooth rounded corners, transition-all duration-200 enables smooth animation for all property changes over 200ms, and hover:opacity-90 slightly reduces opacity on hover to give a soft interactive effect, thus here below.
                        className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90"
                    >
                        {/* step799: now inside the button we have the div , where the classes here : makes everything inside stay in one horizontal line using flexbox, vertically center aligned, with small spacing between them, white text color, bold weight, and slightly larger text size, thus here below. */}
                        <div className="flex items-center gap-3 text-white font-bold text-lg">
                            <MonitorPlay className="w-6 h-6" />
                            <span>Create Session</span>

                            {/* step800: so here : group-hover:translate-x-1 makes the arrow move slightly to the right when the parent (which has group class) is hovered, and transition-transform makes that movement smooth instead of instant, thus here below. */}

                            {/* step801: see the next steps in DashboardPage.jsx file now there, thus here below. */}
                            <ArrowRightIcon className="w-5 h-5 group-hover: translate-x-1 transition-transform" />
                        </div>
                    </button>
            </div>
        </div>
    </div>
  )
}

export default WelcomeSection
