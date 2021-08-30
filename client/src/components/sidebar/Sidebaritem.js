import React from 'react';
import './SideBar.css';

function SidebarItem({ menu }) {
    return (
        <div className="sidebar-item">
            <li>{menu.name}</li>
        </div>
    );
}

export default SidebarItem;
