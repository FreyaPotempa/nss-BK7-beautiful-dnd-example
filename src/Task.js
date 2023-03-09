import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
`;
//styling for handle to drag with
// const Handle = styled.div`
// width: 20px;
// height: 20px;
// background-color: orange;
// border-radius: 4px;
// margin-right: 8px;
// `

export const Task = ({ task, index }) => {
  
  return (
    <Draggable draggableId={task.id} index={index}
    //disables a drag if true by boolean or whatever params  
    // isDragDisabled={task.id === 'task-1'}
      >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {/* Helpful to create just a handle to move from <Handle {...provided.dragHandleProps}/> */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
