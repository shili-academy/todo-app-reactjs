import React from 'react'
import { useState } from 'react';

const TodoItem = (props) => {
  const [done, setDone] = useState(false);

  return (
    <div onClick={() => setDone((prevState) => !prevState)} style={{
      ...(done && {color: 'red'})
    }}>This is a todo item</div>
  )
}

export default TodoItem
 