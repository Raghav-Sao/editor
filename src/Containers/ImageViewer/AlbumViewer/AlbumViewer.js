import _get from 'lodash/get';
import AlbumPage from './AlbumPage';
import './AlbumViewer.scss';

let count = 0;
let processing = false;
export const AlbumViewer = (props) => {
    const pages = _get(props, 'pages', {});
    const pageKeys = Object.keys(pages);
    const handleAlbumPageClick = (current) => {
        console.log(current.target)
        if(!current.target.getAttribute('data-id')) {
            return;
        };
        
        if(processing) {
            return;
        }
        processing = true;
        setTimeout(() => processing = false, 700);
        count++;
        const isTurned = current.target.getAttribute('data-flip') === "yes";
        if(isTurned) {
            setTimeout(() => current.target.style.opacity = `1`, 300)
        }
        else {
            setTimeout(() => current.target.style.opacity = `0.5`, 350)
        }
        
        const deg = isTurned ? 10 : 170;
        current.target.style.transform = `rotateX(20deg) rotateY(-${deg}deg) rotateZ(0deg) translateY(0%)`
        current.target.setAttribute('data-flip', isTurned ? "no": "yes");
        current.target.style.zIndex = count;
    }
        return (
            <div className="AlbumViewer" onClick={handleAlbumPageClick}>
                {pageKeys.map(pageKey=> {
                    return <AlbumPage page={pages[pageKey]}/>
                })}
            </div>
    )
}