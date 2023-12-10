import { AlbumViewer } from './AlbumViewer/AlbumViewer';
import card1 from '../../../src/assests/images/gallary/1.avif';
import card3 from '../../../src/assests/images/gallary/2.avif';
import card4 from '../../../src/assests/images/gallary/3.avif';
import './AlbumExp.scss';

const pages = {1: {src: card1, id: 1}, 3: {src: card3, id: 3}, 4:{src: card4, id: 4}, 5: {src: card1, id: 5}};
const ImageViewer = () => {
    return (
        <div className='TempContainr'>
            <div className='right'>
                <AlbumViewer pages={pages} />
            </div>
        </div>
        
    )
}

export default ImageViewer;