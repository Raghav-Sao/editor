import imageStickers from 'assests/images/marriage-icons'
import cardImg from 'assests/images/card-bg.jpg'
export const cards = [
  {
    stickers: [
      {
        id: 123123,
        type: 'text',
        resource: 'Sample text 1',
        style: {
          position: {
            left: 10,
            top: 10,
          },
          scale: 1,
          rotation: {
            unit: 'deg',
            rotation: 0,
          },
          translate: {
            translateX: 0,
            translateY: 0,
          },
          color: '#FFF',
          fontSize: 35,
          height: 'auto',
          fontWeight: 'bold',
          textAlign: 'center',
          fontStyle: 'normal',
          boundingRect: {
            top: 110,
          },
        },
        labels: ['Sample text'],
        name: 'sample text',
      },
      {
        id: 123124,
        type: 'svg',
        resource: imageStickers[0].src,
        style: {
          position: {
            left: 10,
            top: 150,
          },
          scale: 1,
          rotation: {
            unit: 'deg',
            rotation: 0,
          },
          translate: {
            translateX: 0,
            translateY: 0,
          },
          color: '#FFF',
          width: 150,
          height: 'auto',
          fontWeight: 'bold',
          boundingRect: { top: 250 },
        },
        labels: ['God Svg'],
        name: 'Lord-Ganesh7',
      },
    ],
    placeholder: [
      {
        styles: {
          border: {
            color: '#000',
            width: 350,
            boundary: 'solid',
          },
          background: {
            bgType: 'color',
            value: '#CCC',
          },
          position: {
            left: 10,
            top: 10,
          },
          scale: 1,
          rotation: {
            unit: 'deg',
            rotation: 0,
          },
          color: '#FFF',
          fontSize: '15px',
          width: 350,
          height: 'auto',
          fontWeight: 'bold',
        },
        labels: ['name', 'first'],
        name: 'name',
      },
    ],
    background: {
      type: 'image',
      value: cardImg,
      style: { height: 'auto' },
    },
  },
]
