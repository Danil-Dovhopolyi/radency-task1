// Функція для відображення нотаток у таблиці
export default function displayNotes() {
  const notesTable = document.getElementById('notesTable');
  notesTable.innerHTML = `
    <tr>
      <th>Час створення</th>
      <th>Зміст нотатки</th>
      <th>Категорія</th>
      <th>Дати</th>
      <th>Дії</th>
    </tr>
    ${notes
      .filter((note) => !note.archived)
      .map(
        (note) => `
      <tr>
        <td>${note.createdAt.toLocaleString()}</td>
        <td>${note.content}</td>
        <td>${note.category}</td>
        <td>${extractDatesFromNoteContent(note.content)}</td>
        <td>
          <button onclick="editNote(${note.id})">Редагувати</button>
          <button onclick="archiveNote(${note.id})">Архівувати</button>
        </td>
      </tr>
    `
      )
      .join('')}
  `;
}
