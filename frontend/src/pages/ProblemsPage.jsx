import { BookOpen, Code2Icon, StepForward } from "lucide-react"
import Navbar from "../components/NavBar"
import { PROBLEMS } from "../data/problems"
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {

  // step387: now lets get the PROBLEMS from the data folder ; since PROBLEMS itself was an object there, lets cretae it into an array fo objects using the syntax here below ; can test this on INSPECT > CONSOLE > CLEAR ALL > PASTE THE PROBLEMS OBJECT FROM DATA FOLDER > THEN PUT THE LINE BELOW AND PRINT TI, IT WILL PRINT AN ARRAY FO THOSE OBJECTS THERE, HENCE PROVED, thus here below.

  // step388: we converted it to array, so that we can apply the map function on it later and map through each of them and print about each of that problem there one-by-one there, thus here below.
  const problems = Object.values(PROBLEMS);

  // step417: now lets have the states to get the count of problems based on difficulty, thus here below.

  // step418: so we use filter which loops through each element of the array and assumes it to be the variable "p" defined below & then finds all the "p" whose difficulty is easy and then return a new array, which has only those problems whose difficulty is easy, thus here below.
  const easyProblemsCount = problems.filter(

    // step419: can name this as even "problem", it WON'T CONTRADICT WITH THE ARRAY NAMED PROBLEMS CREATED ABOVE, as this variable loses its scope and gets destroyed once the filter ends, it has the scope within the filter only and hence so has no affect on the states or function's names contradiction present outside this, haan agar filter ke andar, issi filter ke andar ek aur "p" hota toh can't take another p, ya agar ek aur "problems" name ka fucntion, variable ya array iss filter ke andar hota toh can't take another "probelms" name ka variable, array or function inside this filter, but thats not the case here, so can take any name for each element being iterated in the array to filter it out by checking each element/problem's difficulty there/here, thus here below.
    p => p.difficulty === "Easy"
  ).length // NOTE HERE IMPORTANT THAT : In JavaScript , the length property has no () to be used, its just "length" without any (), thus here below.
  
  // step420: similarly, we will have the count of medium problems and the count of hard problems too, thus here below.
  const mediumProblemsCount = problems.filter(
    p => p.difficulty === "Medium"
  ).length

  const hardProblemsCount = problems.filter(
    p => p.difficulty === "Hard"
  ).length

  return (
    // step364: so here we : Set the minimum height to full screen so the section always covers the entire viewport height, and apply DaisyUI’s base-200 background color to give a soft themed background shade for the page, thus here below.
    <div className="min-h-screen bg-base-200">

      {/* step365: now except the homepage, we will be having the same navbar on all pages, so lets create a component for it here, and we will be using it on all pages, thus here below. */}

      {/* step366: so see the next steps in Navbar.jsx file now there, thus here below. */}
      <Navbar />

      {/* step383: now lets have the main content below the navbar now where we : Set a maximum width limit to prevent the content from stretching too wide on large screens, center the container horizontally using auto margins, add horizontal padding for left and right spacing, and add vertical padding for top and bottom space to create a clean and well-spaced layout, thus here below. */}
      <div className="max-w-6xl mx-auto px-4 py-12">

          {/* step384: so now lets have the header title, thus here below. */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Coding Challenges</h1>

            {/* step385: now lets have the paragraph below the header, where we : Apply DaisyUI’s base-content text color for readable theme-consistent text and reduce its opacity to 70% to create a softer, muted appearance that is less prominent than headings, thus here below. */}
            <p className="text-base-content/70">Improve your skills with handpicked problems</p>
          </div>

          {/* step386: now lets have the problems list here below with space-y-4 to have all the elements to have some space between them, thus here below. */}
          <div className="space-y-4">

            {/* step389: so now lets map through the array of objects and it gets every single object as "problem" here below and then then return something for each of them, thus here below. */}
            {problems.map((problem) => (
              // step390: so we will have a link component for each of thoses "problem" that represents each of the item we map in the problems array, thus here below.
              <Link
                // step391: react expects every element being mapped and rendered using "map" to have a unique key, so lets set it up, thus here below.
                key={problem.id}

                // step392: so it will take us to the following route, based on the problem's id, thus here below.
                to ={`/problem/${problem.id}`}

                // step393: so here we : Use DaisyUI card component styling with base theme background for a clean surface, slightly enlarge the card on hover using a small scale effect for interactivity, and apply transition-transform so only transform changes animate smoothly for a polished hover experience, thus here below.
                className="card bg-base-100 hover:scale-[1.01] transition-transform"
              >
                {/* step394: now inside this Link, we will have a "div" that : Use DaisyUI’s card-body utility to add proper inner padding and spacing inside the card and automatically structure the content neatly for titles, text, and actions, thus here below. */}
                <div className="card-body">

                  {/* step395: so now we have a flexbox here below, that will have the items at left and right ends with space between them, thus here below. */}
                  <div className="flex items-center justify-between gap-4">

                    {/* step396: so now : lets have the left side section made ; it will be a long section , so we use "flex-1" here so that in justify between whatever is the extra space in between gets taken by this left section and right part being small is kept on the other side , and left side takes all remaining available space inside the flex container so that the content stretches properly while other elements stay aligned to the side, thus here below. */}
                    <div className="flex-1">

                      {/* step397: so now here we : Arrange items in a row using flexbox, vertically center them, add spacing between each item, and give bottom margin for separation from the content below, then create a fixed square icon container, apply medium rounded corners, use a light primary-colored background for subtle highlight, and use flexbox to perfectly center the icon inside it, thus here below. */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          {/* step398: now lets add the icon here below to be shown in left side of each card, thus here below. */}
                          <Code2Icon className="size-6 text-primary" />
                        </div>

                        {/* step399: now lets have another div to display the problem title and other details, thus here below. */}

                        {/* step400: so here we : Earlier we had flex-1 which : Makes the entire left section take all remaining space & Pushes right-side content (like badges/buttons) to the far right and now here again we : Use flex-1 again inside the inner flex row so the text section expands beside the fixed icon and takes the remaining available space independently within that container, thus here below. */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xlf font-bold">{problem.title}</h2>

                            {/* step401: now lets have a normal class "badge" which uses DaisyUI’s badge component to display small labeled tags or status indicators with a compact pill-shaped design, commonly used to show categories, difficulty, or highlights in a clean and visually distinct way, thus here below. */}

                            {/* step402: then we have another class given dynamically to give colors based on difficulty, thus here below */}

                            {/* step403: so see the next steps in utils.js file now there, thus here below. */}
                            <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
                          </div>

                          {/* step408: now lets have the problem category, thus here below. */}

                          {/* step409: so here we : Set small text size for secondary or less important information, apply DaisyUI’s base-content color with 60% opacity to create a soft muted look, making the text subtle and less prominent than main headings, thus here below. */}
                          <p className="text-sm text-base-content/60">{problem.category}</p>
                        </div>
                      </div>

                      {/* step410: now lets have the problem description, thus here below. */}
                      <p className="text-base-content/80 mb-3">{problem.description.text}</p>
                    </div>

                    {/* step411: now lets have the right side section, thus here below. */}
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium">Attempt</span>

                      {/* step412: now lets have the icon of arrow right, thus here below. */}
                      <StepForward className="size-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* step413: now lets have the count of problems section, thus here below. */}

          {/* step414: so now we : Add top margin to create spacing from the content above, use DaisyUI card component with base theme background and large shadow for a raised container look, place content inside card-body to get proper padding and spacing automatically, then use DaisyUI stats component to display statistics neatly, stack them vertically by default and switch to horizontal layout on large screens for responsiveness, and each stat block represents one individual statistic item inside the stats section, thus here below.

           stats: Create a DaisyUI stats container that automatically arranges multiple stat items in a clean grouped layout with proper spacing and alignment, thus here below.

           stats-vertical: Stack all stat items vertically (one below another) for small screens or mobile view, thus here below.

           lg:stats-horizontal: Switch the stats layout to horizontal (side-by-side in a row) on large screens for better desktop presentation and space usage, thus here below.

           stat: Define one individual statistic block inside the stats container that groups a title, value, and description together with consistent padding and alignment, thus here below.

           stat-title: Style the small heading/label of the stat with lighter, muted text to describe what the number represents, thus here below.

           stat-value Style the main number/value with large bold text to make it the most prominent and eye-catching part of the stat, thus here below.

          stats
          ├─ stat
          │   ├─ stat-title
          │   └─ stat-value

           Its like simply means : label → big number → small info ; thus here below.            

          */}
          <div className="mt-12 card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="stats stats-vertical lg:stats-horizontal">

                {/* step415: Now, lets make the each of the stat, thus here below. */}
                <div className="stat">
                  <div className="stat-title">Total Problems</div>

                  {/* step416: clearly length of the problems array is the total number of problems, thus here below. */}
                  <div className="stat-value text-primary">{problems.length}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Easy</div>

                  {/* step421: now lets get the difficulty using the variables defined in the previous steps there, thus here below. */}

                  {/* step422: see the next steps in step423.txt file now there, thus here below. */}
                  <div className="stat-value text-success">{easyProblemsCount}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Medium</div>
                  <div className="stat-value text-warning">{mediumProblemsCount}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Hard</div>
                  <div className="stat-value text-error">{hardProblemsCount}</div>
                </div>

              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default ProblemsPage
