// step457: type rfce to get the boilerplate and to start off / start with the boilerplate, thus here below.

// step458: see the next steps in App.jsx file now there, thus here below.

import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import {executeCode} from "../lib/piston"; // always USE {} in import if its export was made export const OR export function there ; if its export default then DON'T USE {} in import, thus here below.
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

function ProblemPage() {
    // step462: now lets get the various states and variables to be used in this page, thus here below.

    // step463: in the App.jsx file, we had defined the url for this component to be rendered, to be "/problem/:id", so use the same name to get that parameter value here below, if not mentioned the exact name of the parameter from the URL that we want, then it may fetch wrong value/ undefined value or may cause error, thus here below ; like if we had : path="/problem/:id/:difficulty" ; then useParams() only has the dynamic parameters that has ":" infront of them stored in it as an object i.e. { id: "1", difficulty: "easy" }, thus here below.
    const { id } = useParams();

    // step464: now lets get the navigate method to be used in this page to navigate to another page using it, thus here below.
    const navigate = useNavigate();

    // step465: now lets create the states to be used in this page, thus here below.

    // step466: intially lets keep its value to be two-sum, so that by default the problem it will be referring to will be the two-sum problem, thus here below.
    const [currentProblemId, setCurrentProblemId] = useState("two-sum");

    // step467: now lets have a state to have the selected Language, thus here below ; with the default one thats there by defualt if nothing selected will be "javascript", thus here below.
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");

    // step468: then we will have the state to store the code that user writes in the editor, thus here below.

    // step469: the default value that will be displayed there, will be the starter code we had ealrier in the problem.js file, thus here below.

    // step470: so now : we will use the PROBLEMS which is the object having many key-value pairs, but the key is the problemId itself there in each like "two-sum" and all, so we do [] to get the value of that key, and then get the starterCode which has various languages fields, so select the javascript by default as we had the language selected by default also to be "javascript" only earlier there, thus here below.
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);


    // step471: then we will have a state to store the output of the code that user writes in the editor, thus here below.
    const [output, setOutput] = useState(null);

    // step472: then lets have a loading state to show a spinner while the code is running in the background on PISTON API there, thus here below.

    // step473: initially by default keep it "false" as we don't want the spinner to show there from beginnin gonly, but show only when the user clicks the run button and tuns the code in the background on the PISTON API there, thus here below.
    const [isRunning, setIsRunning] = useState(false);

    // step474: now first lets get the current problem using the problem id from the PROBLEMS object, thus here below ; and so we will get the entire object for that problem in the currentProblem variable below there, thus here below.
    const currentProblem = PROBLEMS[currentProblemId];

    // step475: then we will have a useEffect here below to run this function everytime the params of the URL changes ; so this useEffect updates the problem when the URL params changes, thus here below.
    useEffect(() => {
        // step476: so if the id of the params from URL exists and the problem for that id also exists in the PROBLEMS object, then we will set the currentProblemId to be that problem id, thus here below.
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);

            // step477: also update the code in the editor to the starter code of that problem and now since startedCode was also a object there, we will select the language field's value from it using [] i.e. give the starterCode["cpp"] or whatever language we want, thus here below.
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);

            // step478: also when problem changed , we want to reset the output, thus here below.
            setOutput(null);
        }
    // step477: so we run this when the user changes the problem and the URL params "id" changes as we had set earlier the problem-id to be there in the URL params for the "/problem/:id" there OR when the user changes the selectedLanguage, thus here below.
    }, [id, selectedLanguage])

    const handleLanguageChange = (e) => {
        // step619: now here first lets get the newly selected language from dropdown using e.target.value, thus here below.
        const newLang = e.target.value;
        // step620: now lets use the setSelectedLanguage function to update the selectedLanguage state, thus here below.
        setSelectedLanguage(newLang);
        // step621: then we will also update the state "code" which is the content of the Editor we had set earlier there ; i.e. if the currentProblem is "two-sum" then it goes in the starter code field for that problem and then gets the value for the key "starterCode" for that language as it has many language key-value pairs but we want to show the starter code for the newly selected language there in the editor now there, thus here below.
        setCode(currentProblem.starterCode[newLang]);

        // step622: and output will also be reset to null as we changed the language there, thus here below.
        setOutput(null);
    }

    // step567: now lets implement this function here below,  which will help in the dropdown there to work, because ther ein ProblemDescription page, we are using this function to handle the change of the dropdown/select component there, as theere in ProblemDescription page's select/dropdown we are calling this function onChange of value of the dropdown there, with the "e.target.value" there i.e. with the value of whatever "option" of dropdown is selected there, thus here below. 
    const handleProblemChange = (newProblemId) => {
        // step568: we saw in the select component in ProbleDescription component that it has each option with value = problem.id ; so e.target.value passed in the function when a dropdown option is clicked makes that id like "two-sum" sent to this function as newProblemId, so now : we will be using the "navigate" function to navigate to the URL "/problem/two-sum" now there ; navigate() unlike Link, in Link we need to click to go somewhere, but navigate whenever runs, then it take sus to the URL automatically once its runned with an URL there, and no need to click fo that ; so when we click on the option , value = "two-sum", we navigate to the URL "/problem/two-sum" now there, thus here below.

        // step569: then since the "id" in the URL params change, the useEffect runs above and changes the problem_id, updates the starter code and also resets the output, thus here below.

        // step570: see the next steps in step571.txt file now there, thus here below.
        navigate(`/problem/${newProblemId}`);
    }

    // NOTE HERE THAT BELOW : WE COMMENTED ONE OF THE CONFETTI BELOW AND MADE and added UN-COMMENTED ANOTHER "triggerConfetti" FUNCTION THERE BELOW ; CAN UNCOMMENT THIS AND COMMENT THAT IF WE WANT THIS CONFETTI STYLE ; SO COMMENT WHATEVER YOU DON'T WANT & UN-COMMENT WHATEVER YOU WANT EASILY HERE , THUS HERE BELOW.

    
    // const triggerConfetti = () => {
    //     step651: now here : confetti() is a function from the canvas-confetti library that we will use to shoot particles on the screen ; it will : Launch celebration particles from the specified position with these settings below, thus here below.
    //     confetti({
    //         step652: so we have the particle count which tells about how many particles to shoot, thus here below.
    //         particleCount: 80,

    //         step653: then we have the field to tell how wide the particles will spread i.e. wide or narrow explaination, thus here below.
    //         spread: 250,

    //         step654: now :we specify that where will the confetti start on the screen, thus here below.

    //         step655: it uses the % of screen's height and width ; it uses values betwen 0 and 1 and not in pixels ; x:0 means extreme left ; x:0.5 means center ; x:1 means extreme right > so if screen width is 1000px , then : x:0 means 0px (extreme left) ; x:0.5 means 500px (center) ; x:1 means 1000px (extreme right) and similarly x:0.2 means 200px, thus here below.

    //         step656: similarly "y" tells the vertical position w.r.t to height ; lets say height of screen is 800px , then : y:0 means 0px (extreme top) ; y:0.5 means 400px (center) ; y:1 means 800px (extreme bottom) and similarly y:0.6 means 480px, thus here below.

    //         step657: we use % and not px as on different screens, the pixels will be different ; so better to make it there visible based on whatever screen size is , its percentage there, thus here below.

    //         step658: so here below , the confetti shoots 20% from left and 60% down from top of screen and thus shoots from the left-middle area there, thus here below.
    //         origin: {x:0.2 , y:0.6},

    //         step659: Custom colors for particles (array of color values) -> to add colors to the confetti (optional) ; Each confetti piece randomly picks one from this list
    //         colors: ["#00f5ff", "#7b61ff", "#00ff88"],

    //         step660: Shape of confetti pieces ; Options: "square", "circle"
    //         shapes: ["square", "circle"],

    //         step661: Initial speed of particles when they burst ; Higher value = faster explosion
    //         startVelocity: 45,

    //         step662: Controls how fast particles fall down ; Lower value = floaty / slow fall
    //         gravity: 0.6,

    //         step663: Random slight tilt variation for more natural look ; Makes particles slightly bigger (1 = normal size), thus here below.
    //         scalar: 1.2, 
    //     });

    //     step664: we can also have another confetti to shoot from one more different position at the same time ; i.e the 1st one from left side and in same distance from right shoot one from the right side, thus here below.
    //     confetti({
    //         particleCount: 80,
    //         spread: 250,

    //         step665: i.e. earlier it was 20% from left, now its 20% from right i.e. 100-20 = 80% from left & both at same distance from top to look symmetrical there, thus here below.
    //         origin: {x:0.8 , y:0.6},

    //         step666: then similar to the previous confetti from the left, same for symmetricity look/ symmetrical look ; put for the right confetti too here below, thus here below.
    //         colors: ["#00f5ff", "#7b61ff", "#00ff88"],
    //         shapes: ["square", "circle"],
    //         startVelocity: 45,
    //         gravity: 0.6,
    //         scalar: 1.2,
    //     });
    // }

    // step667: Now here below : we can have another good looking confetti here that shoots particles at some intervals, thus here below.

    // step668: This function triggers a smooth confetti animation, thus here below.
    const triggerConfetti = () => {

        // step669: Total duration of the animation in milliseconds ; 1500ms = 1.5 seconds
        const duration = 1500;

        // step670: Date.now() gives current time in milliseconds ; We calculate when the animation should stop.

        // step671: Example: If now = 1000ms, then end = 1000 + 1500 = 2500ms
        const end = Date.now() + duration;

        // step672: setInterval runs a function repeatedly every X milliseconds ; Here: every 200ms (0.2 seconds)
        const interval = setInterval(() => {

            // step673: Each time the interval runs, we check if current time has passed the end time
            if (Date.now() > end) {

                // step674: If yes → stop the repeating interval and exit the function
                clearInterval(interval);
                return;
            }

            // step674: else we Fire a small burst of confetti
            confetti({
                particleCount: 20,
                spread: 180,

                // step675: now for : Where the confetti originates from we put -> x: horizontal position (0 = left, 1 = right) & y: vertical position (0 = top, 1 = bottom)
                origin: { 
                    // step676: Random horizontal position each time (0 to 1) to make it look coming from different places but at same height 60% from thr top always there, thus here below.
                    x: Math.random(),

                    // step677: so we keep the distance from top always same, but the horizontal position changes each time, thus here below.
                    y: 0.6
                },

            });

        // step678: Run this function every 200ms, as in setInterval we set the interval after which this function will run everytime, thus here below.
        }, 200);

    };


    // step637: so lets have this function here below to normalize the output, thus here below.
    const normalizeOutput = (output) => {
        // step638: so this code will normalize the output for comparison SEE THE REGEX.TXT FOR MORE INFO ON THIS THERE IF WANT TO KNOW, THUS HERE BELOW : (removing extra spaces, trim whitespace, handle different spacing and all, removing lines and comments, etc and many more , so on....), thus here below.
        return output
            // step639: so trim() removes extra spaces at beginning, end, and extra blank lines at the start and the end, thus here below.
            .trim()

            // step640: so now break output into separate lines, so that we can process each line separately, thus here below.
            .split("\n")

            // step641: we converted each line to array so that "map" can be used on it, as by rule "map" can be used only on arrays, thus here below.
            .map((line) =>
                line
                    // step642: so remove again the extra spaces in each line there, thus here below.
                    .trim()

                    // step643: so here below using "\[" we match a literal "[" and then using \s+ we find one or more spaces ; so overall : it finds "[    " and replaces it with just "[", thus here below.
                    .replace(/\[\s+/g, "[")

                    // step644: now similarly here below we match a literal "]" and then using \s+ we find one or more spaces ; so overall : it finds "]    " and replaces it with just "]", thus here below.
                    .replace(/\s+\]/g, "]")

                    // step645: similalry below REGEX matches extra spaces in commas , comma spacings like it finds : "1,2" "1 ,2" "1, 2" "1 , 2" and all .. so on & replaces without spaces i.e. replaces them if found any of them like that with just "1,2" thus here below ; thus normalizes comma spacings, thus here below.
                    .replace(/\s*, \s*/g, ",")
            )

            // step646: after cleaning the extra spaces , some lines amy become completely "" empty too as what if some lines were left empty only in between by user like "         " , so it became "" after spaces removal ,so : we remove those lines by filter here below as the below filter returns an array of lines with only those lines which are not empty i.e. whose lenght is > 0, thus here below.
            .filter((line) => line.length > 0)

            // step647: finally we join the lines back into a single string using "\n" as in problem.js file also we had kept the expected output in this format only with "\n" in between the lines / in between them there also here/there, thus here below.

            /* step648: so overall this was needed because -

            Suppose expected output is:

            [1,2]

            And the code written by the user prints:

            [ 1 , 2 ]

            Without cleaning → Wrong
            With cleaning → Correct

            ; because just formatting of code with some extra spaces or extra ENTER keys presses by the user while coding them should NOT fail the logic of the problem's code and solution by logic/logically there we know, thus here below ; as this code is still correct but due to spacing, it may not match the expected output written as objects {....} there in problems.js file , but we know just because of spaces extra and extra ENTER keys pressed to make the empty lines more , doesn't make the code run wrong in other editors, so same here also we will remove all extra spaces and all , like don e above and compare the NORMALIZED OUTPUT fter all those extra redundant spaces and all removal for a fair anf correct and accurate comparison, thus here below.
        */
            .join("\n")
    }

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {

        // step634: now here we return the result of comparing the actual output with the expected output, thus here below.
        /* step635: But doing just like this below will not work because what if there are identation errors and all, like if user puts some extra spaces or less spaces ; cpp java we know it will still work even if the spaces are there extra or not ; but because of extra spaces it will not be excatly === , and though it runs correctly in cpp java even with extra spaces, here by === it will be false, like if we have -

        return [abc] , now if user types return [ abc] ;
        
        its still correct as per normal complier we know, but it will still be false here by ===, and so : we will get the wrong solution saying solution wrong however its correct to avoid that we will get rid of all the extra spaces, lines, comments and all before comparing them, thus here below.

        if(actualOutput === expectedOutput) {
            return true;
        }
        return false;
        */

        // step636: so to fix the issue above, we will get rid of all the extra spaces, lines, comments and all before comparing them ; this is called NORMALIZING THE OUTPUT, thus here below.

        // step649: so now : lets use the normalize function to normalize the outputs and then compare them as if we dont do this then the code will show error fail, even though the user has the correct solution and the logic is correct by the user there even then it may fail if we dont NORMALIZE IT THERE, thus here below.

        // step650: and now we can test by clicking the RUN button there and see that the code runs correctly now even if extra spaces and all given by user, also if we write wrong logic in the code, we will get the wrong error toast for that there too, thus here below.
        const normalizedActualOutput = normalizeOutput(actualOutput);
        const normalizedExpectedOutput = normalizeOutput(expectedOutput);

        if(normalizedActualOutput === normalizedExpectedOutput) {
            return true;
        }
        return false;

    }

    const handleRunCode = async () => {
        // step623: now lets have the isRunning state to be true as we have clicked the run button, thus here below.
        setIsRunning(true);

        // step624: now lets have the current output state to be null first as we don't want new ouput to be there along with the old one, thus here below.
        setOutput(null);

        // step625: now we can get the result of running the code from the executeCode method made under the piston.js file earlier there, thus here below.
        const result = await executeCode(selectedLanguage, code);

        // step626: now we set the result to the output state and so now ouput becomes : {success: true, output: "hello world"} as there in piston.js we had made ouput = data.run.ouput and all there, and now setting it up here in result state, thus here below.
        setOutput(result);

        // step627: once the code is run, we set the isRunning state to false, thus here below.
        setIsRunning(false);

        // step628: now lets check if the code executed successfully or not and if its matching with the expected output ; because even if we have syntax and all correct , the code may run successfully, but it may not match with the expected output ; and also if syntax error is there, we should show that and not treat that as a successful run ; thus here below.

        // step629: we saw in piston.js , we return the object with "success" and "output" field, thus here below.
        if(result.success){
            // step630: get the expected Output from the problems.js file, where we had a field for every problem called "expectedOutput" which has the expected output for that problem and inside that get the value for a particular currently selected language as the key as there we had things in key-value pairs stored there, thus here below.
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];

            // step631: now we will run the below function to check if all the test cases passed or not, thus here below.

            // step632: in this we pass the output of the code that came from the executeCode method and the expected output ; as in result we have = {success: true, output: "hello world"}, so we get the actual output that came by code we ran on piston api and the expected output we had saved in problems.js file are sent in this function below that checks if all the test cases passed or not there, thus here below.
            const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

            // step633: if testsPassed is true means all testcases passed and matched with the expected output, else some or all testcases failed, thus here below.
            if(testsPassed){

                // step679: so now : we can call the confetti method to show a confetti upon success here below, followed by a success toast coming from react-hot-toast, thus here below.
                triggerConfetti();
                toast.success("Congrats! All test cases passed.")
            }
            else{
                toast.error("Output mismatch detected. Please review your logic.")
            }
        }
        else{
            toast.error("Syntax error detected. Please review your code.")
        }
    }

    return (
        // step478: so now here we : Set the container to take full viewport height and full viewport width, apply DaisyUI’s base theme background color for a clean surface, and use flexbox with column direction so child elements are stacked vertically from top to bottom, thus here below.

        // step553: removed w-screen beacsue of the reason told in step552.txt file earlier there, thus here below.

        // step554: see the next steps in ProblemDescription.jsx file now there, thus here below.
        
        // <div className="h-screen w-screen bg-base-100 flex flex-col">
        <div className="h-screen bg-base-100 flex flex-col">

            {/* step479: now lets have the navbar component at the very top first, thus here below. */}
            <Navbar />

            {/* step480: now lets have the div here below to take the all avialable space after the items re placed in the flexbox using "flex-1", thus here below. */}
            <div className="flex-1">
                {/* step481: now lets have a panel-group here coming from the package we installed earlier to create resizable panels that we can increase or decrease there to adjust the size, thus here below. */}

                {/* step482: so here we will be using the PanelGroup to have a horizontal group of panels, that can be resized, thus here below ; direction "horizontal" means that the panels will be resized horizontally and will be present side by side; like problem on left and editor on the right, thus here below. */}
                <PanelGroup direction="horizontal">
                    {/* step483: now lets have the LEFT PANEL, thus here below for the problem description, thus here below. */}

                    {/* step484: we always wrap the panels using Panel component and lets give the default size it will take to be 40% and the minimum it can be shrinked and resized to be 30%, thus here below. */}
                    <Panel defaultSize={40} minSize={30}>
                        <ProblemDescription
                            // step495: so here we will pass these variables as props to be used in the component there, thus here below.

                            // step496: Props names are not fixed in React; they can be changed freely, but the names used while passing props must exactly match the names used while receiving them in the child component i.e. we will use the l.h.s names as it is what we name here in the ProblemDescription component page ; if we named here below on l.h.s as a .. b ... c ... d ; then there recieve them as a.. b .. c .. d only for the l.h.s varaibles there, thus here below.

                            // step497: and we send props from parent component to the place where it will be used like this only : attribute_name = {variable_name} ; thus here below ; and then in that place we will recieve it like : {attribute_name} there by destructuring these there ; thus here below.

                            // ALSO NOTE HERE THAT : THE HANDLEPROBLEMCHANGE PASSED HERE BELOW IS JUST TO TELL A REFERENCE THAT OK THIS FUNCTION IS BEING PASSED THERE, THAT CAN BE USED THERE ; BUT NO NEED TO PASS A PARAMETER THAT handleProblemChange expects here as this is just a refernece ; but when we call it there in Problemdescription page, we should pass a parameter there in it when called because as per its definition above , it expects a parameter there ; thus here below ; so here : In the parent here, we pass only the function reference without calling it "WITHOUT ANY PARAMETERS PASSED HERE", PARAMETER WILL BE PASSED WHEN FUNCTION IS CALLED IN CHILD, THIS BELOW IS NOT A FUNCTION CALL BUT JUST A REFERNCE THAT OK USE THIS FUNCTION AND THEN ANY CHANGE YOU DO TO STATE WILL REFLECT HERE AND ALL WHEREVER STATE IS USED AS ITS A REFERNEC LIKE POINTERS IN CPP, WE SENT A REFERNEC THAT CHANGES IT AT ALL PLACES / ADDRESS WHEREVR IT IS, SIMILARLY DONE HERE ALSO THERE, THUS here below, and inside the child component we call that function with e.target.value when the dropdown changes, so the parameter is actually passed from the child at the time of execution, as we now always that : "Parent (this ProblemPage) controls state and the child (ProblemDescription) in which its passed uses it", thus here below.
                            
                            // step498: see the next steps in the ProblemDescription component page, thus here below.

                            problem = {currentProblem}
                            currentProblemId = {currentProblemId}
                            onProblemChange = {handleProblemChange}
                            allProblems = {Object.values(PROBLEMS)} // converted to array, then passed to child as prop , so that operations like .map can be done on it easily htere, as objects are harder to iterate as such in JSX, so converting to array makes it easier to map through it there, thus here below.
                        />
                    </Panel>

                    {/* step487: now in the middle of both the panels, lets have a resizable handle to resize the panels, thus here below. */}

                    {/* step488: so for the classes, we : Set a small fixed width to act as a draggable divider, apply a neutral base background color, change it to primary color on hover for visual feedback, smoothly animate only color changes, and show a "column-resize cursor" on hovering over it, to indicate the element can be dragged left or right to resize panels, thus here below.

                    // step489: for this only we had set at the top div as "flex-1" as using Using flex-1 at the top makes the container take all remaining available space after other content (like the navbar), which allows the PanelGroup to fill the full screen height; this ensures the resizable panels have proper space to work in, making dragging smooth and preventing layout breaks or empty gaps when panels are resized, thus here below.
 */}
                    <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

                    {/* step485: now lets have the right panel in another Panel component for the code editor and the output displaying there, thus here below. */}

                    {/* step486: also there is no limit on the minSize as it can be any % we want ; but the defaultSize of both should sum up to 100% always, else if maybe someone put same 60 60 in both then total is 120, so how can both have covered 120% of screen by default initially ; resizing may look difficult then there, thus here below. */}
                    <Panel defaultSize={60} minSize={30}>

                        {/* step490: now here we will have another set of panel group in the RIGHT PANEL i.e. inside the right panel, we will have another group of panels , but now in the VERTICAL direction between the code editor and the output console ; since we will be able to resize it up and down, thats why direction is "vertical" now there, thus here below. */}
                        <PanelGroup direction="vertical">

                            {/* step491: now : again we will have the up and down panels made using the Panel component, thus here below. */}

                            {/* step492: so top panel for the code editor, thus here below. */}
                            <Panel defaultSize={55} minSize={30}>
                                <CodeEditorPanel
                                    // step572: so now here inside this we pass the props needed from this parent file of ProblemPge.jsx into the child component CodeEditorPanel.js ; so : Prop passing means: Passing data and/or functions from a parent component to a child component so the child can use values or trigger parent logic, thus here below.

                                    // step573: so : Here we are passing both state values and functions as props from the parent to the CodeEditorPanel so the child component can display current data and also call parent functions to update state in the parent component too, when user interacts, thus here below.

                                    // step574: so parent sends a refernce that child with variables to use the variables if needed and function calls to change some values or states too, that will reflect in parent component and all where it was used too, thats why a refernece is sent by parent to the child here below ; In the parent here, we pass only the function reference without calling it "WITHOUT ANY PARAMETERS PASSED HERE", PARAMETER WILL BE PASSED WHEN FUNCTION IS CALLED IN CHILD, THIS BELOW IS NOT A FUNCTION CALL BUT JUST A REFERNCE THAT OK USE THIS FUNCTION AND THEN ANY CHANGE YOU DO TO STATE WILL REFLECT HERE AND ALL WHEREVER STATE IS USED AS ITS A REFERNEC LIKE POINTERS IN CPP, WE SENT A REFERNEC THAT CHANGES IT AT ALL PLACES / ADDRESS WHEREVR IT IS, SIMILARLY DONE HERE ALSO THERE, THUS here below.

                                    /*
                                    step575: So here : 

                                    - Parent sends values so child can use/display them.

                                    - Parent sends function references (not calls) so child can trigger updates.

                                    - Parameters are passed only when the child calls the function, not when passing it.

                                    - When the child calls the function, it updates state in the parent.

                                    - Since state lives in the parent, any change causes re-render everywhere that state is used.

                                    - And yes — conceptually we can think of it like a reference (similar idea to pointers in C++), but technically it’s just JavaScript passing a function reference, not memory addresses ; but its just to say that we pass only a reference, not a function call with paramethers in the child components here below there, thus here below.

                                    SO overall : Parent sends values and function references to the child component so the child can use those variables for display and call those functions when interaction happens; in the parent we pass only the function reference without calling it (no parameters are passed here), and the parameter will be provided later when the child actually calls the function; this is not a function call but just a reference saying “use this function when needed”, and when the child calls it and updates state, that state change reflects in the parent and everywhere that state is used because the state lives in the parent; conceptually similar to passing a reference in C++ where changes affect the original source, thus here below.

                                    */

                                    // step576: so we will pass selectedLanguage : Tells the editor which programming language is currently selected (e.g., "javascript", "cpp") ; then > code : Contains the current code written in the editor so it can be displayed and edited ; then : isRunning > Boolean flag to indicate whether code is currently executing (used to show spinner / disable button) ; onLanguageChange > Function the editor calls when user changes the language dropdown ; onCodeChange > Function the editor calls when user types or edits the code (updates parent state) and finally onRunCode > Function the editor calls when user clicks the "Run" button, thus here below.

                                    // step577: see the next steps in CodeEditorPanel.jsx file now there, thus here below.
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            {/* step493: again a resizable handle to resize the panels in middle of both the panels ; all class same as above > but now we will have h-2 as now height needed to show it vertically there and also now the cursor when hovered will be vertically adjusting things there, so now : not "column-resize" but "row-resize", thus here below. */}
                            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

                            {/* step494: now the bottom panel for the output console & again here by rule no restriction on keeping minm size limit to any, but default size of both initially should sum up to / add up to : 100% exactly not less not more as then it may look difficult to resize and weird while resizing there in the UI, thus here below. */}
                            <Panel defaultSize={45} minSize={30}>

                                {/* step680: now lets make this ouput panel ; so we first pass the needed states and functions in it as props to be used there ; and any changes in the states there , will be reflected in the parent component too by rule, thus here below. */}
                                <OutputPanel
                                    // step681: so we pass the output state containing the result that we had set to result in handleRunCode method, thus here below.

                                    // step682: see the next steps in OutputPanel.jsx file now there, thus here below.
                                    output={output}
                                />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}

export default ProblemPage
