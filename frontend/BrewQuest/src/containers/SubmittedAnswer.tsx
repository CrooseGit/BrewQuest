import { useState } from "react";
import { useEffect } from "react";

const SubmittedAnswer = (props) =>{

    // submitted answer object
    const submittedAnswer = props.submittedAnswer;

    let isDragging=false,
    startPos=0,
    currentTranslate=0,
    prevTranslate=0,
    animationId=0;

    // animate frame by frame
    const animation =()=>{
        const answer_element=document.getElementById("answer-element-"+submittedAnswer.id);
        answer_element.style.transform=`translateX(${currentTranslate}px)`;

        // recursively animate
        if (isDragging) requestAnimationFrame(animation);
    }

    const handleTouchStart = (e) =>{
        console.log("Touch start");

        isDragging=true;
        startPos=e.touches[0].clientX;

        // animation is a function that returns animation frame
        animationId=requestAnimationFrame(animation);
    }

    const handleTouchMove = (e) =>{
        if (isDragging){
            const currentPos=e.touches[0].clientX;
            currentTranslate=prevTranslate+currentPos-startPos;

            console.log("Touch Move");
        }
    }

    const handleTouchEnd = (e) =>{
        console.log("Touch End");

        isDragging=false;
        // end animation
        cancelAnimationFrame(animationId);
        // check if swipe past tolerance
        const currentPos=e.changedTouches[0].screenX;
        // swipe more than 150px
        if (currentPos-150>startPos){
            console.log("Marked question");
        }
    }

    // useEffect to get element by id only after element has been generated
    useEffect(() => {
        const answer_element=document.getElementById("answer-element-"+submittedAnswer.id);

        // prevent browser dragging when in box
        answer_element.addEventListener("touchstart",(e)=>e.preventDefault());
        answer_element.addEventListener("touchstart",handleTouchStart);
        answer_element.addEventListener("touchmove",handleTouchMove);
        answer_element.addEventListener("touchend",handleTouchEnd);
    }, []);


    return (
        // unique id in entire project
        <div key={submittedAnswer.id} className="submitted-answer" id={"answer-element-"+submittedAnswer.id}>{submittedAnswer.contents}</div>
    );
}

export default SubmittedAnswer