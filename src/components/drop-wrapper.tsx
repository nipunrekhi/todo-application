import React, { Children, cloneElement } from "react"
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ITEM_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DropWrapperProps {
    children: React.ReactNode;
    item: string | string[];
}

type ItemType = {
    id: string, index: number, column: string
}


export const DropWrapper: React.FC<DropWrapperProps> = ({ children, item }) => {
    const modifiedChildren = Children.map(children, child => {
        return cloneElement(child as any)
    })

    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: ITEM_TYPE,
        drop: () => ({ name: item }),
        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType() as string,
        }),
        canDrop: (item: ItemType) => {
            return ['Todo', 'In-Progress', 'Completed'].includes(item.column);
        },

    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (!canDrop) {
                return "bg-red-400";
            }
            else {
                return "bg-gray-200";
            }
        }
        return "bg-gray-100";
    };




    return (
        <div ref={dropRef as any} className={cn("w-full ", `${getBackgroundColor()}`)}  >
            {modifiedChildren}
        </div>
    )
}
