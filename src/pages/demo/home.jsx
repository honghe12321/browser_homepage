import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// 初始数据
const initialList = [
    { id: '1', name: 'Google', href: 'google.com' },
    { id: '2', name: 'Facebook', href: 'facebook.com' },
    { id: '3', name: 'Twitter', href: 'twitter.com' },
];

export const Home2=()=> {
    const [favoritesList, setFavoritesList] = useState(initialList);

    const removeItem = (e, id) => {
        e.stopPropagation(); // 防止触发点击链接事件
        setFavoritesList(prev => prev.filter(item => item.id !== id));
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return; // 如果拖拽的项没有放置区域

        // 重新排序数组
        const items = Array.from(favoritesList);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setFavoritesList(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="list-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {favoritesList.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        className="list"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className="del" onClick={(e) => removeItem(e, item.id)}>
                                            <span>×</span>
                                        </div>
                                        <img
                                            src={`https://favicon.im/${item.href}?larger=true`}
                                            alt="图标呢？"
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

