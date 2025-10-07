import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    if (editingNoteId) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId ? { ...note, title, content } : note
        )
      );
      setEditingNoteId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1> Developer Rono Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="5"
          placeholder="Your Notes"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">
          {editingNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {notes.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          Writing something
        </p>
      ) : (
        notes.map((note) => (
          <div className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button className="edit" onClick={() => handleEdit(note)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
