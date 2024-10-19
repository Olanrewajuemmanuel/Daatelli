import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import DroppableWrapper from "../uiEnhancements/DroppableWrapper";
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

  const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const badgeColor = (badge: FindingsBadge) => {
    switch (badge) {
      case FindingsBadge.correlations:
        return "bg-info";
      case FindingsBadge.outlier:
        return "bg-primary";
      case FindingsBadge.significant:
        return "bg-success";
      case FindingsBadge.unexpected:
        return "bg-gray-600";
      default:
        break;
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableWrapper droppableId="droppable">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-2 min-h-48 overflow-y-auto bg-slate-50 -mb-8 rounded-md"
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
                      <span className={`${badgeColor(finding.badge)} w-6 h-6 rounded-lg ml-8 tooltip`} data-tip={finding.badge}></span>
                    </div>
                    <p test-id={finding.text}>{truncateText(finding.text)}</p>
                    {finding?.citations && <CitationsList citations={finding.citations} />}
                    <button type="button" onClick={() => handleDeletion(finding.id)}>✕</button>
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
