const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//incluindo o arquivo 
const {eAdmin} = require('../middlewares/auth');



app.use(express.json());

app.get('/',eAdmin,(req,res)=>{
    return res.send({
        error:false,
        message:'listar usuarios!'
    })
})
app.post('/cadastrar', async (req,res)=>{
   const password = await bcrypt.hash('1234',8);

   console.log(password);
   return res.json({
     error:false,   
     mensagem:"Cadastra Usuario!"
   })

})

app.post('/login',async (req,res)=>{
    //console.log(req.body);

   if(req.body.email != "rafamergulha@hotmail.com"){
       return res.status(400).json({
           error: true,
          messagem:"Usuario ou senha incorreta!" 
       })
   }
   if(!(await bcrypt.compare(req.body.password, "$2b$08$Du2zNSJjoH1bL3BmNfWABOSQAPCfhW4pE0ZLTDih2LbU/oIDUSUr2"))){
    return res.status(400).json({
        error: true,
       messagem:"Usuario ou senha incorreta!" 
    })
   }

   //criando o token
   var token = jwt.sign({id : 2}, "qwertyuhjklçcvbnmzxcv",{
       //prazo
       //expiresIn:600 //10minuto
       expiresIn: '7d' // 7 dias de uso
   })

    return res.json({
      error:false,   
      mensagem:"Login realizado com sucesso!",
      Token: token
    })


})

app.listen(2222,function(){
    console.log("Rodando servidor");
})
    
