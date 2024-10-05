import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
  controlComponents,
  eventsComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  const renderComponentList = (title, components, droppableId) => (
    <div className="mb-6 w-full">
      <h2 className="font-bold text-lg text-gray-700 mb-3 w-full">{title}</h2>
      <Droppable droppableId={droppableId} type="COMPONENTS">
        {(provided) => (
          <ul
            className={`${droppableId} space-y-2 w-full`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {components.map((x, i) => (
              <Draggable key={`${x}-sideArea`} draggableId={`${x}-sideArea`} index={i}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out w-full"
                  >
                    {getComponent(x)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );

  return (
    <div className="w-72 flex-none h-full overflow-y-auto flex flex-col items-start p-6 border-r border-gray-200 bg-gray-50">
      <h1 className="font-bold text-2xl text-green-600 mb-8 self-center">Sidebar</h1>
      
      {renderComponentList("Motion", motionComponents, "sideArea-motion")}
      {renderComponentList("Looks", looksComponents, "sideArea-looks")}
      {renderComponentList("Control", controlComponents, "sideArea-control")}
      {renderComponentList("Events", eventsComponents, "sideArea-events")}
    </div>
  );
}
