import React from "react";
import Item from "./Item";

const List = (props) => {
  const { todos, handleUpdate, handleDelete, handleDone } = props;
  return (
    <ul>
      {todos.map((todo) => (
        <Item
          key={todo.id}
          {...todo}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleDone={handleDone}
        />
      ))}
    </ul>
  );
};

export default List;
