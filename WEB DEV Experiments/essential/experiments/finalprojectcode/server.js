var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require('mongoose');


var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test'
var db = mongoose.connect(connectionString);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));


var MovieSchema = new mongoose.Schema({
    idIMDB:String,
    title: String,
    year: String,
    rating: String,
    poster: String,
    plot: String,
    username: []
});



var MovieModel = mongoose.model('MovieModel', MovieSchema);
//var FavMovieModel = mongoose.model('FavMovieModel', FavMovieSchema);

var movies = [];
var favmovies = [];

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    address:String,
    roles: [],
    userfavmovies: [],
    followingusers:[],
    followerusers:[]
});



var UserModel = mongoose.model('UserModel', UserSchema);


var ReviewSchema = new mongoose.Schema({
    idIMDB: String,
    title:String,
    username: String,
    comments: String,
    userrating:Number
    
});



var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);




passport.use(new LocalStrategy(
function(username, password, done)
{

    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function (req, res) {
    
    var user = req.user;
    console.log(user);
    res.json(user);

});

app.get('/loggedin', function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post('/logout', function(req, res)
{
    req.logOut();
    res.send(200);
});     

app.post('/register', function(req, res)
{
    var newUser = req.body;
    if (newUser.username == 'admin')
    {
        newUser.roles = ['admin'];
    }
    else {
        newUser.roles = ['student'];
    }
    
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) { return next(err); }
        if(user)
        {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user)
        {
            req.login(user, function(err)
            {
                if(err) { return next(err); }
                res.json(user);
            });
        });
    });
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get("/rest/user", auth, function(req, res)
{
    UserModel.find(function(err, users)
    {
        res.json(users);
    });
});

app.delete("/rest/user/:id", auth, function(req, res){
    UserModel.findById(req.params.id, function(err, user){
        user.remove(function(err, count){
            UserModel.find(function(err, users){
                res.json(users);
            });
        });
    });
});

/////////////////Fav movie delete////////////////////////////////

app.post("/Movie/favdelete/:movie_id/:username", function (req, res) {


    
    console.log("before initialisation");
    console.log(req.body.user);
    console.log(req.body.movie);
   

    UserModel.findOne({ username: req.params.username }, function (err, user) {
        MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie) {
            // var user = new UserModel(req.body.user);
            // var movie = new MovieModel(req.body.movie);
            console.log("after initialisation");
            console.log(user);
            console.log(movie);
            console.log("new check");
            console.log(user.userfavmovies);
            console.log(req.params.movie_id);
            var idx = user.userfavmovies.indexOf(req.params.movie_id);
            // is it valid?
            console.log(idx);
            if (idx > -1) {
                // remove it from the array.
                console.log(idx);
                console.log(user.userfavmovies);
                console.log("before");
                user.userfavmovies.splice(idx, 1);
                console.log("after");
                console.log(user.userfavmovies);
                // save the doc

                user.save(function (error, user) {

                    var idx = movie.username ? movie.username.indexOf(req.params.username) : -1;
                    // is it valid?
                    console.log(idx);
                    if (idx !== -1) {
                        // remove it from the array.
                        console.log(idx);
                        console.log(movie.username);
                        console.log("before movie");
                        movie.username.splice(idx, 1);
                        console.log("after movie");
                        console.log(movie.username);
                        // save the doc

                        movie.save(function (err, movie) {

                            MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie) {

                                res.json(movie.username);
                                console.log(movie.username);

                            });
                          /*  var fuser=req.params.username;
                            MovieModel.find({ username: fuser }, function (err, favmovies) {
                                    console.log('return if');
                                    console.log(favmovies);
                                    res.json(favmovies);
                                });*/

                            });                      

                    }
                    else {
                        MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie) {

                            res.json(movie.username);
                            console.log(movie.username);

                        });
                        /*
                        var fuser=req.params.username;
                        MovieModel.find({ username: fuser }, function (err, favmovies) {
                            console.log('return if');
                            console.log(favmovies);
                            res.json(favmovies);
                        });*/

                    }
                });
            } else {
                MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie) {

                    res.json(movie.username);
                    console.log(movie.username);

                });
                /*
    var fuser=req.params.username;
        MovieModel.find({ username: fuser }, function (err, favmovies) {
            console.log('return if');
            console.log(favmovies);
            res.json(favmovies);
        });*/

   
}
        });
    });
});


//////////movie_details.js///////////know  whether the user likes this movie or not//////////////////

app.post("/getlike", function (req, res) {

    var bigObj = req.body;
    console.log(bigObj);

    var movie_id = bigObj.movie_id;
    var username = bigObj.username;

   // UserModel.findOne({ username: username }, function (err, user) {
    MovieModel.findOne({ idIMDB: movie_id }, function (err, movie) {
        if (movie == null) {
            res.json(null);

        } else {
            console.log(movie);
            console.log(movie.username);
            console.log(movie.username.length);
            var like = false;
            for (var j = 0; j < movie.username.length; j++) {
                if (username == movie.username[j]) {
                    like = true;
                }
            }
            if (like == true) {
                res.json(movie);
            }
            else {
                res.json(null);
            }
        }
        });

    });

           



           
           

app.put("/rest/user/:id", auth, function (req, res) {
    delete req.body._id;
    UserModel.update({ _id: req.params.id }, { $set: req.body }, function (err, count) {
        res.json(count);
    });
    //UserModel.findById(req.params.id, function (err, user) {
    //    delete req.params.id;
    //    user.update(req.body, function(err, count){
    //        UserModel.find(function(err, users){
    //            res.json(users);
    //        });
    //    });
    //});
});

app.post("/rest/user", auth, function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user) {
        if(user == null)
        {
            user = new UserModel(req.body);
            user.save(function(err, user){
                UserModel.find(function(err, users){
                    res.json(users);
                });
            });
        }
        else
        {
            UserModel.find(function(err, users){
                res.json(users);
            });
        }
    });
});

/* services on movies */

app.post("/Movie", function (req, res) {
    var obj = req.body;
    movies.push(obj);
    res.json(movies);

});
////////////////User services//////////////////


app.get("/allusers",function(req,res){

    UserModel.find(function (err,users) {
        res.json(users);
    });

});




///////////////////LIST OF USERS WHO HAVE THE MOVIE AS THEIR FAVORITE////////////////////////
/*
app.post("/Movie/fav/user/:movie_id/:username", function (req, res) {
    MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie_check) {
        if (movie_check == null) {
            res.json(movie_check);
        }
        else {
            console.log(movie_check.username);
            // MovieModel.find({ username: { $in: usernames_in } }, function (err, favmovies) {
            UserModel.find({ username: { $in: movie_check.username } }, function (err, user) {

                res.json(user);
                console.log(user);
                
            });
        }
    });

});
*/


///movie_description//---movie_details---/////////////////////
///////////////////LIST OF USERS WHO HAVE THE MOVIE AS THEIR FAVORITE////////////////////////

app.get("/Movie/detail/fav/user/:movie_id", function (req, res) {
    MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie_check) {
        if (movie_check == null) {
            console.log("Check bharath  null");
            res.json(movie_check);
        }
        else {
            console.log(movie_check.username);
            // MovieModel.find({ username: { $in: usernames_in } }, function (err, favmovies) {
          //  UserModel.find({ username: { $in: movie_check.username } }, function (err, user) {
                console.log("Check bharath not null return");
                res.json(movie_check.username);
                console.log(movie_check.username);

          //  });
        }
    });

});
















//////////////////////////////FOLLOW USER///////////////////////////////////////////////////////////////////////////////

app.post("/rest/user/follow/:user/:currentuser", function (req, res) {
    UserModel.findOne({ username: req.params.user }, function (err, user) {
        var followerusers_check = true;
        var curusername = req.params.currentuser;
        console.log(curusername);
        console.log(user.followerusers);
        for (var j = 0; j < user.followerusers.length; j++) {
            if (user.followerusers[j] == curusername) {
                followerusers_check = false;
            }
        }

        if (followerusers_check == true) {

            UserModel.findOneAndUpdate({ username: req.params.user }, { $push: { "followerusers": req.params.currentuser } }, { safe: true, upsert: true }, function (err, user) {

                user.save(function (err, user) {
                    UserModel.findOneAndUpdate({ username: req.params.currentuser }, { $push: { "followingusers": req.params.user } }, { safe: true, upsert: true }, function (err, user) {

                        user.save(function (err, user) {
                            UserModel.findOne({ username: req.params.currentuser }, function (err, user) {
                                var follow = { following: user.followingusers, follower: user.followerusers };
                               
                                res.json(follow);
                                console.log(user.followingusers);
                                console.log(user.followerusers);

                            });

                        });
                    });
                });
            });
        }
        else {
            UserModel.findOne({ username: req.params.currentuser }, function (err, user) {

                var follow = { following: user.followingusers, follower: user.followerusers };
                               
                res.json(follow);
                console.log(user.followingusers);
                console.log(user.followerusers);

            });
        }
    });
});


/////////////////////////////UNFOLLOW USER////////////////////////////////////////////////

app.post("/rest/user/unfollow/:user/:currentuser", function (req, res) {


    UserModel.findOne({ username: req.params.user }, function (err, user) {
      
        var idx = user.followerusers.indexOf(req.params.currentuser);
        // is it valid?
        console.log(idx);
        if (idx > -1) {
            //remove from array
            console.log("before");
            user.followerusers.splice(idx, 1);
            console.log("after");
            // console.log(user.userfavmovies);
            // save the doc

            user.save(function (error, user) {
                UserModel.findOne({ username: req.params.currentuser }, function (err, currentuser) {

                    var idx =  currentuser.followingusers.indexOf(req.params.user);
                    // is it valid?
                    console.log(idx);
                    if (idx > -1) {
                        // remove it from the array.
                        console.log(idx);
                       
                        console.log("before movie");
                        currentuser.followingusers.splice(idx, 1);
                        console.log("after movie");
                        // console.log(movie.username);
                        // save the doc

                        currentuser.save(function (err, currentuser) {  
                            UserModel.findOne({ username: req.params.currentuser }, function (err, user) {
                                var follow = { following: user.followingusers, follower: user.followerusers };
                               
                                res.json(follow);
                                console.log(user.followingusers);
                                console.log(user.followerusers);                           
                            
                            });
                        });
                                           

                    }
                    else {
                        UserModel.findOne({ username: req.params.currentuser }, function (err, user) {
                            var follow = { following: user.followingusers, follower: user.followerusers };
                               
                            res.json(follow);
                            console.log(user.followingusers);
                            console.log(user.followerusers); 
                        });

                    }
                });
            });
        } else { 
            UserModel.findOne({ username: req.params.currentuser }, function (err, user) {
                var follow = { following: user.followingusers, follower: user.followerusers };
                               
                res.json(follow);
                console.log(user.followingusers);
                console.log(user.followerusers); 
            });

   
        }
    });
});


//////////////////////////////FOLLOW USER from other_profile_details///////////////////////////////////////////////////////////////////////////////

app.post("/rest/user/other/follow/:user/:currentuser", function (req, res) {
    UserModel.findOne({ username: req.params.user }, function (err, user) {
        var followerusers_check = true;
        var curusername = req.params.currentuser;
        console.log(curusername);
        console.log(user);
        console.log(user.followerusers);
        for (var j = 0; j < user.followerusers.length; j++) {
            if (user.followerusers[j] == curusername) {
                followerusers_check = false;
            }
        }

        if (followerusers_check == true) {

            UserModel.findOneAndUpdate({ username: req.params.user }, { $push: { "followerusers": req.params.currentuser } }, { safe: true, upsert: true }, function (err, user) {

                user.save(function (err, user) {
                    UserModel.findOneAndUpdate({ username: req.params.currentuser }, { $push: { "followingusers": req.params.user } }, { safe: true, upsert: true }, function (err, user) {

                        user.save(function (err, user) {
                            UserModel.findOne({ username: req.params.user }, function (err, user) {
                                var follow = { following: user.followingusers, follower: user.followerusers };

                                res.json(follow);
                                console.log(user.followingusers);
                                console.log(user.followerusers);

                            });

                        });
                    });
                });
            });
        }
        else {
            UserModel.findOne({ username: req.params.user }, function (err, user) {

                var follow = { following: user.followingusers, follower: user.followerusers };

                res.json(follow);
                console.log(user.followingusers);
                console.log(user.followerusers);

            });
        }
    });
});


/////////////////////////////UNFOLLOW USER from other_profile_details////////////////////////////////////////////////

app.post("/rest/user/other/unfollow/:user/:currentuser", function (req, res) {


    UserModel.findOne({ username: req.params.user }, function (err, user) {

        var idx = user.followerusers.indexOf(req.params.currentuser);
        // is it valid?
        console.log(idx);
        if (idx > -1) {
            //remove from array
            console.log("before");
            user.followerusers.splice(idx, 1);
            console.log("after");
            // console.log(user.userfavmovies);
            // save the doc

            user.save(function (error, user) {
                UserModel.findOne({ username: req.params.currentuser }, function (err, currentuser) {

                    var idx = currentuser.followingusers.indexOf(req.params.user);
                    // is it valid?
                    console.log(idx);
                    if (idx > -1) {
                        // remove it from the array.
                        console.log(idx);

                        console.log("before movie");
                        currentuser.followingusers.splice(idx, 1);
                        console.log("after movie");
                        // console.log(movie.username);
                        // save the doc

                        currentuser.save(function (err, currentuser) {
                            UserModel.findOne({ username: req.params.user }, function (err, user) {
                                var follow = { following: user.followingusers, follower: user.followerusers };

                                res.json(follow);
                                console.log(user.followingusers);
                                console.log(user.followerusers);

                            });
                        });


                    }
                    else {
                        UserModel.findOne({ username: req.params.user }, function (err, user) {
                            var follow = { following: user.followingusers, follower: user.followerusers };

                            res.json(follow);
                            console.log(user.followingusers);
                            console.log(user.followerusers);
                        });

                    }
                });
            });
        } else {
            UserModel.findOne({ username: req.params.user }, function (err, user) {
                var follow = { following: user.followingusers, follower: user.followerusers };

                res.json(follow);
                console.log(user.followingusers);
                console.log(user.followerusers);
            });


        }
    });
});



/////////////////////ADD MOVIE REVIEWS/////////////////////////////////////////////////////////////////////////////////////



app.post("/Review/add", function (req, res) {

    var movie=req.body.movie
    var review = new ReviewModel(req.body.review);
    console.log(movie);
    console.log(review);

    review.save(function (err, review) {
        
        
        ReviewModel.find({ idIMDB: review.idIMDB }, function (err, reviews) {
            MovieModel.findOne({ idIMDB: review.idIMDB }, function (err, movie_check) {
                if (movie_check == null) {
                    console.log("fresh insert");
                    var movie = new MovieModel(req.body.movie);
                    console.log(movie);

                    movie.save(function (err, movie) {

                       // var return_obj = { movie: movie, reviews: reviews };
                        res.json(reviews);
                    });
                }
                else {
                   // var return_obj = { movie: movie_check, reviews: reviews };
                    res.json(reviews);
                }
            });
        });
    });
});

////movie_details-- get all reviews fo rthe movie////////////////////////////////

app.get("/review/detail/user/:movie_id", function (req, res) {

    var movie_id = req.params.movie_id;
    ReviewModel.find({ idIMDB: movie_id }, function (err, reviews) {
        // var return_obj = { movie: movie, reviews: reviews };

        res.json(reviews);
    });
});






////////////////////////Fetch review for user profile//////////////////////////
/*idIMDB: String,
title:String,
    username: String,
comments: String,
userrating:Number
*/
app.post("/fetch/reviews/:user", function (req, res) {

    ReviewModel.find({ username: req.params.user }, function (err, reviewmodel) {
        

        res.json(reviewmodel);
       // console.log(reviewmodel.movie);
       // console.log(reviewmodel.comments);
    });
});


/////////////Fetch Favorite movies for user profile///////////////////////

app.post("/fetch/favmovies/:user", function (req, res) {

    MovieModel.find({ username: req.params.user }, function (err, favmovies) {
        console.log('return if');
        console.log(favmovies);
        res.json(favmovies);
    });
        // console.log(reviewmodel.movie);
        // console.log(reviewmodel.comments);

});





/////////////Fetch  user profile///////////////////////

app.post("/userdetails/:user", function (req, res) {

    UserModel.findOne({ username: req.params.user }, function (err, user) {
       // console.log('return if');
       // console.log(favmovies);
        res.json(user);
    });
    // console.log(reviewmodel.movie);
    // console.log(reviewmodel.comments);

});


///////////fetch followers for user profile////////////////



app.post("/fetch/followers/:user", function (req, res) {
    UserModel.findOne({ username: req.params.user }, function (err, user) {

        var follow = { following: user.followingusers, follower: user.followerusers };

        res.json(follow);
        console.log(user.followingusers);
        console.log(user.followerusers);
    });
});


///////////Fetch followers from other profile/////////////




app.post("/fetch/other/followers/:profile/:logged", function (req, res) {
    UserModel.findOne({ username: req.params.profile }, function (err, otheruser) {
        UserModel.findOne({ username: req.params.logged }, function (err, loggeduser) {
            console.log("[Imp check bharath]");
            console.log(loggeduser);
            console.log(otheruser);
            console.log(otheruser.followerusers);
            var set = false;
            for (var j = 0; j < otheruser.followerusers.length; j++) {
                if (loggeduser == otheruser.followerusers[j]) {
                    console.log("return true ");
                    set = true;
                } 
            }

          
            if (set==true) {
                console.log("return true imp bharath");
                res.json("true");
            }
            else {
                console.log("return false imp bharath");
                res.json("false");
            }


        });
    });
});




///////////////////////////ADD MOVIE TO FAVORITE///////////////////////////////////////


app.post("/Movie/fav/:movie_id/:username", function (req, res) {

   
    MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie_check) {

        if (movie_check == null) {


            console.log("fresh insert add fav");
            var movie = new MovieModel(req.body);
            console.log(movie);

            movie.set('username', req.params.username);
            console.log(movie);
            movie.save(function (err, movie) {
                UserModel.findOneAndUpdate({ username: req.params.username }, { $push: { "userfavmovies": movie.idIMDB } }, { safe: true, upsert: true }, function (err, user) {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }


                    var usernames = [];

                    for (var j = 0 ; j < movie.username.length; j++) {

                        console.log("Imp");

                        console.log(movie.username[j]);
                        usernames.push(movie.username[j]);
                    }





                    console.log(movie.username);
                    // MovieModel.find({ username: { $in: usernames_in } }, function (err, favmovies) {
                   // MovieModel.findOne({ idIMDB: movie.idIMDB }, function (err, user) {

                        res.json(movie.username);
                        console.log(movie.username);

                   // });



/*
                    console.log("[1]");
                    console.log(usernames);
                    var fname = req.params.username;
                    MovieModel.find({ username: fname }, function (err, favmovies) {
                        console.log('return if');
                        console.log(favmovies);
                        res.json(favmovies);
                    }); */

                });


            });
        }
        else {
            var usernames = [];
            var update = true;
            for (var j = 0 ; j < movie_check.username.length; j++) {

                console.log("Imp");
                if (movie_check.username[j] == req.params.username) {
                    console.log(movie_check.username[j]);
                    update = false;
                    
                }
                usernames.push(movie_check.username[j]);

            }
           
                if (update == true) {
                    console.log("Inside null");
                    
                    MovieModel.findOneAndUpdate({ idIMDB: req.params.movie_id }, { $push: { "username": req.params.username } }, { safe: true, upsert: true }, function (err, movie) {
                        
                        movie.save(function (err, movie) {

                            UserModel.findOneAndUpdate({ username: req.params.username }, { $push: { "userfavmovies": movie.idIMDB } }, { safe: true, upsert: true }, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    return res.send(err);
                                }

                                var usernames_in = [];
                                for (var j = 0 ; j < movie.username.length; j++) {
                                    usernames_in.push(movie.username[j]);


                                } 

                            // UserModel.find({ username: movie.username }, function (err, user) {
                            MovieModel.findOne({ idIMDB: req.params.movie_id }, function (err, movie) {

                                res.json(movie.username);
                                console.log(movie.username);

                                });
                                /*
                                // MovieModel.find({ username: { $in: usernames_in } }, function (err, favmovies) {
                                var fname = req.params.username;
                                MovieModel.find({ username: fname }, function (err, favmovies) {
                                    console.log('return');
                                    console.log(favmovies);
                                    res.json(favmovies);
                                });*/
                            });



                        });


                    });
                }
                else {
                    console.log("Else- Not Inside null");
                  //  UserModel.find({ username: movie_check.username }, function (err, user) {

                    res.json(movie_check.username);
                    console.log(movie_check.username);

                  //  });
                    //  MovieModel.find({ username: { $in: usernames } }, function (err, favmovies) {
                  /*  var fname = req.params.username;
                    MovieModel.find({ username: fname }, function (err, favmovies) {
                        console.log('return');
                        console.log(favmovies);
                        res.json(favmovies);
                    }); */
                }

           // });
        }
    });
});

       

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);