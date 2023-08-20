const { Router } = require("express");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const userManager = require("../../dao/user.manager");

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"


router.post('/register', async (req,res)=>{
  try {
    const user = req.body
    product = await userManager(user);
    res.send({ status: "success", payload: user });
  
  } catch (err) {
    console.log("error en post user del session router")
    console.log(err)
  }

})




module.exports = router;




