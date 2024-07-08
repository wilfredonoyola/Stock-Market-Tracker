import React, { ReactNode } from 'react';
import styles from './styles.module.css';

export interface TopBarProps {
  children: ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto bg-slate-800 shadow-md z-50">
      <div
        className={`flex py-1 px-2 space-x-1 relative ${styles["scroll-container"]}`}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-400">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};


export default TopBar;
