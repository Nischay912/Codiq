import { Trophy, TrophyIcon, UserRoundCheck } from "lucide-react"

// step864: so first we destructure and get all the props by the same prop-name that we had mentioned while passing the props, thus here below.
function StatsCards({
  activeSessionsCount,
  recentSessionsCount
}) {
  return (
    // step865: now lets here below have that this div here below will be taking the space of 1 of the columns of the grid with spacings between the cards present inside this div ; and in larger screens and above "lg" , it spans one column of the parent div in dashbaord page where this component was created there, we had made a grid of 3 cols , out of which this div will span 1 col, thus here below ; and there we made grids of 3 cols for larger screens only , so in larger screens only we tell here to take space of 1 of those cols ; as obviously in samller screens grid was not there with 3 cols , so no use of specifying for all the screens obviously here below, thus here below.

    // step866: we also have grid class here below to have this div to behave like a grid with a single column and so : all direct children inside this div will be stacked vertically in a single column layout — one below the other with space or gap of 6 between them — but using CSS Grid instead of flexbox, thus here below.
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">

      {/* step867: now here : we make the active sessions count card first here below , where it : uses DaisyUI’s card component (built on Tailwind) to give a clean card layout with padding and structure, bg-base-100 applies the theme background color, border-2 adds a visible border, border-primary/20 gives a light primary colored border with low opacity, and hover:border-primary/40 makes the border slightly stronger when hovering, thus here below. */}
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40">

        {/* step868: now we use : the card-body class from DaisyUI gives proper inner spacing and layout styling inside the card automatically so we don’t manually add padding everywhere, thus here below. */}
        <div className="card-body">

          {/* step869: so now : the below div uses Tailwind where flex places children in a row, items-center vertically centers them, justify-between pushes the icon box to the left and the badge to the right with space in between, and mb-3 gives spacing below this row before the number text, thus here below. */}
          <div className="flex items-center justify-between mb-3">

            {/* step870: so first we have the icon box here that : uses Tailwind where p-3 adds padding inside the icon box, bg-primary/10 gives a very light primary color background, and rounded-2xl gives smooth rounded corners making it look soft and modern, thus here below. */}
            <div className="p-3 bg-primary/10 rounded-2xl">
              <UserRoundCheck className="w-7 h-7 text-primary" />
            </div>
              {/* step871: now here we have : a DaisyUI component that creates a small pill-style label, and badge-primary applies the primary theme color styling to it and the gap-2 to : uses Tailwind where text-sm makes the label smaller in size and opacity-60 makes it slightly faded so it looks secondary compared to the big number above it, thus here below.  */}

              {/* step872: so we can either have this below a normal badge showing live, thus here below. */}

              {/* <div className="badge badge-primary">
                Live
              </div> */}

                {/* step873: OR we can have this badge with a live indicator ; it creates a small live status indicator using Tailwind CSS where flex items-center gap-2 aligns the red blinking dot and “Live” text in one horizontal row with spacing between them, the outer relative flex h-2 w-2 sets up a tiny positioning container for the dot, the first inner span uses animate-ping from Tailwind to create a continuous expanding ripple effect with absolute positioning, full height and width, rounded shape and semi-transparent red background, the second span sits on top as a solid red circular dot using rounded-full and fixed height/width, and finally the text uses text-sm font-medium for clean readable styling next to the animated indicator, thus here below. */}
                <div className="flex items-center gap-2 bg-primary text-primary-content px-3 py-1 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>

              {/* step874: now the div here below : uses Tailwind where text-sm makes the label smaller in size and opacity-60 makes it slightly faded so it looks secondary compared to the big number above it, thus here below. */}
              <div className="text-4xl font-black mb-1">
                {activeSessionsCount}
              </div>
              {/* step875: now the following div : uses Tailwind where text-sm makes the label smaller in size and opacity-60 makes it slightly faded so it looks secondary compared to the big number above it, thus here below. */}
              <div className="text-sm opacity-60">Active Sessions</div>
          </div>
        </div>

        {/* step876: now similarly here below, we have the recent sessions count card, thus here below. */}

        {/* step877: now see the next steps in DashboardPage.jsx file now there, thus here below. */}
        <div className="card bg-base-100 border-2 border-secondary/20 hover:border-secondary/40">
          <div className="card-body">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <TrophyIcon className="w-7 h-7 text-secondary" /> 
              </div>
            </div>
            <div className="text-4xl font-black mb-1">{recentSessionsCount}</div>
            <div className="text-sm opacity-60">Total Sessions</div>
          </div>
        </div>
      </div>
  )
}

export default StatsCards
