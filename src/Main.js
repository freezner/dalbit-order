import React from 'react';
import MenuItem from './components/MenuItem';
import logo from './moonlgalu_logo.png';
import main from './scss/main.module.scss';

function Main() {
  const styleWrapper = {
    "width": "100vw",
  }

  return (
    <div style={styleWrapper} id="wrapper">
      <header className={main.header}>
        <img src={logo} alt="" />
      </header>
      <div>
          <MenuItem />
      </div>
    </div>
  );
}

export default Main;
