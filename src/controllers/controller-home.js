module.exports= {
    home(req, res){
        url: 'http://localhost:8000/',
        res.render("home", { title: "Home", message: "Selamat datang di halaman utama!" });
    }
};
