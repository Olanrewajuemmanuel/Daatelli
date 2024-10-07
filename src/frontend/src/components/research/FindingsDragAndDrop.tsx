import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import DroppableWrapper from "../DroppableWrapper";
import { Findings, UploadFindingSchemaType } from "../../types/types";
import CitationsList from "./CitationsList";
import { FindingsBadge } from "../../types/enums";
import { useFormContext } from "react-hook-form";

function FindingsDragAndDrop({ selectedFindings, setFindings }: { selectedFindings: Findings[], setFindings: React.Dispatch<React.SetStateAction<Findings[]>> }) {
  const { setValue, } = useFormContext<UploadFindingSchemaType>();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedFindings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFindings(items)

  };

  function handleDeletion(id: string): void {
    const newFindings = selectedFindings.filter(finding => finding.id !== id);
    setValue("findings", newFindings)
    setFindings(newFindings)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableWrapper droppableId="droppable">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectedFindings.map((finding, index) => (
              <Draggable key={finding.id} draggableId={finding.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15" />
                    </svg>
                    <p>{FindingsBadge[finding.badge]}</p>
                    {finding.text}
                    {finding?.citations && <CitationsList citations={finding.citations} />}
                    <button type="button" onClick={() => handleDeletion(finding.id)}>&times;</button>
                  </div>
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

export default FindingsDragAndDrop