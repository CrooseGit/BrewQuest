import { useState } from "react";
import { useEffect } from "react";

const SubmittedAnswer = (props) =>{

    // submitted answer object
    const submittedAnswer = props.submittedAnswer;
    //global answer element variable
    let answer_element;

    let startX, currentX, currentTrnslt, animationID, dragging;

    const handleTouchStart = (e) =>{
        console.log("Touch start");

        dragging=true;


        // start animation
        animationID=window.requestAnimationFrame(handleTouchMove);
    }

    const handleTouchMove = (e) =>{
        // animate if dragging
        if (dragging){
            console.log("Touch Move");
            window.requestAnimationFrame(handleTouchMove);
        }

    }

    const handleTouchEnd = (e) =>{
        console.log("Touch End");

        dragging=false;

        // end animation
        cancelAnimationFrame(animationID);
    }

    // useEffect to get element by id only after element has been generated
    useEffect(() => {
        answer_element=document.getElementById("answer-element-"+submittedAnswer.id);

        answer_element.addEventListener("touchstart",(e)=>e.preventDefault()); // prevent browser dragging when in box
        answer_element.addEventListener("touchstart",handleTouchStart);
        answer_element.addEventListener("touchmove",handleTouchMove);
        answer_element.addEventListener("touchend",handleTouchEnd);

    }, []);

    return (
        // unique id in entire project to be fetched by js for event listening
        <div key={submittedAnswer.id} className="submitted-answer" id={"answer-element-"+submittedAnswer.id}>{submittedAnswer.contents}</div>
    );
}

export default SubmittedAnswer