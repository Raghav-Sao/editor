import { Button } from 'semantic-ui-react'
import { useEffect, useRef } from "react";
import './viewer.scss';
let count = 0;
let start = 0;
let current = null;
let processing = false;
export const Viewer = (props) => {
    const imagesRef = useRef();
    const images = props.images || [];
    const handleMouseDown = (e) => {
        start = e.clientX;
        current = e;
        document.addEventListener('mousemove', handleMouseMove)
        e.preventDefault()
        count++;
    }
    const handleMouseMove = (e) => {
        const newCord = e.clientX;
        const diff = start - newCord;
        // console.log(e.target, handleMouseDown, e.target.style.transform)
        
        // console.log(e.clientX)
       let deg = false && current.target.getAttribute('data') ? 10 : (73/500) * diff;
       debugger
       console.log(current.target.getAttribute('data'));
    //    if(diff > 100) {
    //     deg = 120
    //    }
        console.log(current.target.getBoundingClientRect().left);

        current.target.style.transform = `rotateY(-${deg*1}deg)`;
        current.target.setAttribute('data', "fliped");
        if( current.target.getBoundingClientRect().right < 500) {
        current.target.style.opacity = `0.5`

        } else {
            current.target.style.opacity = `1`
        }
        // current.target.style.transform = `rotateX(10deg) rotateY(-${deg*1}deg) rotateZ(0deg)`
        e.target.style.zIndex = count;
        if(diff>200) {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }
    const handleMouseUp = (e) => {
        if(processing) {
            return;
        }
        processing = true;
        setTimeout(() => processing = false, 800);
        // console.log(e.target, handleMouseDown, e.target.style.transform)
        document.removeEventListener('mousemove', handleMouseMove)
        count++;
        const isTurned = current.target.getAttribute('data-flip');
        const deg = isTurned === "yes" ? 10 : 170;
        console.log(isTurned, deg);
        current.target.style.transform = `rotateX(10deg) rotateY(-${deg}deg) rotateZ(0deg)`
        current.target.setAttribute('data-flip', isTurned === "yes" ? "no": "yes");
        // e.target.style.transform = `rotateY(-170deg)`
        current.target.style.zIndex = count;
        // console.log(e.target, handleMouseUp)
    }
    // console.log(imagesRef)
    useEffect(() => {
        imagesRef.current.addEventListener('mousedown', handleMouseDown);
        // imagesRef.current.addEventListener('mousemove', handleMouseMove);
        imagesRef.current.addEventListener('mouseup', handleMouseUp);

        return () => {
            imagesRef.current.removeEventListener('mousedown', handleMouseDown);
            // imagesRef.current.removeEventListener('mousemove', handleMouseMove);
            imagesRef.current.removeEventListener('mouseup', handleMouseUp);
        }
    }, [])
    return (
        <div className='Viewer'>
        <Button basic color='purple' className='prevButton'>
                Previous
            </Button>
        <div className="ImageViewer" ref={imagesRef} style={{position: 'relative', padding: "0px", perspective: '3000px'}}>
             
            {Object.keys(images).map((id, index) => {
                const item = images[id];
                const trans = index*3;
                // return <img src={item.src} style={{...item.style, transform: 'rotateY(0deg)', position: 'absolute', border: '1px solid', borderRight: '2px black white', width:"500px", transformOrigin: '0 0', transition: 'transform 0.5s ease-out'}} />
                return <img data-id={id} src={item.src} style={{...item.style, transform: 'rotateX(10deg) rotateY(0deg)  rotateZ(0deg)', position: 'absolute', border: '1px solid', borderRight: '2px black white', width:"100%", transformOrigin: '0 0', transition: 'transform 1s ease-out'}} />
            })}
             
        </div>
        <Button basic color='purple' className='nextButton'>
        Next
    </Button>
    </div>
    )
}

// border: 1px solid;
//     width: 500px;
//     position: absolute;
//     border: 1px solid;
//     width: 500px;
//     position: absolute;
//     position: absolute;
//     transform: rotateY(0deg);
//     transform: rotateY(-195deg);
//     transition: transform 0.9s ease-out;
//     /* perspective: 30000px; */
//     transform-origin: 0 0;
//     /* perspective-origin: bottom; */
//     opacity: 0.7;