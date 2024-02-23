"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface iProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReOrder: (updateData: { id: string; position: number }[]) => void;
}

export const ChapterList = ({ items, onEdit, onReOrder }: iProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(items);
  const onDragEnd = (result: DropResult) => {
    if(!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = items.slice(startIndex, endIndex + 1)
    setChapters(items);
    const bulckUpdatedDate = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));
    onReOrder(bulckUpdatedDate);
  }
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter,index)=>(
              <Draggable 
              draggableId={chapter.id}
              index={index}
              key={chapter.id}
              >
                {(provided)=>(
                  <div {...provided.draggableProps} ref={provided.innerRef}
                  className={cn(
                    'flex items-center mb-4 text-sm  bg-slate-200 rounded-md border border-slate-200 text-slate-700 gap-x-2',
                    chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700 '
                  )}
                  >
                  <div
                  className={cn(
                    'flex items-center px-2 py-3 hover:bg-slate-300 border-r rounded-l-md border-r-slate-200 transition ',
                    chapter.isPublished && 'border-r-sky-200 hover:bg-sky-200'
                  )}
                  {...provided.dragHandleProps}
                  >
                    <Grip
                    className="w-5 h-5"
                    />
                  </div>
                  {chapter.title}
                  <div
                  className="flex items-center mr-2 gap-x-2 ml-auto"
                  >
                    {chapter.isFree && (
                      <Badge>
                        free
                      </Badge>
                    )}
                    <Badge
                    className={cn(
                      'bg-slate-500',
                      chapter.isPublished && 'bg-sky-700'
                    )}>
                      {chapter.isPublished ? 'Published':'Draft'}
                    </Badge>
                    <Pencil
                    className="hover:opacity-75  w-5 h-5 cursor-pointer transition"
                    onClick={()=>onEdit(chapter.id)}
                    />
                  </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
