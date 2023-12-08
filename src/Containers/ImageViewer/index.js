import { Viewer } from './Viewer';
import card1 from '../../../src/assests/images/gallary/1.avif';
import card3 from '../../../src/assests/images/gallary/2.avif';
import card4 from '../../../src/assests/images/gallary/3.avif';


const data = {1: {src: card1, id: 1}, 3: {src: card3, id: 3}, 4:{src: card4}, 5: {src: card1, id: 5}};
const ImageViewer = () => {
    return (
        <Viewer images={data} />
    )
}

export default ImageViewer;