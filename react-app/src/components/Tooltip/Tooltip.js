import React, { useState } from "react";
import "./Tooltip.css"

export const Tooltip = ({text, children}) => {

    const [visible, setVisible] = useState(false)
    return(
        <div className="tooltiop-container"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <div className="tooltip">{text}</div>}
        </div>
    )
}
