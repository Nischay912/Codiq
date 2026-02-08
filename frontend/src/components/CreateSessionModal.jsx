// step814: use "rfce" to create a react functional export component's boilerplate first here/there, thus here below.

import { CircleAlert, CircleFadingPlus, Code2Icon, Loader, Loader2Icon, LoaderCircle, PlusIcon } from "lucide-react"
import { PROBLEMS } from "../data/problems"

// step815: now lets destructure the props sent to this component and by rule , the name of props here should match the name of props that were used while sending on the left hand side there in the component like : <createSessionModal isOpen = {....}, .... /> : so the left hand side names should be used here also for destructuring below like isOpen and so on... here/there, thus here below.
function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {

  // step816: now lets get all the problems from the problems.js file and since its a object, we can't iterate using map on it ; so lets convert it to an array using the Object.values() method, so that we can iterate on it using map, thus here below.
  const problems = Object.values(PROBLEMS)

  // step817: now if the isOpen state is null, we will not show the modal there, thus here below.
  if (!isOpen) {
    return null
  }

  // step818: but if its open, we will show the modal there, thus here below.
  return (
    // step819: so here : modal modal-open is a DaisyUI component class built on Tailwind CSS where modal creates the centered popup overlay layout (dark background + centered content box), and modal-open forces the modal to be visible immediately instead of hidden, meaning the modal is shown on screen without needing any extra toggle state ; so when the modal is open by the isOpen state above, then we will show the following mode-open class there coming from DaisyUI, thus here below.

    // step820: The "modal" class is provided by DaisyUI and turns this div into a full-screen overlay container. Internally, it applies fixed positioning so it covers the entire screen (top, bottom, left, and right set to 0), uses flexbox to center the modal content, adds backdrop styling, and applies proper z-index layering so it appears above the main page content. Just adding the "modal" class makes this div behave like a modal structure.

    // step821: The "modal-open" class controls whether the modal is visible or hidden. When this class is added, DaisyUI makes the modal visible. When it is removed, the modal is hidden using CSS rules defined inside DaisyUI. So visibility is controlled purely by the presence or absence of this class ; The "modal" class from DaisyUI turns this div into a full-screen overlay container. It applies fixed positioning so the element is removed from normal document flow and attached to the viewport. It stretches to cover the entire screen using inset: 0 (which sets top, right, bottom, and left to 0). It also applies flexbox layout so that its child (usually the modal-box) is centered both horizontally and vertically. Additionally, it includes backdrop styling, z-index layering to ensure it appears above other content, and disables interaction with content behind it.

    // step822: The "modal-open" class controls the visibility of the modal. Without this class, the modal is hidden using CSS rules such as display: none or visibility-related properties defined by DaisyUI. When "modal-open" is added, the modal becomes visible, typically switching to display: flex so the overlay and centered modal content appear on the screen. This class effectively toggles the modal between hidden and visible states purely through CSS styling.

    // step823: however here we are using isOpen if-else case already above, so no need of modal-open as even if its there but isOpen is false , we return null and not shows this ; but we still kept this model-open for safety just incase isOpen not there, then this class will tell to show the modal there since the model is open due to the presence of this model-open class there, thus here below.
    <div className="modal modal-open">
      {/* step824: now here : modal-box class of DaisyUI is used to create the main content box inside the modal overlay (centered panel with padding, rounded corners, and shadow by default), and max-w-2xl from Tailwind limits its maximum width to the 2xl size so the modal doesn’t stretch too wide on large screens and stays nicely centered and readable, thus here below. */}
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        {/* step825: now lets have another div inside the modal-box that will ensure that its children have y-8 spacing vertically between them : to automatically add vertical spacing between all direct child elements inside the div, so every section inside gets equal gap from top to bottom without adding individual margin classes to each child, thus here below. */}
        <div className="space-y-8">
          {/* step826: now lets have the problem selection div where the classes below : Creates a small vertical section with slight spacing between elements using Tailwind’s space-y-2, then uses DaisyUI’s label styling to neatly align the main label text “Select the problem” in bold on the left and a red required asterisk (text-error from DaisyUI theme) on the right, thus here below. thus here below. */}
          <div className="space-y-2">
            <label 
              className="label">
                <span className="label-text font-semibold">Select the problem</span>
                <span className="label-text-alt text-error">*</span>
              </label>

              {/* step827: now after the label, inside the div as we have to maintain space-y-2 between label and this select tag to create a dropdown there, thus here below. */}
              <select
                // step828: so now the below classes : Creates a full-width dropdown using DaisyUI’s select style on top of Tailwind CSS, where w-full makes it stretch across the container, thus here below.
                className="select w-full"

                // step834: now we put the value of the select tag , which will be used to tell what will be displayed there inside the select dropdown ; so whatever will be the selected problem from options, we want to display it in the select tag itself too, thus here below.
                value={roomConfig.problem}

                // step835: now when user selects something from the dropdown, the onChange method is called and here in onChange we are having a function that has the "e" i.e the event object that is equal to whatever event happended just now there, thus here below.
                onChange ={(e) => {
                  // step836: so since this onChange runse when a option is selected , so this "e.target" becomes this select tag as the changes took place in this only ; and then : we saw earlier in the option that ; the value was equal to the title of the problem ; so we use the .find() to go through the array and for each element "p" , check if its title is equal to the selected problem's title and once found, we return that full problem object with that title and save in the variable "selectedProblem", thus here below.

                  // step837: if using a arrow function and then if we put { } , then we should mention "return" keyword , else won't work OR if you want not to write return , then don't put the { } here/there, thus here below.
                  const selectedProblem = problems.find((p) => 

                    (p.title === e.target.value)
                  )
                  // const selectedProblem = problems.find((p) => {

                  //   return (p.title === e.target.value)
                  // })

                  // step838: now we use the setter method to change or update the room config with the problem selected , its difficulty and the selected problem has by rule e.target.value as its title , so we set the problem field equal to that title, thus here below.

                  // step839: and so the roomConfig state changes , react re-renders internally and shows the new problem selected there in UI as we have set the value to be shown in this select tag to be the title of the problem earlier above here/there, thus here below.

                  // step840: now whenever we refresh the page, React re-renders the parent component DashBoard and then the states are set back to their initial values i.e. here isOpen == false again and so the if statement at the top runs and makes "null" to be returned there ; then the modal is hidden there whenever we refresh, thus here below.

                  // step841: but since in the createSession button we had set to make the showCreateModal to true whenever we click the button, so when we click it ; the modal/popup is shown/visible again here/there, thus here below.
                  setRoomConfig({
                    difficulty: selectedProblem.difficulty,
                    problem: e.target.value,
                  })
                }}
              >
                {/* step829: the first <option> is a placeholder text “Choose a coding problem” that cannot be selected again because of disabled, so it only acts as a default guide message for the user ; so this makes the 1st option to always be this option here/there, thus here below. */}

                {/* step830: also the value here is kept "" empty ; so that its not null or undefined but an empty string ; so when user selects this option e.target.value = "" ; and then in select the value is roomConfig.problem ; and earlier we had set the initail value of probem and difficulty to "" too in the intial object of roomconfig created ; so it matches this option always when we refresh and so shows this below as the value in select tag always by default there ; and since its disables ; we can't select it ; its just like a label telling the user to select a problem, thus here below. */}

                {/* step831: THUS IMPORTANT IS THAT : we had initial state value of roomConfig as { problem: "", difficulty: "" } ; so when we refresh the page, the problem and difficulty are "" and so the it matches the value of this otpion and so this option is selected by default and shown there in value of select whenever we refresh the page here/there, thus here below. */}
                <option
                  value= "" disabled
                >
                    Choose a coding problem
                </option>

                {/* step832: then we map throuh the problems array and since we by rule have to keep a key in the component being returned by a "map" always by rule whenever using a map, so we put the id as the key , and the value of the option being selected will be the title of the problem, thus here below. */}

                {/* step833: so the code here below : Loops through the problems array using .map() and for each problem object it returns an <option> element for the dropdown, where key={problem.id} gives React a unique identifier for efficient rendering, value={problem.title} is what gets sent in e.target.value when that option is selected, and inside the option it displays both the problem title and its difficulty like “Two Sum - Easy”, so each problem dynamically becomes a selectable item in the dropdown, thus here below. */}
                {problems.map((problem) => (
                  <option
                    key={problem.id}
                    value={problem.title}>
                      {problem.title} - {problem.difficulty}
                  </option>
                ))}

              </select>
          </div>
          {/* step842: now lets have the room summary to be shown there, thus here below. */}

          {/* step843: so we show the following only if a problem has been selected and roomConfig.problem is not null or undefined ; so even though initial value of problem was "", but its still considered falsy, so this will not be rendered here/there, thus here below. */}
          {roomConfig.problem && (
            // step844: so here : this div uses DaisyUI (built on Tailwind CSS) where alert applies the alert component structure like padding, rounded corners and flex layout, and alert-success gives it the green success theme color styling for messages like success notifications, thus here below.
            <div className="alert alert-success">
              <CircleAlert
                className="size-5"
              />
              <div>
                <p className="font-semibold">Room Overview:</p>
                <p>
                  Challenge: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (Session Type: 1-on-1)</span>
                </p>
            </div>
          </div> 
          )}
        </div>
          {/* step845: so now we will have another div here below to have the buttons ; but it will be outside the div of the dropdowns and the overview box ; but will be inside the modal-box, thus here below. */}

          {/* step846: so here : This div uses DaisyUI’s `modal-action` utility (built on Tailwind CSS) which automatically aligns action buttons to the right side of the modal with proper spacing, and inside it the button uses `btn` for base button styling and `btn-ghost` for a minimal transparent style that blends with the background while still remaining interactive, and the  */}
          <div className="modal-action">
            <button
              className="btn btn-ghost"

              // step848: so here: `onClick={onClose}` attaches the close handler so clicking Cancel triggers the parent function to close the modal by setting showCreateModal to false like we had passed the function and its defination with () => as props ; so by rule when () => is there in props means that is the function defination, it doesn't meant there that the function was called as soon as prop was passed, no its just to tell that when that function will be called, it will set the showCreateModal to false and thats what happens here and sincs the state changes, the component re-renders and if(!isOpen) condition becomes true and the modal is closed, thus here below.

              // step849: but remember that : when a state changes ; it just re-renders the UI and modal is hidden there ; but it doesn't means that : all the states will be refreshed back to the initial state ; so when we open the modal again there ; its still having the value we last saved in it ; as states gets to their initial state back only if we manually refresh the page OR the component is unmounted completely i.e. the component is completely removed from the DOM and memory, so its state is destroyed and reset, but here thats not the case, so the value of select tag remains same that we had before closing the modal , even after re-opening it, until we manually refresh the page or the component is unmounted completely i.e. the component is completely removed from the DOM and memory here/there, thus here below.
              onClick={onClose}
            >
              Cancel
            </button>

            {/* step850: now we will also have one more button ; and since this is wrapped in the div with "modal-action" class ; it automatically gives the classes of flexbox with justify-end i.e. both buttons are aligned to the right if it was flex-row and to the left if it was flex-row-reverse and to the bottom if it was flex-col and to the top if it was flex-col-reverse ; thus here below. */}
            <button
              // step851: so we use the : DaisyUI’s btn and btn-primary classes (built on Tailwind CSS) to give it a styled primary action look, and gap-2 adds spacing between the icon and text components inside this button, thus here below.
              className="btn btn-primary gap-2"

              // step856: now on clicking this button, we will be making call to the API to start the session, thus here below.
              onClick={onCreateRoom}

              // step857: and this button will be disabled if we are in the creating state i.e. if the API call is being made , to prevent user to keep clicking the button even when the API call is being made ; and also disable it if no problem has been selected yet as without a problem, there i sno use of making API call, as it will fail only as the API call needs the problem too , to know that for which problem, the session has to be created and started here/there, thus here below.
              disabled={isCreating || !roomConfig.problem}
            >
              {/* step852: now we do conditional rendering and check that if the isCreating state is true i.e. if the call to the API is being made, then we will be showing a loading spinner, thus here below. */}
              {isCreating ? (
                // step853: so we show a spinner here below when the API call is being made , we use : animate-spin from Tailwind CSS which applies a continuous rotation animation to make the loader spin, thus here below.
                <Loader className="size-5 animate-spin" />
              ) : (
                // step854: else if the API call has been completed or not being made, we will show the text Create Session, thus here below.
                <CircleFadingPlus className="size-5" />
              )}

              {/* step855: now inside the button we will also be showing the text here based on if the API call is being made or not ; and since we had gap-2 in button ; so the loader and text will be side by side and will have some space between them i.e. will have a gap of 2 between them here/there, thus here below. */}
              {isCreating ? "Starting..." : "Start"}
            </button>
          </div>
      </div>
      {/* step858: now here we go out of the modal-box div ; but still inside the main modal overlay container provided by DaisyUI (built on Tailwind CSS), so this area represents the backdrop layer that covers the full screen behind the centered modal content; this backdrop visually separates the popup from the main page, blocks interaction with background elements, and keeps focus on the modal until it is closed, thus here below.  */}

      {/* step859: so here now : This div uses DaisyUI’s modal-backdrop class (built on Tailwind CSS) which creates the dark background overlay behind the modal content, covering the full screen and slightly dimming the page to keep focus on the modal box in the center, and since onClick={onClose} is attached to it, clicking anywhere on the dark background will trigger the close function and hide the modal, giving the common UX behavior where clicking outside the modal content closes the popup, thus here below. */}

      {/* step860: see the next steps in step861.txt file now there, thus here below. */}
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}

export default CreateSessionModal
