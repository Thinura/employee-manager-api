print('Start #################################################################');

db = db.getSiblingDB('employee_db');
db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'employee_db' }],
});

print('END #################################################################');
