import add from './add';
import allah from './allah';
import bookmark from './bookmark';
import call from './call';
import check from './check';
import circle from './circle';
import circleCheck from './circleCheck';
import cart from './cart';
import email from './email';
import eye from './eye';
import flag from './flag';
import ganesh from './ganesh';
import heart from './heart';
import home from './home';
import image from './image';
import laptop from './laptop';
import location from './location';
import lock from './lock';
import moon from './moon';
import pen from './pen';
import pin from './pin';
import print from './print';
import remove from './remove';
import send from './send';
import speakers from './speakers';
import tablet from './tablet';
import sikh from './sikh';
import ring from './ring';
import user from './user';
import window from './window';

const data = [add, bookmark, call, check, circle, circleCheck, cart, email, eye, flag, heart, home, image, laptop, location, lock, moon, pen, pin, print, remove, send, speakers, tablet, ring, user, window]
export default data.map((item, index) => (
    {
        id: `sticker_${index + 1}`,
        resource: item.data,
        type: 'svg',
    }
))
// export default [
//     {
//         id: 1,
//         resource: allah.data,
//         type: 'svg',
//     },
//     {
//         id: 2,
//         resource: ganesh.data,
//         type: 'svg',
//     },
//     {
//         id: 3,
//         resource: sikh.data,
//         type: 'svg',
//     },
//     {
//         id: 4,
//         resource: ring.data,
//         type: 'svg',
//     },
//     {
//         id: 5,
//         resource: window.data,
//         type: 'svg',
//     },
//     {
//         id: 6,
//         resource: eye.data,
//         type: 'svg',
//     },
//     {
//         id: 7,
//         resource: flag.data,
//         type: 'svg',
//     },
// ];

/* const images = require.context('assests/images/marriage-icons/', true);
const imageList = images.keys().filter(a => { return typeof a === 'string' || a.includes('/ganesh7')}).map((image, index) => {
    const svg = `...`;
    const blob = new Blob([images(image)], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    debugger
    return {
        id: index,
        resource: ganesh.data,
        link: images(image),
        url: url,
        blob: blob,
        type: 'svg',    
    }
});
console.log(imageList, "img")
<object  data={link} >
    Logo
</object>
*/