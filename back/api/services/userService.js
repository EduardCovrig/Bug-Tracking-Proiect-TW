import userRepository from '../repositories/userRepository.js';

const userService = {
  getUser: async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  },

  registerUser: async (data) => {
    return await userRepository.create(data);
  },
};

export default userService;
