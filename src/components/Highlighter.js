import { useContext, useState } from "react";
import PositionedMenu from "./PopupMenu";
import HighlightsContext from "../store/highlights-context";

function Highlighter() {
    const highlightsContext = useContext(HighlightsContext);

    const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt" ;

    const [selectionMetadata, setSelectionMetadata] = useState(null);
    const [leftInterval, setLeftInterval] = useState(-1);
    const [rightInterval, setRightInterval] = useState(-1);
    const [isCreated, setIsCreated] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const [clickPosition, setClickPosition] = useState(-1);

    const highlightStartIntervals = highlightsContext.highlightStartIntervals;
    const highlightEndIntervals = highlightsContext.highlightEndIntervals;
    const comments = highlightsContext.comments;

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

    function findAnnotationsCountShadowingEachLetter(startIntervals, startCnt, endIntervals, endCnt) {
        var letters = [];

        let startPointer = 0;
        let endPointer = 0;
        let openedHighlightsCount = 0;
        let closedHighlightsCount = 0;

        for (let i = 0; i < text.length; i++) {
            if (i === startIntervals[startPointer]) {
                for (let j = 0; j < startCnt[i]; j++)
                    openedHighlightsCount++;

                startPointer ++;
            }
    
            letters[i] = openedHighlightsCount - closedHighlightsCount;
    
            if (i === endIntervals[endPointer]) {
                for (let j = 0; j < endCnt[i]; j++)
                    closedHighlightsCount++;
                
                endPointer ++;
            }
        }

        letters[text.length] = 1000;

        return letters;
    }

    function oddRepetitousOut(toBeCleaned, count) {
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

    function findClickedPositionInterval(selection, leftOffset) {
        let ans = -1;
        for (let i = 0; i < highlightStartIntervals.length; i++)
            if (leftOffset >= highlightStartIntervals[i] && leftOffset <= highlightEndIntervals[i])
                ans = i;

        if(ans !== -1) {
            setSelectionMetadata(selection);
            setLeftInterval(highlightStartIntervals[ans]);
            setRightInterval(highlightEndIntervals[ans]);
            setClickPosition(leftOffset);
            setIsCreated(true);
            setSelectedComment(comments[ans]);

        }
    }

    const handleMouseUp = () => {
        let selection = window.getSelection();
                
        var range = calculateAbsoluteOffset(selection);
        const absoluteLeftOffset = range[0];
        const absoluteRightOffset = range[1];

        if (absoluteLeftOffset === absoluteRightOffset && absoluteLeftOffset !== 0) {
            findClickedPositionInterval(selection, absoluteLeftOffset);
        } else if (selection.getRangeAt(0).getBoundingClientRect().left !== 0 && selection.getRangeAt(0).getBoundingClientRect().top !== 0) {
            setSelectionMetadata(selection);
            setRightInterval(absoluteRightOffset);
            setLeftInterval(absoluteLeftOffset);
            setIsCreated(false);
            setSelectedComment('');
        }
    }

    let endCount = [];
    let withoutReptitousEnd = oddRepetitousOut(highlightEndIntervals, endCount);

    let startCount = [];
    let withoutRepetitousStart = oddRepetitousOut(highlightStartIntervals, startCount);

    withoutReptitousEnd.sort(function(a, b) {
        return a - b;
    });

    withoutRepetitousStart.sort(function(a, b) {
        return a - b;
    });

    var letters = findAnnotationsCountShadowingEachLetter(withoutRepetitousStart, startCount, withoutReptitousEnd, endCount);

    const parts = divideTextIntoGivenParts(letters);

    return(
        <div id="unique" onMouseUp={handleMouseUp}>
            <div>{text.length === 0 ? text : parts}</div>

            <PositionedMenu
                isCreated={isCreated}
                selectedComment={selectedComment}
                leftInterval={leftInterval} 
                rightInterval={rightInterval} 
                clickPosition={clickPosition}
                metadata={selectionMetadata}/>
        </div>
    );
}

export default Highlighter;