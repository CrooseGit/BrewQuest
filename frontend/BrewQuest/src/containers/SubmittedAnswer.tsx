import { useState } from "react";
import { useEffect } from "react";

const SubmittedAnswer = ({submittedAnswer, onDelete, roundNum, questionNum}) =>{

    let answerElement;
    let startX=0, offsetX=0, isDragging=false, animationID=0;
    const tolerance=80;

    const animation = () =>{
        if (isDragging){
            answerElement.style.transform=`translateX(${offsetX}px)`;
            // recursive function, request only when dragging
            requestAnimationFrame(animation);
        } else {
            // reset to 0 when animation frame is requested one last time
            answerElement.style.transform=`translateX(0px)`;
        }
    }

    const handleTouchStart = (e)=>{
        startX=e.touches[0].clientX;
        offsetX=0;
        isDragging=true;

        // call function for first time
        animationID=requestAnimationFrame(animation);
    }

    const handleTouchMove = (e)=>{
        //update endX for final offset
        offsetX=e.touches[0].clientX-startX;
    }

    const handleTouchEnd = ()=>{
        isDragging=false;

        //detect swipe direction
        if (offsetX > 0 && offsetX > tolerance){
            console.log("Swiped right");
        } else if (offsetX < 0 && -offsetX > tolerance){
            console.log("Swiped left");
        }

        // remove element from list
        if (offsetX > 0 && offsetX > tolerance || offsetX < 0 && -offsetX > tolerance){
            //delete answer element from list using function prop
            onDelete(submittedAnswer);
        }

        // cancel animation (after this animation will rerun one last time)
        cancelAnimationFrame(animationID);

    }

    useEffect(()=>{
        answerElement=document.getElementById(`sd-${roundNum}-${questionNum}-${submittedAnswer.id}`);

        answerElement?.addEventListener("touchstart",(e)=>e.preventDefault());
        answerElement?.addEventListener("touchstart",handleTouchStart);
        answerElement?.addEventListener("touchmove",handleTouchMove);
        answerElement?.addEventListener("touchend",handleTouchEnd);
    },[]);

    return (
        // unique id in entire dom to be fetched by js for event listening
        <div className="submitted-answer" id={`sd-${roundNum}-${questionNum}-${submittedAnswer.id}`}>{submittedAnswer.contents}</div>
    );
}

export default SubmittedAnswer