import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// As provided by: [https://stackoverflow.com/questions/75011303/react-beautiful-dnd-with-typescript-react-beautiful-dndunable-to-find-draggable]
const DroppableWrapper = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);
    if (!enabled) {
        return null;
    }
    return <Droppable {...props}>{children}</Droppable>;
};

export default DroppableWrapper;