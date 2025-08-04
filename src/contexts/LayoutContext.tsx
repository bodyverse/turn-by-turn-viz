import { createContext, useContext, useEffect, useState } from 'react';

type Orientation = 'portrait' | 'landscape';

const LayoutContext = createContext<Orientation>('portrait');

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [orientation, setOrientation] = useState<Orientation>(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    );

    useEffect(() => {
        const handleResize = () => {
            setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <LayoutContext.Provider value={orientation}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useOrientation = () => useContext(LayoutContext);
