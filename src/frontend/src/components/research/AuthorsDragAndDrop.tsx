import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { SuggestionItem } from "../../types/types"
import DroppableWrapper from '../uiEnhancements/DroppableWrapper';

function AuthorsDragAndDrop({ selectedNames, handleDeletion, onDrag }: { selectedNames: SuggestionItem[], handleDeletion: (id: string) => void, onDrag: (items: SuggestionItem[]) => void }) {

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedNames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onDrag(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableWrapper droppableId="droppable">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectedNames.map((name, index) => (
              <Draggable key={name.id} draggableId={name.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15" />
                    </svg>
                    <img src={name?.avatarUrl} alt="" />
                    {name.name[0].toLocaleUpperCase() + name.name.slice(1)}
                    <button type="button" onClick={() => handleDeletion(name.id)}>&times;</button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </DroppableWrapper>
    </DragDropContext>
  )
}

export default AuthorsDragAndDrop