import { getDifficultyBadgeClass } from "../lib/utils";

// step499: lets destructure the props that were sent here as they are sent as an object internally, so we destructure the needed props using {...} format for destructuring, thus here below.
function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return (

    // step500: so here we will return this component, thus here below.

    // step501: so here we : Set the element’s height to fill its parent container completely, enable vertical scrolling when the content exceeds the available height, and apply DaisyUI’s base-200 background color to give a soft themed surface for scrollable content areas, thus here below.
    <div className="h-full overflow-y-auto bg-base-200">
      
      {/* step502: Now here : we will have the problem header section, thus here below. */}

      {/* step503: so here we are : Add padding for comfortable inner spacing, apply DaisyUI base background color for a clean header surface, add a bottom border with base-300 color to visually separate it from the content below, then use flexbox to place items at the left and right ends while aligning them to the top, add bottom margin for spacing, thus here below.
 */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">

            {/* step504: so here we now : style the heading with large bold text using base-content color for clear readable emphasis, thus here below. */}

            {/* step505: so the items in this will be aligned left and will have space between them due to justify-between, thus here below ; here we have flex without flex-col, so items-start will align them at start along the cross axis i.e. along the other axis than the flex direction ; so here flex box is horizoantal, so it places them at start i.e. top i.e. at start in the vertical direction in the flexbox, maintaing gap between them as justify-between was used between them/on them, thus here below. */}
            <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>

            {/* step506: so on the other end at start i.e. top of cross-axis opposite to flex axis i.e. vertically at start/top , we put a badge with the difficulty of the problem, thus here below. */}

            {/* step507: so we have the badge class given always , but color given based on thi =s funciton we defined in utils.js file earlier there, thus here below. */}
            <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
        </div>

        {/* step508: now lets have the problem's category and here we : Apply DaisyUI’s base-content text color with 60% opacity to make the text softer and muted, keeping it readable but less prominent than primary text or headings, thus here below. */}
        <p className="text base-content/60">{problem.category}</p>

        {/* step509: now lets form a problem selector dropdown there, thus here below. */}
        <div className="mt-4">

        {/* step510: <select> creates a dropdown in HTML ; now the value of this dropdown will be controlled by the variable "currentProblemId", thus here below. */}

        {/* step511: now with the classes, we : render a clean dropdown, apply the small size variant for a compact height, make it take full available width */}
            <select 

                className="select select-sm w-full"

                // step512: so now the value of the dropdown will depend on the variable "currentProblemId", thus here below ; so here we : set the value of the dropdown to the value of the variable "currentProblemId", thus here below.
                value={currentProblemId}

                // step513: now : When something happens in the browser (click, type, select change), the browser creates an event object and gives it to your function : its the "e" here > so now e.target is the element that triggered the event i.e. the select and then we take the selected value and pass it to the onProblemChange function to change the selected problem to that selected problem there, thus here below.
                onChange={(e) => onProblemChange(e.target.value)}
            >
                {/* step514: now inside this select dropdown, we will map through the array that was passed in this function ; thats why we passed PROBLEMS here in this function after converting it to arrays using Object.values(PROBLEMS) there earlier in the step498 there in ProblemPage when apssing it as prop, because : operations like .map can be done on it easily htere, as objects are harder to iterate as such in JSX, so converting to array makes it easier to map through it there, thus here below.  */}

                {/* step515: so now we use the <option> tag which is a child of the <select> tag, used to give the options available in the dropdown ; so we loop throught the problems and create an option  using that problem ; we put key as by rule react tells to madatory have a unique id for every element whenever using "map" in react, thus here below. */}

                {/* step516: and we have kept the value of the option as the problem's id, and this "value" is the one thats sent in e.target.value we used above earlier and so it must match problem.id too as later we will use the value of the selected option to update many things based on that id there like "two-sum" nd all that were "id" in PROBLEMS earlier there, thus here below ; so overall we can say that : The dropdown value must match problem.id so the selected option, URL, and data lookup all point to the exact same problem, thus here below. */}

                {/* HERE NOTE THAT : IN MAP : THE ONE WE PUT IN (PROBLEM) OR (P) BELOW REFERS TO EACH ITEM LIKE AN ITERATOR THAT REFERS TO EACH ITEM ONE BY ONE AS WE MAP THROUGH ALWAYS THERE, THUS HERE BELOW. */}
                {allProblems.map((problem) => (
                    <option 
                        key={problem.id} 
                        value={problem.id}
                    >
                        {/* step517: so in browser, "value" mentioned above gets stored when an option is selected in e.target.value ; but what the user sees for that option is mentioned and written inside option tag always, thus here below. */}
                        {problem.title} - {problem.difficulty}
                    </option>
                ))}
            </select>
        </div>
      </div>

      {/* step518: now lets have the problem's other info section now there/here now ; to : Add padding on all sides for comfortable inner spacing, and apply vertical spacing between all direct child elements so that each section is evenly separated without manually adding margins, thus here below. */}
      <div className="p-6 space-y-6">

        {/* step519: now lets have the first section of the div, which will be hacing space-y-6 from top-bottom with other sections of this div like mentioned above, thus here below. */}

        {/* step520: now we : Apply DaisyUI base background color for a clean surface, add extra large rounded corners for smooth edges, use a small shadow for subtle depth, add padding for inner spacing, and include a light border with base-300 color to softly define the container boundary ; so bg-base-100 here gives the section a different color than the parent background color there, thus here below. */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            {/* step521: now lets have the first top there to be description, so we : Set slightly large text size for prominence, apply bold font weight for strong emphasis, and use DaisyUI base-content color to ensure clear readable text that adapts to the current theme, thus here below. */}
            <h2 className="text-xl font-bold text-base-content">Description</h2>

            {/* step523: now lets have the decsription text of the questions to be here, thus here below. */}

            {/* step524: so here we : Add vertical spacing between all direct child elements, set the text to base/default size for normal readability, and apply relaxed line height to increase spacing between lines when they go to next line there for more comfortable reading, thus here below ; Line-height = vertical distance between lines of text ; so : leading-tight → less space, leading-normal → default, leading-relaxed → more breathing space, thus here below ; also its inside a div so text automaticlaly goes to next line and notoverflows to remian inside that div ; it will overflow if you explicitly mention whitespace-nowrap there, but why would you hai na, thus here below.*/}
            <div className="space-y-3 text-base leading-relaxed">
                {/* step525: now lets have the problem's actual description in a p-tag having the color using daisy ui's text-base-content color with 90% opacity ; opacity added to make it look a bit darker than the base-content color, thus here below. */}
                <p className="text-base-content/90">{problem.description.text}</p>

                {/* step526: now we in problem.js had > "notes" array of strings too there, so we will map through that array of strings and show them here one by one using a map, thus here below. */}

                {/* step527: react also asks for a unique key for every item to be rendered using map, so lets put a "idx" by ourselves here that will be 0,1,2.... for each element automaticallya nd then thus that be the key there, thus here below. */}

                {/* step528: so here we : Loop through the notes array, create one paragraph for each note, give each a unique key for React rendering, apply slightly strong text color, and display the note content dynamically, thus here below ; so we have each element stored in "note" and each index stored in "idx, thus here below. */}
                {problem.description.notes.map((note, idx) => (
                    <p
                        key = {idx}
                        className="text-base-content/90"
                    >
                        {note}
                    </p>
                ))}
            </div>
        </div>

        {/* step529: so above was the 1st element in the outer div of space-y-6, now lets have the EXAMPLE SECTION BELOW, which will have space-y-6 applied as by rule outer div of these had space-y-6 i.e. vertical margin of 6 for / between each element, thus here below. */}

        {/* step530: so now lets : Create a container with DaisyUI base background color for a clean surface, apply extra large rounded corners for smooth edges, add a small shadow for subtle depth, include padding for inner spacing, and add a light border using base-300 color for soft separation, thus here below. */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">

            {/* step531: now : then style the heading with slightly large bold text, add bottom margin for spacing from content below, and use base-content color to keep the text clearly readable and theme-consistent, thus here below. */}
            <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>

            {/* step532: now lets have another div with space-y-4 i.e. all elements inside this will be vertically spaced with margins between them, thus here below. */}
            <div className="space-y-4">

                {/* step533: now lets map through the all the examples in the "examples" array in problems.js and then again have key as idx 0,1,2... and then print every example with index+1 i.e. example1 , example2, example3, thus here below. */}
                {problem.examples.map((example, idx) => (

                    // step534: we must use this extra <div> with key as the outer element, as "map" expects to render one element only for each element, so we must wrap all with a div and key in it ; can also use <> , but we can't put key in it, unless written as <Fragment key={idx}>, thus here below.
                    <div key = {idx}>

                        {/* step535: so first lets have a flex box having items with gap of 2 between them and then this whole div flexbox to have margin from bottom too there, thus here below. */}
                        <div className="flex items-center gap-2 mb-2">

                            {/* step536: now lets have a badge class from daisy ui with small size, with index+1 inside it i.e. 0,1,2,..... , thus here below. */}
                            <span className="badge badge-sm">{idx + 1}</span>

                            {/* step537: now lets have a bold text of base-content color from daisy ui, saying example i.e. Example 1, Example 2, Example 3, thus here below. */}
                            <p className="font-semibold text-base-content">Example {idx + 1}</p>
                        </div>

                        {/* step538: now lets have the code block that has slight main backgorund difference using bg-base color of daisy ui, then : let it have rounded corners, some padding and mono space font style and keep the text small size with some spacing vertically between all the elements of the div we make here below there, thus here below. */}
                        <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">

                            {/* step539: now each element in this will be flexbox with gap between its elements 2, thus here below. */}
                            <div className="flex gap-2">

                                {/* step540: so the first element in flexbox will be a text saying input, which has minm width of 70px to ensure its alignement properly there fixed, thus here below. */}

                                {/* step541: so here we have used min-w and not just w , as if minm is told it may grow if needed for responsiveness, but only w will fix it , making it less responsive to other sizes or spaces if there, thus here below. */}

                                {/* step542: so here we : Set a minimum width of 70px on the label so that both Input and Output labels take equal horizontal space and the values align properly in a clean column layout, thus here below ; i.e. if we don't set this , then "input:" and then below it we have "output:" may look not equally aligned i.e.

                                    Input:    [1,2]
                                    Output: [3]

                                , but using this we will get i.e. it may not be visible here, but on screen both input: and output: text will tak eequal width and look just perfect one below the other which may not else-wise there, thus here below.

                                Input:   [1,2]
                                Output:  [3]
                                
                                */}
                                <div className="text-primary font-bold min-w-[70px]">Input:</div>

                                {/* step543: now in same row of flexbox, next element of the flexbox displayed after input: i.e. the example's input dynamiclally in each iteration, thus here below. */}

                                {/* step544: they will always come after input: has taken mim of 70px width atleast, as specified above, thus here below. */}
                                <span>{example.input}</span>
                            </div>

                            {/* step545: now similarly by just using text-secondary color now, we will have another flexbox below the input: vala, for output now, thus here below. */}
                            <div className="flex gap-2">

                                {/* step546: here is now where the use of min-w comes clear , we have put same minm width on both input and ouput, so that the values of them are properly aligned one bleow the other, i.e. [1,2] , then output ka [3] starts just belwo the "[" of input vala  ; you can check this by removing the min-w from here below and see that they are not properly aligned there and not looking good there, thus is why both input: and ouput: made to take this much min-w there : so that > they have equal width minm occupied and after that minm width taken by them only, appears the values of them starting from "[" equally aligned one below the other there, looking good due to min-w as it made "input:" and "output:" to take equal width and no other thing can come in that min width of them, so the values starts coming sfter that width only there and thus start from same pkace one belwo the other there after the min-w of them equally taken there, thus here below.
                                
                                Example without equal min-w in both input and ouput and with it > in folder test with images there, thus here below.
                                */}
                                <div className="text-secondary font-bold min-w-[70px]">Output:</div>
                                <span>{example.output}</span>
                            </div>

                            {/* step547: now lets have a conditional rendering of element here below i.e. if the "explaination" field for that example in problem.js file's object exists for a problem, then only render the one below, else not ; to prevent crashes or undefined to be shwon there a sobviously if there is nothing like explaination for that example, then it will not render the explaination text there, and will rather render and show undefined there, thus here below.  */}
                            {example.explanation && (

                                // step548: so now we : Add small top padding for internal spacing, apply a top border using DaisyUI base-300 color to visually separate it from the content above, add top margin for outer spacing, then style the text with muted base-content color at 60% opacity, use sans-serif font for normal reading style, reduce text size for secondary information, and make the inner span semi-bold to highlight the label text clearly, thus here below ; the border color is very slight change form background in base-300 but still is there, can do border-[#some_color] to see that where its actually there there, thus here below.
                                <div className="pt-2 border-t border-base-300 mt-2">
                                    <span className="text-base-content/60 font-sans text-xs">
                                        <span className="font-semibold">
                                            Explaination:

                                        {/* step549: note that we have some " " space after span to ensure that theere is space between explaination and the explaination text, thus here below. */}

                                        {/* step550: putting the {..} on next line wont add space , we will have to put {" "} in that case in between them like : <span>Explanation:</span>{" "} and then on next line you can write {example.explanation} and still there will be space ther between them, thus here below ; THESE ARE SMALL THINGS BUT VERY IMPORTANT TO KEEP IN MIND HERE/THERE, THUS HERE BELOW. */}

                                        {/* step551: see the next steps in step552.txt file now there, thus here below. */}
                                        </span> {example.explanation}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>

        {/* step555: now lets have the constraints section as the 3rd eleemnt in the outer div of space-y-6, now lets have the CONSTRAINTS SECTION BELOW, which will have space-y-6 applied as by rule outer div of these had space-y-6 i.e. vertical margin of 6 for / between each element, thus here below. */}

        {/* step556: so again the outer div same as teh other 2 elements of the outer div, made here above there, thus here below. */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            {/* step557: then have the heading with same classes as above and same base-content color class coming from daisy ui, but now with some margin at the bottom from the content in it here/there, thus here below. */}
            <h2 className="text-xl font-bold text-base-content mb-4">Constraints</h2>

            {/* step558: Now : lets have a unordered list here belwo that will have space-y-2 applied to add vertical spaces between each item of this list and it will use : DaisyUI base text color with 90% opacity for strong readable text, thus here below. */}
            <ul className="space-y-2 text-base-content/90">
                {/* step559: now lets have a "map" to loop throught the array fo constraints that we have ( and thats why we had it an array there as by rule map can be used only on arrays there) ; so now : we will have each constraint element as "constraint" and then automatically have an index for them, so that the index "idx" can be used to give the unique key for each item, which is needed everytime we use "map" in react, thus here below. */}
                {problem.constraints.map((constraint, idx) => (
                    // step560: so it will render a "li" for each element of the array, thus here below.

                    // step561: make it flexbox so that the bullet and the text can be in same row with gap of 2, thus here below.
                    <li key={idx} className="flex gap-2">
                        {/* step562: now lets have the bullet point and the code itself ; we have bullet in span as its an inline element and we want in same line , even if it was idv, still due to outer flexbox will be in same line only, but still lets use span here below, thus here below. */}

                        {/* step563: get the bullet using ALT + 0149 ; because the bullets of ul not behaves normally in flex boxes and is removed, so we add a manual bullet here & also adding a manual bullet hepls us to style it with our own color here below using the primary text color based on the theme, thus here below. */}
                        <span className="text-primary">•</span>

                        {/* step564: we use code tag now for the mathematical constraint as browser by default renders it In monospace font and looks a bit different than other texts and better for mathematical equations/expressions too ; so we : Use the code tag to semantically mark the constraint as technical or code-like content so it displays in monospace font and looks structured like programming expressions, thus here below. */}

                        {/* step565: so the main reason of code tag is the style browser provides for it , but also we use it here as its <code> is an inline element by default ; but however its not needed here as the outer div is a flexbox and it will automatically have the bullet and the constaraints code here below in the same line, thus here below ; so the main reason of using it is to make it look a bit different than other texts and better for mathematical equations/expressions, thus here below. */}

                        {/* step566: see the next steps in ProblemPage.jsx file now there, thus here below. */}
                        <code className="text-sm">{constraint}</code>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default ProblemDescription
