import service from "./service.js";

// GET /users
export const getUsers = async (req, res) => {
  try {
    const users = await service.findMany();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /users/:id
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await service.findOne(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /users
export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await service.userCreate(user);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await service.userUpdate(id, user);
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await service.userDelete(id);
    if (deletedUser) {
      return res.status(200).json(deletedUser);
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
