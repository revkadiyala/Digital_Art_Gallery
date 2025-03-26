module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')

    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);

    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);

    app.get('/api/getAllArtist', admin.getAllArtist);

    //  Add Art

    app.post('/api/addArt',admin.upload.fields([{ name: "photos", maxCount: 50 }]),admin.addArt);
    
    app.put('/api/updateArt/:artId',admin.upload.fields([{ name: "photos", maxCount: 50 }]),admin.updateArt);


    app.get('/api/getArt',admin.getArt);

    app.get('/api/getArt/:id',admin.getArtById);

    app.delete('/api/deleteArt/:artId',admin.deleteArt);
    
    app.post('/api/addCategory',admin.addCategory);

    app.put('/api/updateCategory/:id',admin.updateCategory);

    app.delete('/api/deleteCategory/:id',admin.deleteCategory);

    app.get('/api/getAllCategory',admin.getCategories);

    app.post('/api/artComment/:artId', admin.addComment);

    app.post('/api/artLike/:artId', admin.addLike);

    app.get('/api/getAllCount',admin.getAllCount);
    
    
}