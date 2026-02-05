// step325: import React library.
// React allows us to create components and use JSX (HTML-like syntax inside JavaScript).
// In React 17+ this is optional, but keeping it is good practice for clarity.
import React from "react"


// step326: create a functional component named VideoModal.
// A component is simply a reusable UI block.
//
// Here we receive PROPS from parent (HomePage).
// Instead of writing props.show and props.onClose,
// we use destructuring: { show, onClose }
//
// show    → boolean → controls whether modal is visible
// onClose → function → called when user clicks close button
function VideoModal({ show, onClose }) {


  // step327: conditional rendering logic.
  // If show is false → return null.
  //
  // return null means:
  //   "render nothing"
  //   "do not create any HTML"
  //
  // This is better than hiding with CSS because:
  //   ✓ improves performance
  //   ✓ keeps DOM clean
  //   ✓ avoids unnecessary elements
  if (!show) return null


  // step328: if show is TRUE, React executes below JSX
  // and renders the modal on the screen.
  return (

    // step329: this is the FULL-SCREEN overlay background.
    //
    // fixed          → sticks to screen (not scroll)
    // inset-0        → top:0 bottom:0 left:0 right:0 (full screen)
    // bg-black/70    → dark transparent background
    // backdrop-blur  → blur effect behind modal (glass look)
    // flex           → enable flexbox
    // items-center   → vertical center
    // justify-center → horizontal center
    // z-50           → keeps above all other content
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">


      {/* 
        step330: this is the white MODAL BOX (card).
        
        bg-base-100  → white background
        p-4          → padding
        rounded-2xl  → rounded corners
        shadow-2xl   → big shadow
        relative     → allows close button to position absolutely inside
      */}
      <div className="bg-base-100 p-4 rounded-2xl shadow-2xl relative">


        {/*
          step331: close button (X).

          absolute → free positioning inside parent
          -top-3  → slightly above top
          -right-3 → slightly right
          btn styles from daisyUI

          onClick={onClose}
          IMPORTANT:
          onClose is NOT defined here.
          It is passed from HomePage.

          When clicked:
              HomePage → setShowVideo(false)
              → modal closes
        */}
        <button
          className="absolute -top-3 -right-3 btn btn-circle btn-sm btn-error"
          onClick={onClose}
        >
          ✕
        </button>


        {/*
          step332: iframe embeds YouTube video.

          w-[90vw]   → responsive width (90% of screen)
          max-w-3xl  → limit max size
          aspect-video → keeps 16:9 ratio automatically
          rounded-xl → rounded edges

          IMPORTANT:
          must use embed format:
              https://www.youtube.com/embed/VIDEO_ID

          autoplay=1 → auto start video
          rel=0      → hide related videos
        */}
        <iframe
          className="w-[90vw] max-w-3xl aspect-video rounded-xl"
          src="https://www.youtube.com/embed/GhOxXWno8og?autoplay=1&rel=0"
          title="Demo Video"
          allowFullScreen
        />

      </div>
    </div>
  )
}


// step333: export component so other files can use it.
// Without export → cannot import in HomePage.

// step334: see the next steps in HomePage.jsx file now there, thus here below.
export default VideoModal
