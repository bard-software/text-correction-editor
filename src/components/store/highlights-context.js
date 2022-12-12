import { useState, createContext } from "react";

const HighlightsContext = createContext({
    highlightStartIntervals : [],
    highlightEndIntervals : [],
    comments : [],
    addHighlightStartInterval : (start) => {},
    addHighlightEndInterval : (end) => {},
    addComment : (comment) => {},
    modifyComments : (start, newComment) => {},
    deleteHighlightInterval : (start) => {}
});

export function HighlightsContextProvider(props) {
    const [updatedStartIntervals, setUpdatedStartIntervals] = useState([]);
    const [updatedEndIntervals, setUpdatedEndIntervals] = useState([]);
    const [updatedComments, setUpdatedComments] = useState([]);

    const n = updatedStartIntervals.length;

    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i + 1; j < n; j++){
            if(updatedStartIntervals[j] < updatedStartIntervals[min]) {
                min = j; 
            }
         }

         if (min != i) {
            let tmpStart = updatedStartIntervals[i];
            let tmpEnd = updatedEndIntervals[i];
            let tmpComment = updatedComments[i];
             
            updatedStartIntervals[i] = updatedStartIntervals[min];
            updatedEndIntervals[i] = updatedEndIntervals[min];
            updatedComments[i] = updatedComments[min];

            updatedStartIntervals[min] = tmpStart;      
            updatedEndIntervals[min] = tmpEnd;
            updatedComments[min] = tmpComment;
        }
    }
    
    console.log("LENGTH : " + updatedStartIntervals.length);
    for (var i = 0; i < updatedEndIntervals.length; i++) {
        console.log("START : " + updatedStartIntervals[i]);
        console.log("END : " + updatedEndIntervals[i]);
        console.log("COMMENT : " + updatedComments[i]);
    }

    function addHighlightStartIntervalHandler(start) {
        setUpdatedStartIntervals((pre) => {
            return pre.concat(start);
        });
    }

    function addHighlightEndIntervalHandler(end) {
        setUpdatedEndIntervals((pre) => {
            return pre.concat(end);
        });
    }   

    function addCommentHandler(comment) {
        setUpdatedComments((pre) => {
            return pre.concat(comment);
        })
    }

    function modifyCommentsHandler(start, newComment) {
        const index = updatedStartIntervals.indexOf(start);
        setUpdatedComments((pre) => {
            let newComments = pre;
            newComments[index] = newComment;

            return newComments;
        });
    }

    function deleteHighlightIntervalHandler(start) {
        const index = updatedStartIntervals.indexOf(start);
        
        const endInterval = updatedEndIntervals[index];
        const comment = updatedComments[index];

        setUpdatedStartIntervals((pre) => {
            return pre.filter((item) => item !== start);
        });

        setUpdatedEndIntervals((pre) => {
            return pre.filter((item) => item !== endInterval);
        });

        setUpdatedComments((pre) => {
            return pre.filter((item) => item !== comment);
        });

    }
    
    const context = {
        highlightStartIntervals : updatedStartIntervals,
        highlightEndIntervals : updatedEndIntervals,
        comments : updatedComments,
        addHighlightEndInterval : addHighlightEndIntervalHandler,
        addHighlightStartInterval : addHighlightStartIntervalHandler,
        addComment : addCommentHandler,
        modifyComments : modifyCommentsHandler,
        deleteHighlightInterval : deleteHighlightIntervalHandler
    }

    return (
        <HighlightsContext.Provider value={context}>
            {props.children}
        </HighlightsContext.Provider>
    );
}

export default HighlightsContext;