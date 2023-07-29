let notes = [
  {
    id: 1,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "First note. Today's date.",
    category: 'Task',
    archived: false,
  },
  {
    id: 2,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Second note. Today's date.",
    category: 'Task',
    archived: false,
  },
  {
    id: 3,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Third note. Today's date.",
    category: 'Task',
    archived: false,
  },
  {
    id: 4,
    createdAt: new Date('2023-07-29T08:00:00'),
    content: "Four note. Today's date.",
    category: 'Task',
    archived: false,
  },
];
export function getNotes() {
  return notes;
}
