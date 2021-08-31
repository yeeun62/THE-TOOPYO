import React from 'react';
// import styled, { css } from 'styled-components';
// import './SideBar.css';

// const itemStyle = styled.SidebarItem`
//     font-size: 22px;
// `;

function SidebarItem({ menu }) {
    return (
        <div className="sidebar-item">
            <li>{menu.name}</li>
        </div>
    );
}

export default SidebarItem;
