import { UserButton } from "@clerk/clerk-react";
import { BookMarked, CodeXml, SlidersHorizontal } from "lucide-react"
import { Link, useLocation } from "react-router"

function Navbar() {
    // step379: now lets use a field called useLocation coming from react-router, thus here below.
    const location = useLocation();

    // step380: if we try to console log it and visit the /problems page there, then we can see in INSPECT > CONSOLE , that : we see an object there, which has the "/problems" stored in "pathname" field of the object returned by useLocation(), thus here below.
    // console.log(location)

    // step378: now lets create the function which takes a path/route, thus here below.
    const isActive = (path) => {
        // step381: so now we will check the current path using useLocation and compare it with the passed path, thus here below.
        if(location.pathname === path){
            return true;
        }
        return false;
    }

  return (
    // step367: so we will have a nav element, which is a div only but used to represent a navigation bar, just in terms of names/semantics/nomenclature, thus here below.

    // step368: so here we : Create a DaisyUI navbar with semi-transparent background for glass effect, apply backdrop blur to soften content behind it, add a light bottom border and strong shadow for separation, keep it sticky at the top with high z-index so it stays above all content while scrolling, then inside place a centered container with maximum width, padding for spacing, and use flexbox to align items in a row with vertical centering and space between left and right sections, thus here below.

    // step369: NOTE THAT : here : "/80" if removed we won't be able to see the blur even if we add "backdrop-blur-md" in the nav, because : to Make the navbar background semi-transparent using /80 so content behind is visible and backdrop-blur can create the glass/frosted blur effect, otherwise with solid color the blur will not be visible, thus here below.
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
            {/* step370: now we will have a logo here which will be a Link component that takes us to "/" when clicked, thus here below. */}
            <Link
                to={"/"}

                // step371: so here we : Make the container a group so child elements can respond to parent hover effects, use flexbox to arrange items in a row, center them vertically, add spacing between items, slightly enlarge the container on hover using scale, and apply a smooth transform animation with 200ms duration for clean hover transitions, thus here below.
                className="group flex items-center gap-3 hover:scale-105 transition:transform duration-200"
            >
                {/* step372: so here we : Set a fixed square size for the element, apply extra large rounded corners, add a horizontal gradient background using DaisyUI primary → secondary → accent theme colors, use flexbox to perfectly center the content both horizontally and vertically, and add a large shadow to give depth and highlight the icon container, thus here below. */}
                <div className="size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                    <CodeXml className="size-6 text-white" />
                </div>

                {/* step373: now inside the Link only lets have another flexbox with col direction to show the text in logo there one below the other there, thus here below ; we actually had this in the HomePage.jsx too, so lets take it from there and paste it, thus here below. */}
                <div className="flex flex-col ">
                    <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                        Codiq
                    </span>
                    <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
                </div>
            </Link>

            {/* step374: so now : in the navbar, lets make the right part, thus here below ; since we had parent as justify between, so the each independent items here will be justified between, thus here below. */}
            <div className="flex items-center gap-1">
                <Link
                    // step375: so this will take us to the ProblemsPage.jsx, thus here below.
                    to = {"/problems"}

                    // step376: we use {} here to give the classes as these classes here given are dynamic ; first the classes written are given everytime alwyas i.e. : we : Add horizontal and vertical padding for comfortable button size, apply medium rounded corners for a smooth look, and enable smooth animation for all property changes with a 200ms duration to make hover or state transitions feel clean and responsive, thus here below.

                    // step377: then we have a function here below, which if returns true, then we apply a particular set of classes, else we apply another pair of classes there, thus here below.

                    // step378: so if active : Use DaisyUI’s base-content color which represents the default readable text color that automatically contrasts with the background, apply /70 opacity to make the text softer and less prominent, use primary as the main theme highlight color for active elements, use primary-content as the contrasting text color placed on primary backgrounds for proper readability, and if active returns true, then use base-200 as a slightly darker/lighter surface shade for subtle hover backgrounds and section separation, thus here below
                    className={`px-4 py-2.5 rounded-lg transition-all duration-200
                        ${isActive("/problems") 
                        ? "bg-primary text-primary-content" 
                        : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                    }`}
                >
                    <div className="flex items-center gap-x-2.5">
                        <BookMarked className="size-4" />

                        {/* step379: so we keep the text hidden, and visible only if the screen is smaller or above ; so for sm : Display the element as inline so it stays in the same line without breaking onto a new line and only takes the width of its content instead of full width like a block element, thus here below. */}
                        <span className="font-medium hidden sm:inline">Problems</span>
                    </div>
                </Link>

                {/* step380: now similarluy have a link for the DashboardPage.jsx, thus here below. */}
                <Link
                    to = {"/dashboard"}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-200
                        ${isActive("/dashboard") 
                        ? "bg-primary text-primary-content" 
                        : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                    }`}
                >
                    <div className="flex items-center gap-x-2.5">
                        <SlidersHorizontal className="size-4" />
                        <span className="font-medium hidden sm:inline">Dashboard</span>
                    </div>
                </Link>

                {/* step381: now like learnt very earlier, lets put the user button coming from clerk after all the buttons there in navbar with some margins from the left and the top of it there, thus here below. */}

                {/* step382: now see the next steps in ProblemsPage.jsx file now there, thus here below. */}
                <div className="ml-4 mt-2">
                    <UserButton />
                </div>
            </div>
        </div>      
    </nav>
  )
}

export default Navbar
