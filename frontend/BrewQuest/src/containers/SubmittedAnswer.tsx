import { useState } from "react";
import { useEffect } from "react";
import {useSpring, animated} from "react-spring";

const SubmittedAnswer = ({submittedAnswer, onDelete}) =>{

    let startX, endX;
    const tolerance=80;

    const handleTouchStart = (e)=>{
        startX=e.touches[0].clientX;
        console.log(startX);
    }

    const handleTouchMove = (e)=>{
        //update endX for final offset
        endX=e.touches[0].clientX;
        
    }

    const handleTouchEnd = (e)=>{

        //detect swipe direction
        if (startX < endX-tolerance){
            console.log("Swiped right");
        } else if (startX > endX+tolerance){
            console.log("Swiped left");
        }

        // remove element from list
        if (startX < endX - tolerance || startX > endX + tolerance){
            //send marking request (right or left)
            console.log("Swiped left or right funciton")

            console.log("Remove element from list")
            //delete answer element from list
            onDelete(submittedAnswer);
        }
    }

    return (
        // unique id in entire project to be fetched by js for event listening
        <div className="submitted-answer" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>{submittedAnswer.contents}</div>
    );
}

export default SubmittedAnswer