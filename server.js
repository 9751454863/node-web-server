const express=require('express'); 
const hbs=require('hbs')
const fs=require('fs')
const port=process.env.PORT|| 3000

var app=express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
//
app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now} : ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if (err) {
			console.log('unable to append in server.log')
		}

	})
	next();
})
// app.use((req,res,next)=>{
// 	res.render('maintainance.hbs')
// })
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
})

app.get('/',(req,res)=>{
//res.send('<h1>Hello Express !</h1>')
res.render('home.hbs',{
	pageTitle:'Welcome to my website',
	welcomeMessage:'This is new website'
	
})

		
	
})
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page'})
})

app.get('/bad',(req,res)=>{
	res.send('error')
})
app.get('/portfolio',(req,res)=>{
	res.render('portfolio.hbs',{
		pageTitle:'portfolio page'
	})
})
app.listen(port,()=>{
console.log(`Server is up on port ${port}`)
});