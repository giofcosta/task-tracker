/* eslint-disable */
db = db.getSiblingDB('admin');
db.createUser({
  user: 'taskuser',
  pwd: 'taskpass123',
  roles: [
    { role: 'readWrite', db: 'tasks' }
  ]
});