import { useRef } from 'react';
import Link from 'next/link';
import useSession from './hooks/useSession.js';

export default function Navbar() {
  const checked = useRef();

  const { getItem, setItem, removeItem } = useSession();

  let theme = {
    font: '',
    bg: '',
  };

  const setTheme = () => {
    document.documentElement.style.setProperty('--font', getItem('font'));
    document.documentElement.style.setProperty('--bg', getItem('bg'));
  };
  if (getItem('bg')) {
    setTheme();
  }

  const changeTheme = () => {
    const font = getComputedStyle(document.documentElement).getPropertyValue(
      '--font'
    );
    const bg = getComputedStyle(document.documentElement).getPropertyValue(
      '--bg'
    );
    theme = {
      font: bg.trim(),
      bg: font.trim(),
    };
    //Session Storage
    setItem('font', theme.font);
    setItem('bg', theme.bg);

    document.documentElement.style.setProperty('--bg', font);
    document.documentElement.style.setProperty('--font', bg);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container nav-container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li>
              <Link href="/Patients">
                <a>Patients</a>
              </Link>
            </li>
            <li>
              <Link href="/Doctors">
                <a>Doctors</a>
              </Link>
            </li>
            <li>
              <Link href="/Reports">
                <a>Reports</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/Register">
                <a>Register</a>
              </Link>
            </li> */}
          </ul>
          <h1 className="logo">
            <Link href="/">
              <a>Re-Chain</a>
            </Link>
          </h1>
        </div>
      </nav>

      <div className="emptyBlock"></div>
    </>
  );
}

// <li>
//   {/* <a alt="Change Theme" onClick={() => changeTheme()}>
//   Theme
// </a> */}
//   <div>
//     <input
//       ref={checked}
//       type="checkbox"
//       className="checkbox"
//       id="checkbox"
//       onClick={() => changeTheme()}
//     />
//     <label htmlFor="checkbox" className="label">
//       <i className="fas fa-sun"></i>
//       <i className="fas fa-moon"></i>
//       <div className="ball"></div>
//     </label>
//   </div>
// </li>
