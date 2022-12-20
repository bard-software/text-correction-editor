import { useContext, useState } from 'react'

import Popover from '@mui/material/Popover';
import HighlightsContext from '../store/highlights-context';
import { Button } from '@mui/material';
import { TextField } from '@mui/material'

import classes from '../style/PopupMenu.module.css'

export default function PositionedMenu(props) {
  const highlightsContext = useContext(HighlightsContext);
  const [open, setOpen] = useState(true);
  const [lastLeftInterval, setLastLeftInterval] = useState(-1);
  const [lastClickPosition, setLastClickPosiiton] = useState(-1);

  const metadata = props.metadata;

  if (metadata === null)
    return;

  var leftInterval = -1;
  leftInterval = props.leftInterval;
  const rightInterval = props.rightInterval;
  
  var clickPosition = -1;
  clickPosition = props.clickPosition;

  const leftPos = metadata.getRangeAt(0).getBoundingClientRect().left;
  const topPos = metadata.getRangeAt(0).getBoundingClientRect().top;
  const width = metadata.getRangeAt(0).getBoundingClientRect().width;

  const isCreated = props.isCreated;
  const comment = props.selectedComment;

  if ((leftInterval !== -1 && leftInterval !== lastLeftInterval) 
      || (isCreated && clickPosition !== -1 && clickPosition !== lastClickPosition)) {
    setOpen(true);
    setLastLeftInterval(leftInterval);

    if (isCreated)
        setLastClickPosiiton(clickPosition);
  }

  function handleFocus() {
    console.log("FOCUSED");
    if (!isCreated) {
      highlightsContext.addHighlightStartInterval(leftInterval);
      highlightsContext.addHighlightEndInterval(rightInterval);
      highlightsContext.addComment("TESTING");
    }
  }

  function handleClose() {
    console.log("CLOSED");
    if (!isCreated) {
      highlightsContext.deleteHighlightInterval(leftInterval);
    }
    // highlightsContext.deleteHighlightInterval(leftInterval);
    setOpen(false);
  }

  function handleClick() {
    if (document.getElementById('outlined-basic').value.length !== 0) {
      if (isCreated) {
        highlightsContext.modifyComments(leftInterval, document.getElementById('outlined-basic').value)
      } else {
        console.log("CLICKED");
        // highlightsContext.deleteHighlightInterval(leftInterval);
        highlightsContext.modifyComments(leftInterval, document.getElementById('outlined-basic').value);
      }
      setOpen(false);
    }
  }

  function handleRemove() {
    highlightsContext.deleteHighlightInterval(leftInterval);
    setOpen(false);
  }

  console.log("CHECKING : " + open);

  console.log("RIGHT : " + rightInterval);
  console.log("LEFT : " + leftInterval);

  if(open) {
    
  }

  if (rightInterval - leftInterval > 0 || isCreated) {
    if (isCreated) {
      return (
        <div>
          <Popover
            anchorReference="anchorPosition"
            open={open}
            onClose={handleClose}
            anchorPosition={{ top: topPos - 10, left: leftPos + ((3 * width) / 4) }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }} >
    
            <div className={classes.menu}>
              <TextField onFocus={handleFocus} id="outlined-basic" label="Outlined" variant="outlined" defaultValue={comment}/>
    
              <Button onClick={handleClick} variant="contained">Submit</Button>
    
              <Button onClick={handleRemove} variant="contained">Remove</Button>
            </div>
    
          </Popover>
    
        </div>
      );
    } else {
      return (
        <div>
          <Popover
            anchorReference="anchorPosition"
            open={open}
            onClose={handleClose}
            anchorPosition={{ top: topPos - 10, left: leftPos + ((3 * width) / 4) }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }} >
    
            <div className={classes.menu}>
              <TextField onFocus={handleFocus} id="outlined-basic" label="Outlined" variant="outlined">{comment}</TextField>
    
              <Button onClick={handleClick} variant="contained">Submit</Button>
            </div>
          </Popover>
    
        </div>
      );
    }   
  } else {
    console.log("WOULD YOU CLUE ME IN?")
  }
}