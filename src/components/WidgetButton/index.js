import React from 'react'

import './style.css'

export default ({
  onClick,
}) => (
  <div className="drift-widget-button" onClick={onClick}>
    <span role="img" aria-label="chat bubble">💬</span>
  </div>
)
