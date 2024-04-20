import * as authServices from '../services/auth.services.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const result = await authServices.register(
      name,
      email,
      password,
      confirmPassword
    );
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
