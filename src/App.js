import { React, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import { Column } from "./Column";
import { initialData } from "./initial-data";

export const App = () => {
  const [taskData, setTaskData] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "orange";
  };

  //DIDNT WORK plus don't really understand or need this
  // const onDragUpdate = (update) => {
  //     const { destination } = onDragUpdate
  //     const opacity = destination
  //     ? destination.index / Object.keys(taskData.tasks).length
  //     : 0;
  //     document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  // }

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    const { destination, source, draggableId } = result;

    if (!destination) {
      return "";
    } else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return "";
    }
    const column = taskData.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...taskData,
      columns: {
        ...taskData.columns,
        [newColumn.id]: newColumn,
      },
    };
    setTaskData(newState);
  };
  //TODO: make a json fetch API call to "favorite" an order and save it

  return (
    <>
      <DragDropContext
        onDragStart={onDragStart}
        //   onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {taskData.columnOrder.map((columnId) => {
          const column = taskData.columns[columnId];
          const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </>
  );
};
