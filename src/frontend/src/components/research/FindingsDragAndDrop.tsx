import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import DroppableWrapper from "../uiEnhancements/DroppableWrapper";
import { Findings, UploadFindingSchemaType } from "../../types/types";
import CitationsList from "./CitationsList";
import { useFormContext } from "react-hook-form";
import { truncateText, badgeColor } from "../../constants/utils";

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
            className="p-2 min-h-48 overflow-y-auto bg-slate-50 rounded-md"
          >
            {selectedFindings.map((finding, index) => (
              <Draggable key={finding.id} draggableId={finding.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between gap-2 p-2 my-3 rounded-md bg-white shadow-sm px-4"
                  >

                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15" />
                      </svg>
                      <span className={`${badgeColor(finding.badge)} w-3 h-6 rounded-lg mx-3 tooltip`} data-tip={finding.badge}></span>
                    </div>
                    <p test-id={finding.text} className="w-full">{truncateText(finding.text, 85)}</p>
                    {finding.citations && finding.citations.length > 0 && <CitationsList citations={finding.citations} />}
                    <button type="button" className="text-lg" onClick={() => handleDeletion(finding.id)}>✕</button>
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
