import Selection from "@simonwep/selection-js";

// Initialize selectionjs

/**
 * this is library from https://github.com/Simonwep/selection
 * doc https://simonwep.github.io/selection/
 */
const selection = Selection.create({

    // Class for the selection-area
    class: 'selection',

    // All elements in this container can be selected
    selectables: ['.selectable'],

    // The container is also the boundary in this case
    boundaries: ['table'],

}).on('beforestart', evt => {
    // removeSelected()
    document.querySelector("#multi-insert").value = ""
    return true

}).on('start', ({inst, selected, oe}) => {

    // Remove class if the user isn't pressing the control key or ⌘ key
    if (!oe.ctrlKey && !oe.metaKey) {

        // Unselect all elements
        for (const el of selected) {
            el.classList.remove('selected');
            inst.removeFromSelection(el);
        }

        // Clear previous selection
        inst.clearSelection();
    }

}).on('move', ({changed: {removed, added}}) => {
    
    // Add a custom class to the elements that where selected.
    for (const el of added) {
        el.classList.add('selected');
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
        el.classList.remove('selected');
    }

}).on('stop', ({inst}) => {
    inst.keepSelection();
    document.querySelector("#multi-insert").focus();
});
