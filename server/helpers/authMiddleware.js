import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {

  const jwtSecret = process.env.JWT_SECRET
  const token = req.cookies.token

  if(!token) {
    return res.json({ message: 'Unauthorized' }).status(401)
  }

  try {
    
    const decoded = jwt.verify(token, jwtSecret)
    req.userId = decoded.userId

    next()

  } catch (error) {
    
    return res.json({ message: 'Unauthorized' }).status(401)

  }

}