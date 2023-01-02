import { useContext, useState, useEffect } from "react";
import PopupMenu from "./PopupMenu";
import HighlightsContext from "../store/highlights-context";

function Highlighter(props) {
    const highlightsContext = useContext(HighlightsContext);

    const text = props.text;

    const [leftPos, setLeftPos] = useState(-1);
    const [topPos, setTopPos] = useState(-1);
    const [width, setWidth] = useState(-1);
    const [highlightStart, setHighlightStart] = useState(-1);
    const [highlightEnd, setHighlightEnd] = useState(-1);
    const [isCreated, setIsCreated] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const [random, setRandom] = useState(-1);
    
    const [parts, setParts] = useState([]);

    const highlightStarts = highlightsContext.highlightStarts;
    const highlightEnds = highlightsContext.highlightEnds;
    const comments = highlightsContext.comments;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }      

    function calculateColorToUse(overlapsCount) {
        switch (overlapsCount) {
            case 1 :
                return "red";

            case 2 :
                return "yellow";

            case 3 :
                return "green";

            default :
                return "white";
        }
    }

    function divideTextIntoGivenParts(letters) {
        const parts = [];

        var id = 1;

        let currentOverlapsCount = letters[0];
        let currentSubstring = text[0];
        for (let i = 1; i <= text.length; i++) {
            if (currentOverlapsCount !== letters[i]) {
                var color = calculateColorToUse(currentOverlapsCount);
                parts.push(<mark id={id} style={{backgroundColor: color}}>{currentSubstring}</mark>);

                id ++;
                currentOverlapsCount = letters[i];
                currentSubstring = text[i];
            } else {
                currentSubstring += text[i];
            }
        }

        return parts;
    }

    function findAnnotationsCountShadowingEachLetter(highlightStarts, startCnt, highlightEnds, endCnt) {
        var letters = [];

        let startPointer = 0;
        let endPointer = 0;
        let openedHighlightsCount = 0;
        let closedHighlightsCount = 0;

        for (let i = 0; i < text.length; i++) {
            if (i === highlightStarts[startPointer]) {
                for (let j = 0; j < startCnt[i]; j++)
                    openedHighlightsCount++;

                startPointer ++;
            }
    
            letters[i] = openedHighlightsCount - closedHighlightsCount;
    
            if (i === highlightEnds[endPointer]) {
                for (let j = 0; j < endCnt[i]; j++)
                    closedHighlightsCount++;
                
                endPointer ++;
            }
        }

        letters[text.length] = 1000;

        return letters;
    }

    function removeRepetitous(toBeCleaned, count) {
        var withoutRepetitous = [];
        for (let i = 0; i < toBeCleaned.length; i++) {
            if (typeof count[toBeCleaned[i]] === 'undefined') {
                count[toBeCleaned[i]] = 1;
                withoutRepetitous.push(toBeCleaned[i]);
            } else {
                count[toBeCleaned[i]] ++;
            }
        }

        return withoutRepetitous;
    }

    function calculateAbsoluteOffset(selection) {
        var range = selection.getRangeAt(0);

        var absoluteLeftOffset = range.startOffset;
        var absoluteRightOffset = 0;

        const idNumber = Number(selection.anchorNode.parentNode.id);
        
        if (!Number.isNaN(idNumber) && idNumber > 1) {
            for (var i = idNumber - 1; i >= 1; i--)
                if (document.getElementById(i) !== null)
                    absoluteLeftOffset += document.getElementById(i).textContent.length;
        }

        absoluteRightOffset = absoluteLeftOffset + selection.toString().length;

        return [absoluteLeftOffset, absoluteRightOffset];
    }

    function findClickedPositionHighlight(selection, leftOffset) {
        let ans = -1;
        for (let i = 0; i < highlightStarts.length; i++)
            if (leftOffset >= highlightStarts[i] && leftOffset <= highlightEnds[i])
                ans = i;

        if(ans !== -1) {
            setRandom(getRandomInt(1, 1000));
            setLeftPos(selection.getRangeAt(0).getBoundingClientRect().left);
            setTopPos(selection.getRangeAt(0).getBoundingClientRect().top);
            setWidth(selection.getRangeAt(0).getBoundingClientRect().width);
            setHighlightStart(highlightStarts[ans]);
            setHighlightEnd(highlightEnds[ans]);
            setIsCreated(true);
            setSelectedComment(comments[ans]);

        }
    }

    const handleMouseUp = () => {
        let selection = window.getSelection();
        
        const leftPos = selection.getRangeAt(0).getBoundingClientRect().left;
        const topPos = selection.getRangeAt(0).getBoundingClientRect().top;

        var range = calculateAbsoluteOffset(selection);
        const absoluteLeftOffset = range[0];
        const absoluteRightOffset = range[1];

        if (absoluteLeftOffset === absoluteRightOffset && selection.anchorNode.parentNode.id !== 'popover') {
            findClickedPositionHighlight(selection, absoluteLeftOffset);
        } else if (leftPos !== 0 && topPos !== 0 && selection.anchorNode.parentNode.id !== 'popover') {
            setRandom(getRandomInt(1, 1000));
            setLeftPos(selection.getRangeAt(0).getBoundingClientRect().left);
            setTopPos(selection.getRangeAt(0).getBoundingClientRect().top);
            setWidth(selection.getRangeAt(0).getBoundingClientRect().width);
            setHighlightEnd(absoluteRightOffset);
            setHighlightStart(absoluteLeftOffset);
            setIsCreated(false);
            setSelectedComment('');
        }
    }

    useEffect(() => {
        let endCount = [];
        let withoutReptitousEnd = removeRepetitous(highlightEnds, endCount);

        let startCount = [];
        let withoutRepetitousStart = removeRepetitous(highlightStarts, startCount);

        withoutReptitousEnd.sort(function(a, b) {
            return a - b;
        });

        withoutRepetitousStart.sort(function(a, b) {
            return a - b;
        });

        var letters = findAnnotationsCountShadowingEachLetter(withoutRepetitousStart, startCount, withoutReptitousEnd, endCount);

        setParts(divideTextIntoGivenParts(letters));
    
    }, [highlightStarts]);

    return(
        <div id="unique" onMouseUp={handleMouseUp} >

            <div>{highlightStarts.length === 0 ? text : parts}</div>

            <PopupMenu
                isCreated={isCreated}
                selectedComment={selectedComment}
                highlightStart={highlightStart} 
                highlightEnd={highlightEnd} 
                random={random}
                leftPos={leftPos}
                topPos={topPos}
                width={width} />
        </div>
    );
}

export default Highlighter;