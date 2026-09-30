import React, { createContext, use, type ReactNode } from 'react';

// 1. Define the interface for the context value
interface AboutContextType {
    about: string;
}

// 2. Initialize the context with the type (or null if there is no default value)
const AboutContext = createContext<AboutContextType | null>(null);

// 3. Define props for the provider, ensuring children uses ReactNode
interface AboutProviderProps {
    children: ReactNode;
}

export const AboutProvider = ({ children }: AboutProviderProps) => {
    const about = "Hello My friend";

    return (
        <AboutContext value={{ about }}>
            {children}
        </AboutContext>
    );
};

// 4. Create the custom hook with a type guard to handle potential null values safely
export const useAbout = (): AboutContextType => {
    const context = use(AboutContext);
    if (!context) {
        throw new Error('useAbout must be used within an AboutProvider');
    }
    return context;
};
