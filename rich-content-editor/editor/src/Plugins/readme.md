#Wix Draft JS plugins
##Example - gallery plugin
The gallery plugin includes two components:
1. Gallery
2. Toolbar
The gallery is just a react component that displays a set of media images
The toolbar is visible when the user clicks on the gallery in editor mode 

The toolbar includes a list of buttons of the following type:
1. Simple button: A button that activates an action on the gallery when clicked. Clicking again will do the action again
2. Toggle button: A button that will do an action and change it's state to 'clicked' when the state is changed. Clicking again will revert the state
3. Dropdown: A button that when clicked, a list of other buttons is shown
4. Modal: A button that when clicked opens a modal

To support the above types, we will need to have some shared state between the modal and the toolbar
Can this state be the editor's state???

We need a single toolbar component that has a visibility flag.
When the visibility flag is changes, the toolbar needs to render itself based on the list of buttons and the location relative to the component that was clicked

