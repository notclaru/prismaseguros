const validarUsuario = (req,res, next)=>{
    console.log("validar usuario (id)", req.session.idUsuario); //anda
    
    if(!req.session.idUsuario ){
        console.log("No hay sesión activa, redirigiendo a login.");
        return res.redirect('/login');
    }

    //  SOY ANITA: lo dejo comentado pq sino cada vez q quiero hacer algo me redirije y no me anda nada
    if (req.session.usuario !== undefined) {
        // if (req.session.usuario.rol_id == 2) {
        //     console.log("Rol de usuario 2, redirigiendo a usuario."); // ME REDIRIJE Y NO ME ANDAN LAS COSAS
        //     return res.redirect('/usuario');
        // }
    }

    console.log("Usuario validado, continuando al siguiente middleware."); // anda

    next();
};

module.exports = validarUsuario;