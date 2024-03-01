const sectionApiMap = new Map([
    ["To Do", 'todo'],
    ["In Progress", 'progress'],
    ['Backlog', 'backlog'],
    ['Done', 'done']
]);

const sectionDBMap = new Map([
    ["BACKLOG", "Backlog"],
    [ "TO-DO", "To Do" ],
    [ "PROGRESS", "In Progress"],
    ["DONE", "Done"]
]);
  
module.exports = {sectionApiMap, sectionDBMap};