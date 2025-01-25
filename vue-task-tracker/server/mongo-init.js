/* eslint-disable no-undef */
db = db.getSiblingDB('tasks');
db.createUser({
  user: 'taskuser',
  pwd: 'taskpass123',
  roles: [{
    role: 'readWrite',
    db: 'tasks'
  }]
});