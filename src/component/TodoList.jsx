import React from "react";
import "./todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TodoList(props) {
  const {
    item,
    onCheck,
    setUpdate,
    deleteItem,
    valueDisplay,
    clearItem,
    Total,
  } = props;

  const listItem = item.map((i) => {
    const isChecked = {
      textDecoration: i.isCompleted ? "line-through" : "none",
    };
    return (
      <div className="list" key={i.key}>
        <input
          className="chkbox"
          type="checkbox"
          checked={i.isCompleted}
          onChange={() => onCheck(i.key)}
        ></input>
        <input
          className="inputText"
          type="text"
          style={isChecked}
          key={i.key}
          value={i.value.trim(1)}
          onChange={(e) => {
            setUpdate(e.target.value, i.key);
          }}
        />

        <span>
          <FontAwesomeIcon
            className="faicon"
            icon="trash"
            onClick={() => deleteItem(i.key)}
          />
        </span>
      </div>
    );
  });
  return (
    <div>
      <div className="maindiv">{listItem}</div>
      <div className="itemAndButton">
        <h1 className="totalItem">Total Active Item:{Total.length}</h1>
        <button
          className="allbutton"
          onClick={() => {
            valueDisplay("All");
          }}
        >
          All
        </button>
        <button
          className="allbutton"
          onClick={() => {
            valueDisplay("Active");
          }}
        >
          Active
        </button>
        <button
          className="allbutton"
          onClick={() => {
            valueDisplay("Completed");
          }}
        >
          Completed
        </button>
        <button
          className="allbutton"
          onClick={() => {
            clearItem();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default TodoList;
