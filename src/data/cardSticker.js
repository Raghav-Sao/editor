import imageStickers from 'assests/images/marriage-icons'
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
            unit: 'rad',
            rotation: 0,
          },
          translate: {
            translateX: 0,
            translateY: 0,
          },
          color: '#FFF',
          fontSize: 25,
          width: 250,
          height: 'auto',
          fontWeight: 'bold',
          textAlign: 'center',
          fontStyle: 'normal',
        },
        labels: ['Sample text'],
        name: 'sample text',
      },
      {
        type: 'svg',
        resource: imageStickers[0].src,
        style: {
          position: {
            left: 10,
            top: 150,
          },
          scale: 1,
          rotation: {
            unit: 'rad',
            rotation: 0,
          },
          translate: {
            translateX: 0,
            translateY: 0,
          },
          fill: '#FFF',
          width: 150,
          height: 'auto',
          fontWeight: 'bold',
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
            unit: 'rad',
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
      value: 'https://images-na.ssl-images-amazon.com/images/I/A1zCDGS7n-L._SY879_.jpg',
      style: {},
    },
  },
]
