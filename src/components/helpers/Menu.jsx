import React, { useState, useEffect, useRef } from 'react';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (toggleRef.current !== null && !toggleRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isOpen]);

  return (
    <li className="relative group" ref={toggleRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center">
        Profile
        <svg className="h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 6a2 2 0 100-4 2 2 0 000 4zm3 2a3 3 0 11-6 0 3 3 0 016 0zm-1 2a6 6 0 00-5 2.92V11a1 1 0 011-1h4a1 1 0 011 1v.92A6 6 0 0012 10z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-48 py-2 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <li><a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a></li>
          <li><a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a></li>
          <li><a href="#signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a></li>
        </ul>
      )}
    </li>
  );
};

export default ProfileMenu;