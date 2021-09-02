import React from 'react';

function SidebarItem({ menu }) {
    return (
        <div className="sidebar-item">
            <li>{menu.name}</li>
        </div>
    );
}

export default SidebarItem;
