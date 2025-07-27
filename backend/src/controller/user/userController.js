import { User } from "../../models/index.js";
 
/**
 *  fetch all users
 */
const getAll = async (req, res) => {
  try {
    //fetching all the data from users table
    const users = await User.findAll();
    res.status(200).send({ data: users, message: "successfully fetched data" });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
/**
 *  create new user
 */
 
const create = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);
    //validation
    if (!body?.email || !body?.name || !body?.password)
      return res.status(500).send({ message: "Invalid paylod" });
    const users = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    res.status(201).send({ data: users, message: "successfully created user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
/**
 *  update existing user
 */
 
const update = async (req, res) => {
  try {
    const { id = null } = req.params;
    const body = req.body;
    console.log(req.params);
    //checking if user exist or not
    const oldUser = await User.findOne({ where: { id } });
    if (!oldUser) {
      return res.status(500).send({ message: "User not found" });
    }
    oldUser.name = body.name;
    oldUser.password = body.password || oldUser.password;
    oldUser.email = body.email;
    oldUser.save();
    res
      .status(201)
      .send({ data: oldUser, message: "user updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update users" });
  }
};
 
/**
 *  delete user
 */
const deleteById = async (req, res) => {
  try {
    const { id = null } = req.params;
    const oldUser = await User.findOne({ where: { id } });
 
    //checking if user exist or not
    if (!oldUser) {
      return res.status(500).send({ message: "User not found" });
    }
    oldUser.destroy();
    res.status(201).send({ message: "user deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
/**
 *  fetch user by id
 */
const getById = async (req, res) => {
  try {
    const id = req.user?.id || null;
    if (!id) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Combine firstName and lastName for frontend convenience
    const userData = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).send({ message: "user fetched successfully", data: userData });
  } catch (e) {
    console.error('Error in getById:', e);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user?.id || null;
    if (!id) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const body = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Split name into firstName and lastName
    if (body.name) {
      const nameParts = body.name.trim().split(' ');
      user.firstName = nameParts[0];
      user.lastName = nameParts.slice(1).join(' ') || '';
    }
    user.email = body.email || user.email;
    user.phone = body.phone || user.phone;
    user.address = body.address || user.address;
    user.profileImage = body.profileImage || user.profileImage;
    await user.save();
    res.status(200).send({ message: "user profile updated successfully", data: user });
  } catch (e) {
    console.error('Error in updateProfile:', e);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};
 
import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const userController = {
  getAll,
  create,
  getById,
  deleteById,
  update,
  updateProfile,
  changePassword,
};
 