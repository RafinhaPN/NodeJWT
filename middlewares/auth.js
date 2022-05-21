const jwt =  require ('jsonwebtoken');
const {promisify} =require('util');

module.exports ={
    eAdmin: async function(req,res,next){
        // recebe da rota lista usuario o token
      const authHeader = req.headers.authorization;  
       console.log(authHeader);
       //resultado recebido da rota Lista usuario
      //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzMDA3OTE3LCJleHAiOjE2NTM2MTI3MTd9.WgdExqVXKPmrbUe5jTHSMSgoeJN2YAVr0iEZBDqnVik
      if(!authHeader){ // diferente de true  não esta enviando o token
          return res.status(400).json({
              error:true,
              mensagem:"Error: Necessario realizar o login pra acessar falta o token A"
          })
      }
      //const [Bearer,token] = authHeader.split(' ');
    const [,token] = authHeader.split(' ');
    //console.log('token :' + token)

    if(!token){
        return res.status(400).json({
            error:true,
            mensagem:"Error: Necessario realizar o login pra acessar falta o token B"
        })
      }
      // verificar se  o token enviado é valido ainda
       try{
       const decode = await promisify(jwt.verify(token,"qwertyuhjklçcvbnmzxcv"));
      const userId = decode.id;
       return next();
       }catch(err){
        return res.status(400).json({
            error:true,
            mensagem:"Error: Necessario realizar o login pra acessar falta o token invalido"
        })
       }
    }
}