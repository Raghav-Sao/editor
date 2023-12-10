import _get from 'lodash/get';
import './AlbumPage.scss';

const defaultParams = {
    width: "100%",
}
const AlbumPage = (props) => {
    const src = _get(props, 'page.src', '');
    const width = _get(props, 'page.width', defaultParams.width);
    const dataId = _get(props, 'page.id');
    return (
        <img className="AlbumPage" data-id={dataId} src={src} width="100%" height="auto" />
    )
}

export default AlbumPage;