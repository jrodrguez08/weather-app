import jwt from 'jsonwebtoken';

const authService = {

  isLoggedIn: (req, res, next) => {
    const token = req.headers['Auth-Token'];
    if (!token) {
      res.status('401').json({ message: 'access denied' });
      return;
    }
    try {
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      req.user = valid;
      next();
    } catch (error) {
      res.status('40').json({ message: error.message });
    }
  },

};

export default authService;
