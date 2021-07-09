module.exports = {
    
    checkLoggedUser: (req, res, next) => {
        req.session.currentUser ? next() : res.redirect('/login')
    },
    
    checkRoles: (...rolesToCheck) => (req, res, next) => {
        rolesToCheck.includes(req.session.currentUser.role) ? next() : res.render('auth/login', { errorMessage: 'Admin only!' })
    }
}