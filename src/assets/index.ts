export const styleScroll = {
    '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },

    '&::-webkit-scrollbar-thumb:focus': {
        background: '#555',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
    '&:hover': {
        scrollbarColor: '#555 #f1f1f1',
    }
}