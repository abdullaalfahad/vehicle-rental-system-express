import { Request, Response } from 'express';
import { authServices } from './auth.services';

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signup(req.body);

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signin(req.body);

    res.status(200).send({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  signup,
  signin,
};
