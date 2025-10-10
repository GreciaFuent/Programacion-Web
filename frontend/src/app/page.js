'use client';

import { useState } from 'react';
import HideTab from '../components/HideTab';
import RevealTab from '../components/RevealTab';
import './page.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('hide');

  return (
    <div className="home-container">
      <div className="left-section">
        <h1>Secret Link App</h1>
        <p>Protect and share your information securely.</p>
      </div>

      <div className="right-section">
        <div className="card">
          <h2>{activeTab === 'hide' ? 'Hide a Secret' : 'Reveal a Secret'}</h2>

          <div className="tab-buttons">
            <button
              className={activeTab === 'hide' ? 'active' : ''}
              onClick={() => setActiveTab('hide')}
            >
              Hide
            </button>
            <button
              className={activeTab === 'reveal' ? 'active' : ''}
              onClick={() => setActiveTab('reveal')}
            >
              Reveal
            </button>
          </div>

          {activeTab === 'hide' ? <HideTab /> : <RevealTab />}

          <p className="credit">Created by Grecia Fuentes</p>
        </div>
      </div>
    </div>
  );
}
