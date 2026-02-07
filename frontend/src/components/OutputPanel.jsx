// step683: so we destructure the props that were sent here as they are sent as an object internally, so we destructure the needed props using {...} format for destructuring, thus here below.
function OutputPanel({ output }) {
  return (

    // step684: so here we : Set container to full height of parent, use base background color coming from DAISY UI, and arrange all the children inside it vertically one below the other using flex column layout, thus here below.
    <div className="h-full bg-base-100 flex flex-col">

      {/* step685: so the first element at top we have in the flex-col as this div where we : SSet horizontal and vertical padding, apply DaisyUI base-200 background shade (from Tailwind CSS theme), add bottom border using base-300 for visual separation, and style text as small and semi-bold for header emphasis, thus here below. */}
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
        Output
      </div>

      {/* step686: so the next element in the flex-col we have below the above div is : this div , where we : Fill remaining available vertical space inside the flex column layout, enable scrolling if content overflows, and apply uniform padding of 4 using Tailwind CSS utility classes, thus here below. */}
      <div className="flex-1 overflow-auto p-4">

        {/* step687: now using conditional rendering, we will render the following based on if the output state is null or not there, thus here below. */}
        {output === null 
        ? (
          // step688: so we display this there if the ouput state is null, thus here below.
          <p className="text-base-content/50 text-sm">
            Click "Run" to see the ouput for your code here...
          </p>
        )
        // step689: now if ouput state is not null, then also we have two cases, thus here below.
        : output.success === true

        // step690: so we display the following there, if the success in ouput object is true, thus here below.
          ? (
            // step691: so here in success case, we set : small text size, apply monospace font for code-style appearance, use DaisyUI success color (from Tailwind CSS theme), and preserve whitespace and line breaks while allowing text to wrap naturally, thus here below.

            // step692: normal HTML ignores extra spaces and line breaks like "\n" , and if we had <p>hello         world</p> , it will remove all spaces and give just "hello world" ; but <pre> tag spaces and newlines are preserved and displayed as they are ; thats why since ouput field contains "\n" and all like seen in problems.js also we have expectedOuput wiht "\n" in them ; so to preserve them and display those " " and "\n" as well, we use <pre> tag here for the ouput console, thus here below.
            <pre className="text-sm font-mono text-success whitespace-pre-wrap">

              {/* step693: then we know we had output as : {success: true, output: "hello world"} , so we display that output here by going into output object and get the output field using dot notation i.e. output.output, thus here below. */}

              {/* step694: the problem with <pre> is that : if output is too long like "aaaaaaaaaaaaaaaaaaaaaaa....." ; then it doesn't wrap it to next line and displayes it there with a horizontal scroll-bar ; so we use whitespace-pre-wrap to preserve whitespace and line breaks too, but if the text gets too long inside it, it wrpas it to next line ; thus it prevents overflow and makes UI look good without any horizonatal scroll-bar, thus here below. */}
              {output.output}
            </pre>
          )
          : (
            // step695: if there is an error and not success, then we return the following div thus, here below.
            <div>
              {/* step696: so again now if there is output.output as non-empty and if its not there as undefined, then only show the following as it maybe that since code didn't run success, so ouput is undefined or empty returned by piston api ; and then if its undefined we don't want to display undefined there, so display the following only if output.output is non-empty and not undefined, thus here below. */}
              {output.output && (

                // step697: so here again we : Set small text size, apply monospace font for code-style formatting, use DaisyUI base-content color (from Tailwind CSS theme) for normal readable text, preserve whitespace and line breaks while allowing wrapping i.e. if text gets too long, it wraps to next line, and add bottom margin spacing using Tailwind CSS utility classes "mb-2" there/here, thus here below ; if here below the class "whitespace-pre-wrap" is not used, it will overflow and display horizontal scroll-bar there making the UI look ugly and not good there, so to prevent that we use this <pre> tag along with the class "whitespace-pre-wrap" here/there, thus here below.

                // step698: reason of this pre and whitespace-pre-wrap explained clearly in step692 and 694, CAN REFER TO THAT TO KNOW WHY WE USED "PRE" AND THE CLASS "WHITESPACE-PRE-WRAP" HERE, THUS HERE BELOW.
                <pre className="text-sm font-mono text-base-content whitespace-pre-wrap mb-2">
                  {output.output}
                </pre>
              )}

              {/* step699: similarly if there is output.error, then only show the following thus, here below. */}
              {output.error && (
                  // step700: so here we : Set small text size, apply monospace font for code-style formatting, use DaisyUI error color like RED TYPE ERROR COLOR (from Tailwind CSS theme) to display error messages in red tone, and preserve whitespace and line breaks while allowing wrapping ; reason of this pre and whitespace-pre-wrap explained clearly in step692 and 694, CAN REFER TO THAT TO KNOW WHY WE USED "PRE" AND THE CLASS "WHITESPACE-PRE-WRAP" HERE, THUS HERE BELOW there, thus here below.

                  // step701: see the next steps now in step702.txt file now there, thus here below.
                  <pre className="text-sm font-mono text-error whitespace-pre-wrap">
                      {output.error}
                  </pre>
              )}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OutputPanel
