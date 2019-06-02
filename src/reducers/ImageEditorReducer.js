const initialState = {
    activeSticker: {},
    card: [
        {
            backgroundImage:
                'https://images-na.ssl-images-amazon.com/images/I/A1zCDGS7n-L._SY879_.jpg',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 0,
            stickers: [],
            type: 'page',
        },
        {
            backgroundImage:
                'http://www.designprint.in/webfile/files/Wedding-Cards-Design-&-Print/Big/JPG/wedding-cards-design.gif',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 1,
            stickers: [],
            type: 'page',
        },
        {
            backgroundImage:
                'http://www.designprint.in/webfile/files/Wedding-Cards-Design-&-Print/Big/JPG/wedding-cards-design.gif',
            backgroundImageStyle: {},
            isBackgroundImageSelected: false,
            pageNo: 3,
            stickers: [],
            type: 'page',
        },
    ],
}
export default function reducer(state = initialState, { payload, type }) {
    switch (type) {
       

        default:
            return state
    }
}
