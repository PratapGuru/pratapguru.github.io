import { createContext, useContext } from 'react';

/** True once the loading screen has finished, so the hero can play its entrance. */
export const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);
