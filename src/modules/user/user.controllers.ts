import { Request, Response } from 'express';
import { userServices } from './user.services';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    res.status(200).send({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUser(req.params.id!, req.body, req.user!);

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getAllUsers,
  updateUser,
};
