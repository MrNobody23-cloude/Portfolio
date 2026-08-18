import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import BootScreen from './components/boot/BootScreen';
import Desktop from './components/desktop/Desktop';

function MainOSContent() {
  const { isBooting, completeBoot } = useOS();

  if (isBooting) {
    return <BootScreen onComplete={completeBoot} />;
  }

  return <Desktop />;
}

export default function App() {
  return (
    <OSProvider>
      <MainOSContent />
    </OSProvider>
  );
}