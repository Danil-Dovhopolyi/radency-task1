import { extractDatesFromNoteContent } from './dataProcessor';
import editIconSvg from './images/Edit.svg';
import archivedIconSvg from './images/folder.png';
import deleteIconSvg from './images/Trash.svg';

export function renderNotesTable(notes) {
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
            <button data-action="edit" data-note-id="${
              note.id
            }" class="notesTable__button">
                <img src="${editIconSvg}" alt="Edit" />
              </button>
              <button data-action="archive" data-note-id="${
                note.id
              }" class="notesTable__button"><img src="${archivedIconSvg}" alt="Archive" /></button>
              <button data-action="delete" data-note-id="${
                note.id
              }" class="notesTable__button"><img src="${deleteIconSvg}" alt="Delete" /></button>
            </td>
          </tr>
        `
      )
      .join('')}
  `;
}

// Function for displaying the summary table of categories
export function renderCategoriesSummary(categories) {
  const summaryTable = document.getElementById('summaryTable');
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
