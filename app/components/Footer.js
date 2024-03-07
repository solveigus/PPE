import { useDarkMode } from './DarkModeContext';

//The footer will always be at the end of the page
export default function Footer() {
  //adapting the component to the darkMode
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <footer style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <p className={` italic ${isDarkMode ? 'text-white' : 'text-black'}`}>&copy;  Webtech app</p>
    </footer>
  )
}
