module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')

    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);

    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);

    //  Add Art

    app.post('/api/addArt',admin.upload.fields([{ name: "photos", maxCount: 50 }]),admin.addArt);
    
    app.put('/api/updateArt/:artId',admin.upload.fields([{ name: "photos", maxCount: 50 }]),admin.updateArt);

    app.get('/api/getArt',admin.getArt);

    app.delete('/api/deleteArt/:artId',admin.deleteArt);
    
    
     

    
}