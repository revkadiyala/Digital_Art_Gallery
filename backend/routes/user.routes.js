module.exports = (app)=>{
    const user = require('../controllers/user.controller')
   
    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);

    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/followArtist', user.followArtist);

    app.get('/api/getFollowersByUserId/:userId', user.getFollowersByUserId);

    app.get('/api/searchArt', user.searchArt);

    app.post('/api/buyArt', user.buyArt);   



    // Artist Routes

    app.post("/api/artistSignUp", user.artistSignUp);

    app.post('/api/artistLogin',user.artistLogin);

    // app.get('/api/getArtsByArtist/:artistId', user.getArtsByArtist);

    app.get('/api/getFollowersByArtistId/:artistId', user.getFollowersByArtistId);

    app.get('/api/getArtistBuyArt/:artist_Id', user.getArtistBuyArt);

    app.post("/api/submitReview", user.submitReview);

    app.get('/api/getArtistReviews/:artistId', user.getArtistReviews);

    app.get('/api/getUserReviews/:userId', user.getUserReviews);

    
}
