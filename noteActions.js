import { updateCategoriesSummary } from './dataProcessor';
import { openEditNoteForm } from './main'; // Import only 'openEditNoteForm' from main.js
import { notes, displayNotes, closeNoteDialog } from './main';

export function editNote(noteId) {
  const createNoteForm = document.getElementById('noteDialog');
  createNoteForm.style.display = 'none';

  openEditNoteForm(noteId);
}

export function saveNote() {
  const noteContentInput = document.getElementById('noteContent');
  const noteCategoryInput = document.getElementById('noteCategory');
  const noteContent = noteContentInput.value.trim();
  const noteCategory = noteCategoryInput.value;

  if (noteContent === '') {
    alert('Note content cannot be empty!');
    return;
  }

  const newNote = {
    id: notes.length + 1,
    createdAt: new Date(),
    content: noteContent,
    category: noteCategory,
    archived: false,
  };

  notes.push(newNote);

  closeNoteDialog();

  displayNotes();
  updateCategoriesSummary(notes);
}

export function cancelNote() {
  const noteContentInput = document.getElementById('noteContent');
  const noteCategoryInput = document.getElementById('noteCategory');
  noteContentInput.value = '';
  noteCategoryInput.value = 'Task';

  const createNoteForm = document.getElementById('noteDialog');
  createNoteForm.style.display = 'none';
}

export function archiveNote(noteId) {
  const note = notes.find((note) => note.id === parseInt(noteId));
  if (!note) {
    return;
  }

  note.archived = true;

  displayNotes();
  updateCategoriesSummary(notes);
}

export function deleteNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === parseInt(noteId));

  if (noteIndex === -1) {
    return;
  }

  notes.splice(noteIndex, 1);

  displayNotes();
  updateCategoriesSummary(notes);
}

export function saveEditedNote() {
  try {
    const noteId = parseInt(document.getElementById('editNoteId').value);
    const noteContent = document.getElementById('editNoteContent').value;
    const noteCategory = document.getElementById('editNoteCategory').value;

    const note = notes.find((note) => note.id === noteId);
    if (!note) {
      return;
    }

    note.content = noteContent;
    note.category = noteCategory;

    closeNoteDialog();

    displayNotes();
    updateCategoriesSummary(notes);
  } catch (error) {
    console.error('Error saving the note:', error.message);
  }
}
