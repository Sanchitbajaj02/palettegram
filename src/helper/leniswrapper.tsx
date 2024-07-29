// src/components/LenisWrapper.tsx
'use client';

import React, { ReactNode } from 'react';
import useLenis from './useLenis';


interface LenisWrapperProps {
  children: ReactNode;
}

const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  useLenis();

  return <>{children}</>;
};

export default LenisWrapper;
