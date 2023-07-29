import { getNotes } from './mock';

const notes = getNotes();

function displayNotes() {
  const notesTable = document.getElementById('notesTable');
  notesTable.innerHTML = `
        <tr class="notesTable__header">
          <th>Creation Time</th>
          <th>Note Content</th>
          <th>Category</th>
          <th>Dates Mentioned</th>
          <th>Actions</th>
        </tr>
        ${notes
          .filter((note) => !note.archived)
          .map(
            (note) => `
          <tr class="notesTable__record">
            <td>${note.createdAt.toLocaleString()}</td>
            <td>${note.content}</td>
            <td>${note.category}</td>
            <td>${extractDatesFromNoteContent(note.content)}</td>
            <td>
              <button data-action="edit" data-note-id="${note.id}">Edit</button>
              <button data-action="archive" data-note-id="${
                note.id
              }">Archive</button>
              <button data-action="delete" data-note-id="${
                note.id
              }">Delete</button>
            </td>
          </tr>
        `
          )
          .join('')}
      `;

  attachEventListeners();
}

function extractDatesFromNoteContent(content) {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  const dates = content.match(dateRegex) || [];
  return dates.join(', ');
}

function updateSummaryTable() {
  const summaryTable = document.getElementById('summaryTable');
  const categories = {
    Task: { active: 0, archived: 0 },
    'Random Thought': { active: 0, archived: 0 },
    Idea: { active: 0, archived: 0 },
  };

  notes.forEach((note) => {
    if (!note.archived) {
      categories[note.category].active++;
    } else {
      categories[note.category].archived++;
    }
  });

  summaryTable.innerHTML = `
        <tr class="summaryTable__header">
          <th>Category</th>
          <th>Active</th>
          <th>Archived</th>
        </tr>
        ${Object.keys(categories)
          .map(
            (category) => `
          <tr class="summaryTable__record">
            <td>${category}</td>
            <td>${categories[category].active}</td>
            <td>${categories[category].archived}</td>
          </tr>
        `
          )
          .join('')}
      `;
}

function openEditNoteForm(noteId) {
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

function editNote(noteId) {
  const createNoteForm = document.getElementById('noteDialog');
  createNoteForm.style.display = 'none';

  openEditNoteForm(noteId);
}

function saveNote() {
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
  updateSummaryTable();
}

function cancelNote() {
  const noteContentInput = document.getElementById('noteContent');
  const noteCategoryInput = document.getElementById('noteCategory');
  noteContentInput.value = '';
  noteCategoryInput.value = 'Task';

  const createNoteForm = document.getElementById('noteDialog');
  createNoteForm.style.display = 'none';
}

function closeNoteDialog() {
  const noteDialog = document.getElementById('noteDialog');
  const editNoteDialog = document.getElementById('editNoteDialog');

  noteDialog.style.display = 'none';
  editNoteDialog.style.display = 'none';
}

function archiveNote(noteId) {
  const note = notes.find((note) => note.id === parseInt(noteId));
  if (!note) {
    return;
  }

  note.archived = true;

  displayNotes();
  updateSummaryTable();
}

function deleteNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === parseInt(noteId));

  if (noteIndex === -1) {
    return;
  }

  notes.splice(noteIndex, 1);

  displayNotes();
  updateSummaryTable();
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

function saveEditedNote() {
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
    updateSummaryTable();
  } catch (error) {
    console.error('Error saving the note:', error.message);
  }
}

function cancelEditNote() {
  closeNoteDialog();
}

document.addEventListener('DOMContentLoaded', function () {
  const createRecordBtn = document.getElementById('createRecordBtn');
  createRecordBtn.addEventListener('click', toggleCreateNoteForm);
});

function toggleCreateNoteForm() {
  const createNoteForm = document.getElementById('noteDialog');
  const editNoteDialog = document.getElementById('editNoteDialog');

  createNoteForm.style.display = 'block';
  editNoteDialog.style.display = 'none';
}

displayNotes();
updateSummaryTable();
