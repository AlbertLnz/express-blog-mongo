import express from 'express'

const router = express.Router()

const adminLayout = '../views/layouts/admin'

router.get('/', (_req, res) => {

  const locals = {
    title: "Admin Panel",
    description: "Blog - AlbertLnz" 
  }

  try {
    
    res.render('admin/login', { locals, layout: adminLayout }) // specify which layout to render! If not, 'main' layout applied (app.js)

  } catch (error) {
    
    console.log(error)

  }

})



export default router 