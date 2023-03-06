import { React, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import { Column } from "./Column";
import { initialData } from "./initial-data";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
`;

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
    const start = taskData.columns[source.droppableId];
    const finish = taskData.columns[destination.droppableId]

    if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
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
    return
  }

  //Moving from one list to another
  const startTaskIds = Array.from(start.taskIds)
  startTaskIds.splice(source.index, 1)
  const newStart = {
    ...start,
    taskIds: startTaskIds
  }

  const finishTaskIds = Array.from(finish.taskIds)
  finishTaskIds.splice(destination.index, 0, draggableId)
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds
  }
  const newState = {
    ...taskData,
    columns: {
      ...taskData.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
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
        <Container>
        {taskData.columnOrder.map((columnId) => {
          const column = taskData.columns[columnId];
          const tasks = column.taskIds.map((taskId) => taskData.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
        </Container>
      </DragDropContext>
    </>
  );
};
