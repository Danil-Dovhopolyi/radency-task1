export function extractDatesFromNoteContent(content) {
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  const dates = content.match(dateRegex) || [];
  return dates.join(', ');
}

export function deleteNote(notes, noteId) {
  const noteIndex = notes.findIndex((note) => note.id === parseInt(noteId));

  if (noteIndex === -1) {
    return [...notes];
  }

  const updatedNotes = [...notes];
  updatedNotes.splice(noteIndex, 1);

  return updatedNotes;
}

export function updateCategoriesSummary(notes) {
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

  return categories;
}
