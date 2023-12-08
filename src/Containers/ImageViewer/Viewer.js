import { Button } from 'semantic-ui-react'
import { useRef } from "react";
import './viewer.scss';
let count = 0;
let processing = false;
export const Viewer = (props) => {
    const imagesRef = useRef();
    const images = props.images || [];
    const handleImageClick = (current) => {
        if(processing) {
            return;
        }
        processing = true;
        setTimeout(() => processing = false, 700);
        count++;
        const isTurned = current.target.getAttribute('data-flip');
        if(isTurned) {
            setTimeout(() => current.target.style.opacity = `1`, 300)
        }
        else {
            setTimeout(() => current.target.style.opacity = `0.5`, 350)
        }
        
        const deg = isTurned === "yes" ? 10 : 170;
        current.target.style.transform = `rotateX(10deg) rotateY(-${deg}deg) rotateZ(0deg)`
        current.target.setAttribute('data-flip', isTurned === "yes" ? "no": "yes");
        current.target.style.zIndex = count;
    }
   
    return (
        <div className='Viewer'>
        {/* <Button basic color='purple' className='prevButton'>
            Previous
        </Button> */}
        <div onClick={handleImageClick} className="ImageViewer" ref={imagesRef} style={{position: 'relative', padding: "0px", perspective: '3000px', minHeight: "300px"}}>
            {Object.keys(images).map((id, index) => {
                const item = images[id];
                const trans = index*3;
                // return <img src={item.src} style={{...item.style, transform: 'rotateY(0deg)', position: 'absolute', border: '1px solid', borderRight: '2px black white', width:"500px", transformOrigin: '0 0', transition: 'transform 0.5s ease-out'}} />
                return <img data-id={id} class={`img-${id}`} src={item.src} style={{...item.style, transform: 'rotateX(10deg) rotateY(0deg)  rotateZ(0deg)', position: 'absolute', border: '1px solid', borderRight: '2px black white', width:"100%", transformOrigin: '0 0', transition: 'transform 1s ease-out'}} />
            })}
             <span className='ripple'></span>
        </div>
        {/* <Button basic color='purple' className='nextButton'>
        Next
    </Button> */}
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