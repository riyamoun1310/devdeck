import React, { useState, useRef } from 'react';
import Toast from '../../components/Toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './KanbanBoard.css';

export function KanbanBoard({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  const columns = [
    { key: 'todo', title: 'To-Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'testing', title: 'Testing' },
    { key: 'done', title: 'Done' },
  ];
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Set up project', status: 'todo' },
    { id: 2, title: 'Design UI', status: 'inprogress' },
    { id: 3, title: 'Write tests', status: 'testing' },
    { id: 4, title: 'Deploy app', status: 'done' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask.trim(), status: 'todo' }]);
      setNewTask('');
      setToast({ message: 'Task added!', show: true });
      setTimeout(() => setToast({ message: '', show: false }), 1500);
      inputRef.current?.focus();
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    const draggedTaskId = parseInt(draggableId);
    const destCol = destination.droppableId;
    setTasks(tasks.map(task =>
      task.id === draggedTaskId ? { ...task, status: destCol } : task
    ));
  };

  const handleEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleEditSave = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: editValue } : task));
    setEditingId(null);
    setEditValue('');
    setToast({ message: 'Task updated!', show: true });
    setTimeout(() => setToast({ message: '', show: false }), 1500);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    setToast({ message: 'Task deleted!', show: true });
    setTimeout(() => setToast({ message: '', show: false }), 1500);
  };

  return (
    <div className="kanban-root" style={{ background: darkMode ? '#181818' : '#f9f9f9', minHeight: '100vh', color: darkMode ? '#f9f9f9' : '#181818', transition: 'background 0.3s, color 0.3s', fontFamily: 'Inter, Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Toast message={toast.message} show={toast.show} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem', alignItems: 'center', justifyContent: 'center' }}>
        <div className="kanban-header-row">
          <h2 className="kanban-title">Kanban Board</h2>
          <button className="kanban-mode-btn" onClick={() => setDarkMode(dm => !dm)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            ref={inputRef}
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{ padding: '0.7rem', flex: '1 1 300px', minWidth: 220, marginRight: '0.5rem', background: darkMode ? '#222' : '#fff', color: darkMode ? '#f9f9f9' : '#181818', border: '1.5px solid #bbb', borderRadius: 10, fontSize: 17, boxShadow: darkMode ? '0 1px 4px #111' : '0 1px 4px #ccc', outline: 'none', transition: 'background 0.2s' }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTask();
              if (e.key === 'Escape') setNewTask('');
            }}
            tabIndex={0}
          />
          <button onClick={handleAddTask} style={{ padding: '0.7rem 1.5rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', boxShadow: darkMode ? '0 1px 4px #111' : '0 1px 4px #ccc', fontSize: 17, transition: 'background 0.2s' }} tabIndex={0}>Add Task</button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem', justifyContent: 'center' }}>
            {columns.map(col => (
              <Droppable droppableId={col.key} key={col.key}>
                {(provided: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ flex: '1 1 250px', minWidth: 250, maxWidth: 350, background: darkMode ? '#222' : '#f4f4f4', borderRadius: 14, padding: '1.5rem 1rem', minHeight: 300, boxShadow: darkMode ? '0 2px 12px #111' : '0 2px 12px #ccc', transition: 'background 0.2s', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    <h3 style={{ textAlign: 'center', color: darkMode ? '#f9f9f9' : '#181818', fontWeight: 600, marginBottom: '1.2rem', letterSpacing: 1, fontSize: 22 }}>{col.title}</h3>
                    <div style={{ borderBottom: '1.5px solid #bbb', marginBottom: '1rem', opacity: 0.3 }} />
                    {tasks.filter(task => task.status === col.key).map((task, idx) => (
                      <Draggable draggableId={task.id.toString()} index={idx} key={task.id}>
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              background: darkMode ? '#333' : '#fff',
                              margin: '0.7rem 0',
                              padding: '1.1rem',
                              borderRadius: 12,
                              boxShadow: darkMode ? '0 2px 12px #111' : '0 2px 12px #ccc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              color: darkMode ? '#f9f9f9' : '#181818',
                              fontSize: 17,
                              fontWeight: 500,
                              cursor: 'grab',
                              transition: 'background 0.2s, box-shadow 0.2s',
                              outline: 'none',
                              ...provided.draggableProps.style
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = darkMode ? '#444' : '#f5f5f5')}
                            onMouseOut={e => (e.currentTarget.style.background = darkMode ? '#333' : '#fff')}
                            tabIndex={0}
                          >
                            {editingId === task.id ? (
                              <>
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={e => setEditValue(e.target.value)}
                                  style={{ marginRight: '0.5rem', flex: 1, background: darkMode ? '#222' : '#fff', color: darkMode ? '#f9f9f9' : '#181818', border: '1.5px solid #bbb', borderRadius: 10, fontSize: 17, outline: 'none', padding: '0.5rem' }}
                                  onKeyDown={e => {
                                    if (e.key === 'Enter') handleEditSave(task.id);
                                    if (e.key === 'Escape') setEditingId(null);
                                  }}
                                  tabIndex={0}
                                />
                                <button onClick={() => handleEditSave(task.id)} style={{ marginRight: '0.5rem', background: darkMode ? '#4caf50' : '#1976d2', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 16 }} tabIndex={0}>Save</button>
                                <button onClick={() => setEditingId(null)} style={{ background: darkMode ? '#333' : '#eee', color: darkMode ? '#f9f9f9' : '#181818', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 16 }} tabIndex={0}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <span style={{ flex: 1 }}>{task.title}</span>
                                <button onClick={() => handleEdit(task.id, task.title)} style={{ marginLeft: '0.5rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 16 }} tabIndex={0}>Edit</button>
                                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '0.5rem', color: '#fff', background: 'var(--danger)', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 16 }} tabIndex={0}>Delete</button>
                              </>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
