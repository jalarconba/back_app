// requireLogin.js

const requireLogin = (req, res, next) => {
    // Aquí implementa la lógica de autenticación
    // Por ejemplo, puedes verificar si existe un token de sesión en la solicitud
    const token = req.headers.authorization;

    if (token) {
        // Si hay un token, el usuario está autenticado, continúa con la siguiente ruta
        next();
    } else {
        // Si no hay un token, el usuario no está autenticado, envía un mensaje de error
        res.status(401).json({ message: "Acceso no autorizado. Inicia sesión para continuar." });
    }
};

module.exports = requireLogin;
