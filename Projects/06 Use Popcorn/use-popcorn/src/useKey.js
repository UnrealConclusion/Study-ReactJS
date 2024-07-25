import { useEffect } from "react";

/**
 * Install an event listener that listens for a key press
 * Calls a callback function (action) when the key is pressed
 */
export default function useKey(key, action) {
    useEffect(
        function() {
          // callback function for the listener
          function callback(event) {
            if (event.code.toLowerCase() === key.toLowerCase()) {
              action();
            }
          }
          
          // install event listener
          document.addEventListener("keydown", callback);
          
          // uninstall event listener
          return function () {
            document.removeEventListener("keydown", callback);
          };
        }
      , [action, key]);
}