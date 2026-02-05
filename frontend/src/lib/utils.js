// step404: so now lets create a method to give us the colors based on the difficulty level of problem, thus here below.
export const getDifficultyBadgeClass = (difficulty) => {
    // step405: convert to lowercase so that even if its some part upper, convert to lower and have a clean check for the respective cases in the switch, thus here below.
    switch(difficulty.toLowerCase()) {

        // step406: give appropriate daisyUI badge colors classes, based on the difficulty level, thus here below.

        // step407: see the next steps in ProblemsPage.jsx file now there, thus here below.
        case "easy":
            return "badge-success"
        case "medium":
            return "badge-warning"
        case "hard":
            return "badge-error"
        default:
            return "badge-ghost"
    }
}