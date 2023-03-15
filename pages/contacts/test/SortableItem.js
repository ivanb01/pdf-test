import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="w-8 bg-lightBlue4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.text}
    </div>
  );
};

export default SortableItem;
