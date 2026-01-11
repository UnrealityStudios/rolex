import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type LumeContextType = {
    isLumeActive: boolean;
    toggleLume: () => void;
};

const LumeContext = createContext<LumeContextType | undefined>(undefined);

export function LumeProvider({ children }: { children: ReactNode }) {
    const [isLumeActive, setIsLumeActive] = useState<boolean>(false);

    const toggleLume = () => {
        setIsLumeActive(prev => !prev);
    };

    useEffect(() => {
        const className = 'lume-mode';

        if (isLumeActive) {
            document.body.classList.add(className);
        } else {
            document.body.classList.remove(className);
        }

        return () => {
            document.body.classList.remove(className);
        };
    }, [isLumeActive]);

    return (
        <LumeContext.Provider value={{ isLumeActive, toggleLume }}>
            {children}
        </LumeContext.Provider>
    );
}

export function useLume(): LumeContextType {
    const context = useContext(LumeContext);

    if (!context) {
        throw new Error('useLume must be used within a LumeProvider');
    }

    return context;
}
