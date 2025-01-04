import React from 'react';

const Footer = ({ children, numberActiveSwiper, countAllSwiper, isFixed = true }: Readonly<{
    children?: React.ReactNode;
    numberActiveSwiper?: number | string;
    countAllSwiper?: number | string;
    isFixed?: boolean;
}>) => {
    return (
        <footer
            className='flex flex-row justify-between'
            style={{
                position: isFixed ? 'fixed' : 'relative',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.5rem',
                margin: '0.6rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <p className='text-sm'>Made with ❤️<br/>by{' '} Amed Group</p>
                <p>{numberActiveSwiper ?? '-'} / {countAllSwiper ?? '-'}</p>
            </div>
            {children}
            <div>
                <p>Popular Items</p>
            </div>
        </footer>
    );
};

export default Footer;