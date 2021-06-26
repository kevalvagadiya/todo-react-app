import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoList from "./TodoList";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
library.add(faTrash);
function Todo() {
  const [state, setState] = useState({
    item: [],
    currentItem: {
      value: "",
      key: "",
    },
    isDispaly: "All",
    allCheck: false,
  });

  const getData = () => {
    axios("https://todo-node-api-application.herokuapp.com/get-task").then((res) =>
      setState({
        ...state,
        item: res.data.data,
        currentItem: {
          value: "",
          key: "",
        },
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const addButton = async (e) => {
    e.preventDefault();
    const newItem = state.currentItem;
    if (newItem.value !== "") {
      const newitem = [...state.item, newItem];
      setState({
        ...state,
        item: newitem,
        currentItem: {
          value: "",
          key: "",
        },
      });
      const data = {
        value: newItem.value,
        key: newItem.key,
        isCompleted: newItem.isCompleted,
      };
      await axios
        .post("https://todo-node-api-application.herokuapp.com/add-task", data)
        .then((res) => {})
        .catch((err) => {});
      await getData();
    }
  };
  const handleInput = (e) => {
    setState({
      ...state,
      currentItem: {
        value: e.target.value,
        key: Date.now(),
        isCompleted: false,
      },
    });
  };

  const deleteItem = async (key) => {
    const filtterItem = state.item.filter((item) => item.key !== key);
    setState({ ...state, item: filtterItem });
    await axios
      .delete(`https://todo-node-api-application.herokuapp.com/delete-task/${key}`)
      .then((res) => {})
      .catch((err) => {});
  };
  const setUpdate = async (text, key) => {
    const item = state.item;
    let isCompleted;
    item.map((item) => {
      if (item.key === key) {
        isCompleted = item.isCompleted;
        return (item.value = text);
      }
    });
    setState({ ...state, item: item });

    const data = {
      value: text,
      key: key,
      isCompleted: isCompleted,
    };

    await axios
      .put("https://todo-node-api-application.herokuapp.com/update-task", data)
      .then((res) => {})
      .catch((err) => {});
  };

  const onCheck = async (key) => {
    const item = state.item;
    let isCompleted;
    let text;
    item.map((item) => {
      if (item.key === key) {
        text = item.value;
        if (item.isCompleted === true) {
          isCompleted = false;
          return (item.isCompleted = false);
        } else {
          isCompleted = true;
          return (item.isCompleted = true);
        }
      }
    });
    setState({ ...state, item: item });
    const data = {
      value: text,
      key: key,
      isCompleted: isCompleted,
    };

    await axios
      .put("https://todo-node-api-application.herokuapp.com/update-task", data)
      .then((res) => {})
      .catch((err) => {});
  };

  const valueDisplay = (e) => {
    setState({ ...state, isDispaly: e });
  };
  const clearItem = async () => {
    const filtterItem = state.item.filter((item) => !item.isCompleted);
    const clearItems = state.item.filter((item) => item.isCompleted);
    setState({ ...state, item: filtterItem });

    await axios
      .post("https://todo-node-api-application.herokuapp.com/clear-selected-task", clearItems)
      .then((res) => {})
      .catch((err) => {});
  };
  const onAllCheck = (e) => {
    let checked = e.target.checked;
    const item = state.item;
    item.map((item) => {
      item.isCompleted = checked;
    });
    setState({ ...state, item: item, allCheck: checked });
  };

  let array = [];
  if (state.isDispaly === "All") {
    array = state.item;
  } else if (state.isDispaly === "Active") {
    array = state.item.filter((item) => !item.isCompleted);
  } else if (state.isDispaly === "Completed") {
    array = state.item.filter((item) => item.isCompleted);
  }
  let Total = [];
  Total =
    state.item &&
    state.item.length > 0 &&
    state.item.filter((item) => !item.isCompleted);
  return (
    <div>
      <div className="to-do-list">
        <header>
          <form id="to-do-form" onSubmit={addButton}>
            <input
              className="allcheckbox"
              type="checkbox"
              checked={state.allCheck}
              onChange={onAllCheck}
            ></input>
            <input
              className="txtbox"
              type="text"
              placeholder="Enter Item"
              onChange={handleInput}
              value={state.currentItem.value}
            ></input>
            <button type="submit">Add</button>
          </form>
        </header>
        <TodoList
          item={array && array}
          deleteItem={deleteItem}
          setUpdate={setUpdate}
          onCheck={onCheck}
          valueDisplay={valueDisplay}
          clearItem={clearItem}
          Total={Total}
        />
      </div>
    </div>
  );
}

export default Todo;
