import React, { useCallback, useEffect, useState } from 'react';

export default function useDeviceDetect() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            // Misalnya, kita anggap lebar kurang dari 768px sebagai mobile
            setIsMobile(window.innerWidth < 990);
        };

        // Panggil fungsi saat komponen dimuat
        handleResize();

        // Tambahkan event listener untuk resize window
        window.addEventListener("resize", handleResize);

        // Cleanup listener saat komponen unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        isMobile,
        isDesktop: !isMobile
    };
}