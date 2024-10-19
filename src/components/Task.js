import { useState } from "react";

export default function Task({ task, onDelete, onToggle, onEdit }) {
  const { title, description, priority, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);

  // Save changes and stop editing
  const handleEditSave = () => {
    onEdit({
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  return (
    <div className={`task ${priority} ${completed ? "completed" : ""}`}>
      {isEditing ? (
        // Editable form
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Buttons in a row with 4px gap */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
              marginTop: "10px",
            }}
          >
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={handleEditSave}>Save</button>
          </div>
        </div>
      ) : (
        // Non-editable view
        <div>
          <div className="task-header">
            <h2>{title}</h2>
            <div className="task-actions">
              <span className="icon edit" onClick={() => setIsEditing(true)}>
                ✏️
              </span>
              <span className="icon delete" onClick={onDelete}>
                🗑️
              </span>
            </div>
          </div>
          <p>{description}</p>
          <p className="priority">Priority: {priority}</p>

          {/* Checkbox for marking task as completed */}
          <div className="task-complete">
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              id={`completed-${title}`}
            />
            <label htmlFor={`completed-${title}`}>
              {completed ? "Completed" : "Pending"}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
