import { useContext, useState } from "react";
import PositionedMenu from "./popupmenu";
import HighlightsContext from "./store/highlights-context";

function Highlighter() {
    const highlightsContext = useContext(HighlightsContext);

    const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt" ;

    const [selectionMetadata, setSelectionMetadata] = useState(null);
    const [leftInterval, setLeftInterval] = useState(-1);
    const [rightInterval, setRightInterval] = useState(-1);
    const [isCreated, setIsCreated] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const [clickPosition, setClickPosition] = useState(-1);

    const highlightStartIntervals = highlightsContext.highlightStartIntervals;
    const highlightEndIntervals = highlightsContext.highlightEndIntervals;
    const comments = highlightsContext.comments;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }      

    const handleMouseUp = () => {
        let selection = window.getSelection();
                
        var range = selection.getRangeAt(0);

        var absoluteLeftPosition = range.startOffset;
        var absoluteRightPosition = range.endOffset;
        try {
            const idNumber = Number(selection.anchorNode.parentNode.id);
            
            if (!Number.isNaN(idNumber) && idNumber > 1) {
                for (var i = idNumber - 1; i >= 1; i--) {
                    if (document.getElementById(i) !== null) {
                        absoluteLeftPosition += document.getElementById(i).textContent.length;
                        absoluteRightPosition += document.getElementById(i).textContent.length;
                    } 
                }
            }

        } catch (err) { console.log(err.message) }

        if (absoluteLeftPosition === absoluteRightPosition && absoluteLeftPosition !== 0) {
            console.log("CLICK MODE");
            for (let i = 0; i < highlightStartIntervals.length; i++) {
                if (absoluteLeftPosition >= highlightStartIntervals[i] && absoluteLeftPosition <= highlightEndIntervals[i]) {          
                    console.log("CONTAINED");
                    setSelectionMetadata(selection);
                    setLeftInterval(highlightStartIntervals[i]);
                    setRightInterval(highlightEndIntervals[i] + 10);
                    setClickPosition(absoluteLeftPosition);
                    setIsCreated(true);
                    setSelectedComment(comments[i]);
                }
            }
        } else if (range.getBoundingClientRect().left !== 0 && range.getBoundingClientRect().top !== 0) {
            setSelectionMetadata(selection);
            setRightInterval(absoluteRightPosition);
            setLeftInterval(absoluteLeftPosition);
            setIsCreated(false);
            setSelectedComment('');
        }
    }

    const n = highlightStartIntervals.length;

    console.log("BEGIN : " + highlightStartIntervals);
    console.log("FINISH : " + highlightEndIntervals);
    console.log(comments);

    const parts = [];

    let currentIndex;

    if (n === 0) {
        console.log("RETURN FIRST");
        return(
            <div id="unique" onMouseUp={handleMouseUp}>
                <div>{text}</div>

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

    let i;

    var id = 1;

    var temp;

    if (highlightStartIntervals[0] !== 0) {
        temp = text.substring(0, highlightStartIntervals[0]);
        parts.push(<span id={id}>{temp}</span>);
        i = 0;
        currentIndex = highlightStartIntervals[0];
    } else {
        temp = text.substring(highlightStartIntervals[0], highlightEndIntervals[0] + 1)
        parts.push(<mark id={id}>{temp}</mark>);
        i = 1;
        currentIndex = highlightEndIntervals[0] + 1;
    }

    id++;

    for (i; i < n; i++) {
        temp = text.substring(currentIndex, highlightStartIntervals[i]);
        parts.push(<span id={id}>{temp}</span>);

        id++;

        temp = text.substring(highlightStartIntervals[i], highlightEndIntervals[i] + 1);
        parts.push(<mark id={id}>{temp}</mark>)
    
        id++

        currentIndex = highlightEndIntervals[i] + 1;
    }

    temp = text.substring(currentIndex);
    parts.push(<span id={id}>{temp}</span>);

    console.log("RETURN SECOND");
    return(
        <div id="unique" onMouseUp={handleMouseUp}>
            <div>
                {parts}
            </div>

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