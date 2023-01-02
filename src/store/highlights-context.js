import { useState, createContext } from "react";

const HighlightsContext = createContext({
    highlightStarts : [],
    highlightEnds : [],
    comments : [],
    addHighlightStart : (start) => {},
    addHighlightEnd : (end) => {},
    addComment : (comment) => {},
    modifyComments : (start, end, newComment) => {},
    deleteHighlight : (start, end) => {},
    isHighlightAdded : (start, end) => {}
});

export function HighlightsContextProvider(props) {
    const [updatedStarts, setUpdatedStarts] = useState([]);
    const [updatedEnds, setUpdatedEnds] = useState([]);
    const [updatedComments, setUpdatedComments] = useState([]);

    const n = updatedStarts.length;

    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i + 1; j < n; j++){
            if(updatedStarts[j] < updatedStarts[min]) {
                min = j; 
            }
         }

         if (min !== i) {
            let tmpStart = updatedStarts[i];
            let tmpEnd = updatedEnds[i];
            let tmpComment = updatedComments[i];
             
            updatedStarts[i] = updatedStarts[min];
            updatedEnds[i] = updatedEnds[min];
            updatedComments[i] = updatedComments[min];

            updatedStarts[min] = tmpStart;      
            updatedEnds[min] = tmpEnd;
            updatedComments[min] = tmpComment;
        }
    }
    
    console.log("LENGTH : " + updatedStarts.length);
    for (var i = 0; i < updatedEnds.length; i++) {
        console.log("START : " + updatedStarts[i]);
        console.log("END : " + updatedEnds[i]);
        console.log("COMMENT : " + updatedComments[i]);
    }

    function addHighlightStartHandler(start) {
        setUpdatedStarts((pre) => {
            return pre.concat(start);
        });
    }

    function addHighlightEndHandler(end) {
        setUpdatedEnds((pre) => {
            return pre.concat(end);
        });
    }   

    function addCommentHandler(comment) {
        setUpdatedComments((pre) => {
            return pre.concat(comment);
        })
    }

    function modifyCommentsHandler(start, end, newComment) {
        let toModifyIndex = -1;
        for (let i = 0; i < updatedStarts.length; i++) {
            if (updatedStarts[i] === start && updatedEnds[i] === end) {
                toModifyIndex = i;
                break;
            }
        }

        setUpdatedComments((pre) => {
            let newComments = pre;
            newComments[toModifyIndex] = newComment;

            return newComments;
        });
    }

    function deleteHighlightHandler(start, end) {
        let toDeleteIndex = -1;
        for (let i = 0; i < updatedStarts.length; i++) {
            if (updatedStarts[i] === start && updatedEnds[i] === end) {
                toDeleteIndex = i;
                break;
            }
        }

        if (toDeleteIndex === -1) return;
        
        setUpdatedStarts((pre) => {
            return pre.filter((_, index) => index !== toDeleteIndex);
        });

        setUpdatedEnds((pre) => {
            return pre.filter((_, index) => index !== toDeleteIndex);
        });

        setUpdatedComments((pre) => {
            return pre.filter((_, index) => index !== toDeleteIndex);
        });

    }

    function isHighlightAddedHandler(start, end) {
        let index = -1;
        for (let i = 0; i < updatedStarts.length; i++) {
            if (updatedStarts[i] === start && updatedEnds[i] === end) {
                index = i;
                break;
            }
        }

        if (index === -1)
            return false;
        else
            return true;
    }
    
    const context = {
        highlightStarts : updatedStarts,
        highlightEnds : updatedEnds,
        comments : updatedComments,
        addHighlightEnd : addHighlightEndHandler,
        addHighlightStart : addHighlightStartHandler,
        addComment : addCommentHandler,
        modifyComments : modifyCommentsHandler,
        deleteHighlight : deleteHighlightHandler,
        isHighlightAdded : isHighlightAddedHandler
    }

    return (
        <HighlightsContext.Provider value={context}>
            {props.children}
        </HighlightsContext.Provider>
    );
}

export default HighlightsContext;