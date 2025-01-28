db.getSiblingDB("admin").auth("root", "example");
db.createUser({
  user: "taskuser",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "taskdb",
    },
  ],
});
