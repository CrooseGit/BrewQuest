import { useState } from "react";
import { useEffect } from "react";

const SubmittedAnswer = ({submittedAnswer, handleDelete, roundNum, questionNum}) =>{

    let answerElement, backgroundColor;
    let startX=0, offsetX=0, isDragging=false, animationID=0;
    const tolerance=80;

    // html element animation
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

    const getPositionX = (e) => {
        if (e.type.includes("mouse")){
            return e.pageX;
        } else {
            return e.touches[0].clientX;
        }
    }

    const handleTouchStart = (e)=>{
        // prevent default browser scroll and refresh behavior
        e.preventDefault();

        startX=getPositionX(e);
        offsetX=0;
        isDragging=true;

        // call function for first time
        animationID=requestAnimationFrame(animation);
    }

    const handleTouchMove = (e)=>{
        //update endX for final offset
        if (isDragging){
            offsetX=getPositionX(e)-startX;
            if (offsetX > 0 && offsetX > tolerance){
                answerElement.style.backgroundColor = "#49ab2e";
            } else if (offsetX < 0 && -offsetX > tolerance){
                answerElement.style.backgroundColor = "#bb1818";
            } else {
                answerElement.style.backgroundColor = backgroundColor;
            }
        }
        
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
            handleDelete(submittedAnswer);
        }

        // cancel animation (after this animation will rerun one last time)
        cancelAnimationFrame(animationID);

    }

    // add event listeners after DOM first loads
    // runs twice
    useEffect(()=>{

        answerElement=document.getElementById(`sd-${roundNum}-${questionNum}-${submittedAnswer.id}`);
        backgroundColor=answerElement?.style.backgroundColor;

        answerElement?.addEventListener("touchstart",handleTouchStart);
        answerElement?.addEventListener("touchmove",handleTouchMove);
        answerElement?.addEventListener("touchend",handleTouchEnd);
        answerElement?.addEventListener("mousedown",handleTouchStart);
        answerElement?.addEventListener("mousemove",handleTouchMove);
        answerElement?.addEventListener("mouseup",handleTouchEnd);
        answerElement?.addEventListener("mouseleave",handleTouchEnd);
    },[]);

    return (
        // unique id in entire dom to be fetched by js for event listening
        <div className="submitted-answer" id={`sd-${roundNum}-${questionNum}-${submittedAnswer.id}`}>{submittedAnswer.contents}</div>
    );
}

export default SubmittedAnswer