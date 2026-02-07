// step578: so first lets destructure the props that were sent here as they are sent as an object internally, so we destructure the needed props using {...} format for destructuring, thus here below.

/* step579: The prop names must match exactly with what the parent sends — otherwise the child will receive undefined ; like so if parent sent : Parent sends:

<CodeEditorPanel
  selectedLanguage={selectedLanguage}
  onCodeChange={setCode}
/>

; then : Then child must receive:

function CodeEditorPanel({ selectedLanguage, onCodeChange }) {

SPELLING MATTERS : if child takes it as any other thing as renamed it will be undefined here in child component when being used or called in/from the parent component, so : The left side name in parent becomes the prop name.

<Child someName={value} />

Child must receive it as :

function Child({ someName }) {}

We can rename it only if we explicitly change it:

<Child abc={value} /> in parent file from where props coming too i.e. in ProblemPage.jsx file now there -

Then child must receive it also as :

function Child({ abc }) {} ,thus here below.

*/

// step580: lets get the imports for like : editor to be used from monaco-editor/react & the icons to be used from lucide-react, thus here below.
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";

// step581: also get the object made for the languages in problem.js file ; we will use them to get the name of the laguage , display its icon & also selecting the language within the "monaco" editor being used, thats why ther ethey were named as monacoLang: "jaavscript" and all there, thus here below.
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode
}) {
  return (
    // step582: so now here we : Set the container to take full height of its parent ; here in this file it doesn't has the parent, but it had parent in the ProblemPage.jsx file where this is placed and rendered ; so : set the container height to 100% of its parent Panel (which already has a defined height from the resizable layout), then : apply DaisyUI base-300 background color, and use flexbox with column direction to stack inner sections vertically, thus here below., apply DaisyUI base-300 background color for a slightly different surface tone, and use flexbox with column direction so inner sections stack vertically, thus here below.

    /* step583: so here don't think no parent so h-full of what , it has parent Panel in ProblemPage.jsx file now there, so it takes that panel's full height here, So h-full means:

    - Take 100% height of the Panel component that contains this editor.
    - And that Panel already has a defined height because:
    - The outer container is h-screen
    - Then flex-1 fills remaining space
    - Then PanelGroup fills that
    - Then Panel gets a percentage height (like 70%)

    So by the time it reaches ProblemEditor, the height chain is already defined, thus here below.
    */

    // step583: so here we use flex-col i.e. all elements in this will be one below the other, thus here below.
    <div className="h-full bg-base-300 flex flex-col"> 

      {/* step584: then now : then create a top header bar using flexbox to align items in a row with space between left and right elements, add horizontal and vertical padding for spacing, apply base-100 background for contrast against the parent, and add a top border using base-300 color to visually separate it from the section above there, thus here below. */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">

        {/* step585: now lets have a flexbox here in this section to have the image of the language chosen and the dropdown to select language one beside the other with gap of 3 ; This keeps the language icon and dropdown in the same line like : [ icon ]   [ select dropdown ], thus here below. */}
        <div className="flex items-center gap-3">
          {/* step586: now lets get the image dynamically based on the selected language, also in alt show the name of the language dynamically based on the selected language, thus here below. */}
          <img 
            src={LANGUAGE_CONFIG[selectedLanguage].icon} 
            alt={LANGUAGE_CONFIG[selectedLanguage].name}

            // step587: we fix the size and object-contain so that the image or icon scales proportionally inside that box without cropping or stretching while maintaining its aspect ratio, thus here below.
            className="size-6 object-contain"
          />

          {/* step588: now lets have a dropdown to select the language using the <select> tag of html, thus here below. */}
          <select
            // step589: so we have : DaisyUI styled dropdown (small size), thus here below.
            className="select select-sm"

            // step590: then we have its value always equal to the selectedLanguage like a controlled component dynamically & whenever it changes i.e. when a new dropdown option is selected, we call the onLanguageChange function with the new selectedLanguage, thus here below.
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {/* step590: now we convert the LANGUAGE_CONFIG object to arrays , as by rule "map" can only be used on arrays, so it becomes like : [
                                            ["javascript", { name: "JavaScript", icon: "..."}],
                                            ["cpp", { name: "C++", icon: "..."}]
                                          ]
            , thus here below. */}

            {/* step591: we DID NOT USE Object.values() here because : we had LANGUEAGE_CONFIG as -
              LANGUAGE_CONFIG = {
                javascript: {
                  name: "JavaScript",
                  icon: "/javascript.png",
                  monacoLang: "javascript",
                },
                python: {
                  name: "Python",
                  icon: "/python.png",
                  monacoLang: "python",
                }, .......
            }
          ; so here : if we used Object.values() here then it would be like -

              [
                { name: "JavaScript", icon: "...", monacoLang: "javascript" },
                { name: "C++", icon: "...", monacoLang: "cpp" }
              ]
                i.e : we only get the "values" of each , the key gets lost and then on doing "idx" as parameter we will get 0,1,2.... ; but we are doing LANGUAGE_CONFIG[selectedLanguage] and expects LANGUAGE_CONFIG["javascript"] and not LANGUAGE_CONFIG[0] , thus here below ; that would give errors and all "undefined" there ; as if we did like -

                Object.values(LANGUAGE_CONFIG).map((lang, idx) => (
                  <option value={idx}>
                    {lang.name}
                  </option>
                )) 
              ; then it would give us : e.target.value = "0" , "1" ... for idx there ; so selectedLanguage = "0" and then LANGUAGE_CONFIG["0"] = undefined ; thus here below.

              If the LANGUAGE_CONFIG was having a field like "id" : "javascript" and all in each {..} there, then we can use .values and get "javascript" for selectedLanguage using {lang.id} in the above code of Object.values there, thus here below ; so better to use Object.entries() as : Object.entries() works in all cases because every object (and even arrays) can be converted into [key, value] pairs, thus here below.

              BUT SINCE THATS NOT HERE, SO : Thats why we use Object.entries(LANGUAGE_CONFIG) as it gives us -

                [
                  ["javascript", { name: "JavaScript", icon: "..."}],
                  ["cpp", { name: "C++", icon: "..."}]
                ]
                
                i.e. : we get both key and value as [key, lang] = ["javascript", { name: "JavaScript", icon: "..."}] there, thus here below.

                So: finally : Convert an object into an array of [key, value] pairs so it can be iterated using methods like .map() while preserving both the object’s keys and their corresponding values, thus here below.

            */}

            {/* step592: each element from Object.entries now looks like : ["javascript", {...}] ; so now we use .map to map through each entry and then return the following <option> tag for each of them, as by rule "map" returns only a single parent element, all other elements if any must be wrapped inside , but independent outermost can be only one all others if many wrap inside a div or inside a recat fragment <>, thus here below. */}
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              // step593: so by rule react expects "unique keys" for every element to be rendered via the map, so lets use the key as the unique key, thus here below.
              <option
                key = {key}
                // step594: so now e.target.value when the user selects a option becomes since option selected , event took place on option tag , so "e.target" target element for the select/click event"e" is option, so : option.value == "javascript" and all now it becomes there, thus here below.
                value = {key}
              >
                {/* step595: this is what each option will look like as seen by the user, thus here below. */}
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* step596: now lets have a button there finally, which will display different things when the running state is true and when its false there, thus here below. */}

        {/* step597: since we had in the outer parent "justify-between", so the above div with icon+dropdown appears at one end and now this button at the other end , with space in between due to the usage of "justify-between" there above in the outer parent div there above, thus here below. */}
        <button 
        // step598: so lets have these classes of daisy ui for button structure and primary color based on theme , keep its size small and gap of 2 in its content i.e. gap-2 between the spinner and the text, thus here below.
          className="btn btn-primary btn-sm gap-2" 

          // step599: so this line Prevents multiple clicks while code is running and when isRunning is true, by disabling the button, thus here below.
          disabled={isRunning}

          // step600: so this function runs from its parent WHEN THE BUTTON IS CLICKED i.e. the ProblemPage.jsx file where this component is declared that parent has this parent, it comes from there : so the Parent handles the code execution here, thus here below.
          onClick={onRunCode}
        >
          {/* step601: inside the button, we show the spinner when isRunning is true and the text "Run" when its false, thus here below. */}
          {isRunning 
          ? (
            // step602: ternary operation ? : must return one parent element only ; but here we have two independent elements i.e the loader and the text, so we wrap them inside a fragment <> </> or inside a div and then return that single <> or <div> parent thats supported by react , thus here below.
            <>
              <Loader2Icon
                // step603: animate-spin is a class that comes from TAILWINDCSS and rotates the element continuously, thus here below.

                /*
                So here : The animate-spin class comes from Tailwind CSS and applies a continuous 360-degree rotation animation to the element using predefined keyframes, which is why the loader icon spins when isRunning is true, thus here below ; the keyframes that runs in background are -

                @keyframes spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

                ; and others like -

                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }

                  .animate-spin {
                    animation: spin 1s linear infinite;
                  }

                ; can customize in tailwind.config.js file if using version 3.2.4 there, thus here below.

                */
                className="size-4 animate-spin"
              />
                Executing...
            </>
          )

          // step604: shows the below text when isRunning is false i.e. when the code is not running and this is shown by default there always before its clicked there, thus here below.
          : (
            <>
              <PlayIcon
                className="size-4"
              />
                Run
            </>
          )
          }
        </button>
      </div>

      {/* step605: now lets have another div, that takes the flex-1 class so that : the editor container takes all remaining available space inside the vertical flex layout after the header, which allows the Monaco editor set to height 100% to properly fill the panel and resize correctly within the resizable layout i.e. the panel ; so after the header in the flexbox, the rest space there 100% of it in the top panel there, we want to be filled and taken by the editor, thus here below. */}
      <div className="flex-1">

        {/* step606: now lets have the editor coming from the Editor from @monaco-editor/react package and now we : We pass configuration props to the Monaco editor to define its height, selected programming language for syntax highlighting, current code value for controlled rendering, change handler to sync edits with parent state, theme styling, and behavior options such as font size, line numbers, layout responsiveness, scroll behavior, and minimap visibility, so that the editor behaves like a fully functional coding IDE inside our resizable panel layout, thus here below. thus here below. */}
        <Editor
          // step607: Monaco does NOT automatically fill container, we must explicitly tell it height ; so we make the editor take full height of its parent container ; so since its flex-1 in parent for its children inside it to take all remaining available space inside the outer flex-col flexbox created there in the outer div and then this height 100% makes it to take all available space there and fill the top panel there ; Without this → editor height would be small or fixed and may look weird there, thus here below.
          height={"100%"}

          // step608: we now get the correct Monaco language string dynamically ; this field is used to enable Enable syntax highlighting, Enable IntelliSense, Apply correct parsing rules, Show language-specific errors , just like VS code does ; so : If you don’t pass language → it behaves like plain text there and may not look and behave as expected and will/may not work properly there, thus here below.

          // step609: for this only we had made the monacoLang field in the LANGUAGE_CONFIG object in the problems.js file as the name field had caps in it like cpaital letters too, but this field must be lowercase by rule thats why that explicitly field was made there, thus here below.
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}

          // step609: now we also pass the value of the editor to be the state "code" coming from the parent, this is what the contents of the editor will be, thus here below.
          value={code}

          // step610: now this is what monaco calls whenever its content i.e. its "value" i.e whenever here the state "code" changes , the following function will be called to update the state "code" and thus update the contents of the editor , thus here below.
          onChange={onCodeChange}

          // step611: to put some built-in themes in editor like "vs", "vs-dark", "hc-black" (high contrast) and so on ; its because : Because Monaco doesn’t automatically follow Tailwind or DaisyUI theme and so : we must explicitly set editor theme, like done here below there, thus here below.
          theme="vs-dark"

          // step612: now we also have various options to customize the behaviour of monaco editor, thus here below.
          options={{
            // step613: to control font size of the editor content, thus here below.
            fontSize: 16,

            // step614: to show line numbers for each line like in VS code, thus here below.
            lineNumbers: "on",

            // step615: to remove the extra blank lines added by default by monaco editor after the last line, thus here below.
            scrollBeyondLastLine: false,

            // step616: we are using resizable layouts, so we should set this to true so that when the panel size changes by us doing that drag to resize, Monaco must recalculate layout, without this Editor will not resize properly and we will see a broken layout there, thus here below.
            automaticLayout: true,

            // step617: to hide the minimap we see on top-right in VS code too, to see the codes in small there and go fastly to the line we want by clicking on it from there, thus here below.

            // step618: now see the next steps in ProblemPage.jsx file now there, thus here below.
            minimap: { enabled: false }
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditorPanel