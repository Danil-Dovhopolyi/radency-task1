import { getNotes } from './mock';
import { renderNotesTable, renderCategoriesSummary } from './renderer';
import { updateCategoriesSummary } from './dataProcessor';
import {
  editNote,
  saveNote,
  cancelNote,
  archiveNote,
  deleteNote,
  saveEditedNote,
} from './noteActions';

let notes = getNotes();

function displayNotes() {
  notes = notes.map((note) => ({
    ...note,
    datesMentioned: extractDatesFromNoteContent(note.content),
  }));

  renderNotesTable(notes);
  renderCategoriesSummary(updateCategoriesSummary(notes));
  attachEventListeners();
}
export function extractDatesFromNoteContent(content) {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  const dates = content.match(dateRegex) || [];
  return dates.join(', ');
}

export function openEditNoteForm(noteId) {
  const note = notes.find((note) => note.id === parseInt(noteId));
  if (!note) {
    return;
  }

  const editNoteDialog = document.getElementById('editNoteDialog');
  const editNoteContentInput = document.getElementById('editNoteContent');
  const editNoteCategoryInput = document.getElementById('editNoteCategory');

  editNoteContentInput.value = note.content;
  editNoteCategoryInput.value = note.category;

  editNoteDialog.style.display = 'block';

  document.getElementById('editNoteId').value = noteId;
}

function closeNoteDialog() {
  const noteDialog = document.getElementById('noteDialog');
  const editNoteDialog = document.getElementById('editNoteDialog');

  noteDialog.style.display = 'none';
  editNoteDialog.style.display = 'none';
}

function attachEventListeners() {
  const editButtons = document.querySelectorAll("[data-action='edit']");
  const archiveButtons = document.querySelectorAll("[data-action='archive']");
  const deleteButtons = document.querySelectorAll("[data-action='delete']");

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const noteId = button.dataset.noteId;
      editNote(noteId);
    });
  });

  archiveButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const noteId = button.dataset.noteId;
      archiveNote(noteId);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const noteId = button.dataset.noteId;
      deleteNote(noteId);
    });
  });

  const saveNoteBtn = document.getElementById('saveNoteBtn');
  saveNoteBtn.addEventListener('click', saveNote);

  const cancelNoteBtn = document.getElementById('cancelNoteBtn');
  cancelNoteBtn.addEventListener('click', cancelNote);

  const saveEditNoteBtn = document.getElementById('saveEditNoteBtn');
  saveEditNoteBtn.addEventListener('click', saveEditedNote);

  const cancelEditNoteBtn = document.getElementById('cancelEditNoteBtn');
  cancelEditNoteBtn.addEventListener('click', cancelEditNote);
}

function cancelEditNote() {
  closeNoteDialog();
}

function toggleCreateNoteForm() {
  const createNoteForm = document.getElementById('noteDialog');
  const editNoteDialog = document.getElementById('editNoteDialog');

  createNoteForm.style.display = 'block';
  editNoteDialog.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const createRecordBtn = document.getElementById('createRecordBtn');
  createRecordBtn.addEventListener('click', toggleCreateNoteForm);

  displayNotes();
});

export { notes, displayNotes, closeNoteDialog };
