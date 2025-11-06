import prisma from '../../database/prismaClient.js';

const userRepository = {
  findById: (id) => prisma.user.findUnique({ where: { id } }),
  create: (data) => prisma.user.create({ data }),
};

export default userRepository;
