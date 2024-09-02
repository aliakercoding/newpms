module.exports = {

    index : (req, res) => {
        res.render('user/index');
    },

    loginMethodGet: (req,res) =>{
        res.render('user/login');
    },

    loginMethodPost: (req,res) =>{
        res.render('');
    },
    
    addnewuserMethodGet:(req,res) =>{
        res.render('user/addnewuser');
    },

    addnewuserMethodPost:(req,res) =>{
        res.render('');
    },
}