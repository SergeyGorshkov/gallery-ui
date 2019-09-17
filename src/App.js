import React from 'react';
import './App.css';

import GalleryComponent from './components/gallery/gallery.component';

function App() {
  return (
    <div className="App">
      <div className='headline'>Top commented.</div>
      <GalleryComponent />
    </div>
  );
}

export default App;
