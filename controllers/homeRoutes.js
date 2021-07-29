const router = require('express').Router();
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
/*        include: [
            {
                model: User,
                attributes: ['name'],
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
    }]*/
    });
console.log(postData)
    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
    });
    } catch (err) {
    res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {
 //   const userData = await User.findAll({})
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                },
            ],
        });

const post = postData.get({ plain: true });

res.render("post", {
    ...post,
    logged_in: req.session.logged_in
});
    } catch(err){
        res.status(500).json(err);
    }
    });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
    res.redirect('/');
    return;
    }

    res.render('login');
});

module.exports = router;



// const router = require('express').Router();
// const { User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//     try {
//     const userData = await User.findAll({
// /*        include: [
//             {
//                 model: User,
//                 attributes: ['name'],
//         attributes: { exclude: ['password'] },
//         order: [['name', 'ASC']],
//     }]*/
//     });
// console.log(userData)
//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//         users,
//         logged_in: req.session.logged_in,
//     });
//     } catch (err) {
//     res.status(500).json(err);
//     }
// });
// router.get('/posts', withAuth, async (req, res) => {
//     try {
//  //   const userData = await User.findAll({})
// res.render("posts")
//     } catch(err){
//         res.json(err)
//     }
//     })
// router.get('/signup', (req, res) => {

//     res.render('signup');
// });

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//     }

//     res.render('login');
// });

// module.exports = router;
