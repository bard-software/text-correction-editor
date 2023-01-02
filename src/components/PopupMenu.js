import { useEffect, useContext, useRef, useState } from 'react'

import HighlightsContext from '../store/highlights-context';

export default function PopupMenu(props) {
  const highlightsContext = useContext(HighlightsContext);

  const [isOpen, setIsOpen] = useState(false);

  const lastRandom = useRef(-1);

  const highlightStart = props.highlightStart;
  const highlightEnd = props.highlightEnd;
  const selectedComment = props.selectedComment;
  const isCreated = props.isCreated;
  const random = props.random;

  //hook to detect outside click
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClose();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

    }, [ref, handleClose]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function addHighlight() {
    if (!highlightsContext.isHighlightAdded(highlightStart, highlightEnd)) {
      highlightsContext.addHighlightStart(highlightStart);
      highlightsContext.addHighlightEnd(highlightEnd);
      highlightsContext.addComment("");
    }
  }

  function modifyHighlight() {
    highlightsContext.modifyComments(highlightStart, highlightEnd, document.getElementById('outlined-basic').value);
    setIsOpen(false);
  }

  function removeHighlight() {
    highlightsContext.deleteHighlight(highlightStart, highlightEnd);
    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
    if (!isCreated)
      highlightsContext.deleteHighlight(highlightStart, highlightEnd);
  }

  if (highlightStart !== highlightEnd && random !== -1 && lastRandom.current !== random) {
    lastRandom.current = random;
    setIsOpen(true);
  }

  return (
    <div>
      { isOpen &&
        <div
          id="popover"
          onClick={addHighlight}
          ref={wrapperRef}
          style={{
            position: 'fixed',
            top: `${props.topPos}px`,
            left: `${props.leftPos + ((props.width) / 2)}px`,
            background: 'white',
            transform: 'translate(-50%, -100%)',
            border: '1px solid black',
          }} 
        >
        
          <input type="text" id="outlined-basic" name="Outlined" defaultValue={selectedComment}/>
        
          <button onClick={modifyHighlight} >Submit</button>

          { isCreated && <button onClick={removeHighlight}>Remove</button> }

        </div>
      }
    </div>
  );
}