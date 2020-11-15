var express=require('express');
var path=require('path');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var app=express();
var neo4j=require('neo4j-driver');
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

var driver=neo4j.driver("bolt://localhost",neo4j.auth.basic('neo4j','neo5j'));
var session =driver.session();
//home route

app.get('/',function(req,res){

    session
        .run("MATCH (n:user) RETURN n")
        .then(function(result){
            var userArr=[];
            result.records.forEach(function(record){
                //console.log(record._fields[0]);
                userArr.push({
                    id:record._fields[0].identity.low,
                    fname:record._fields[0].properties.fname
                });
            });
            session
            .run("MATCH (n:place) RETURN n")
            .then(function(result2){
                var placeArr=[];
                result2.records.forEach(function(record){
                    //console.log(record._fields[0]);
                    placeArr.push(record._fields[0].properties);
                    });   
        
            res.render('index',{
                users:userArr,
                places :placeArr
            });
        })
    })
        .catch(function(error){
            console.log(error);
        });
   // res.render('index');
});

//add user route

app.post('/user/add',function(req,res){
    var uid=req.body.uid;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var uemail=req.body.uemail;
    var ulat=req.body.ulat;
    var ulong=req.body.ulong;

    //console.log(name);
    session
     .run("CREATE (n:user {uid:$uidp,fname:$fnamep,lname:$lnamep,uemail:$uemailp,ulat:$ulatp,ulong:$ulongp}) RETURN n", {uidp:uid,fnamep:fname,lnamep:lname,ulatp:ulat,ulongp:ulong,uemailp:uemail})

    .then(function(result){
        res.redirect('/');
       session.close();
        })

    .catch(function(error){
        console.log(error);
    });
});
//add place route
app.post('/place/add',function(req,res){
    var pid=req.body.pid;
    var pname=req.body.pname;
    var prating=req.body.prating;
    var padd=req.body.padd;
    var plat=req.body.plat;
    var plong=req.body.plong;
    var ptype=req.body.ptype;
    //console.log(name);
    session
     .run("CREATE (n:place {pid:$pidp,pname:$pnamep,plat:$platp,plong:$plongp,padd:$paddp,prating:$pratingp,ptype:$ptypep}) RETURN n", {pidp:pid,pnamep:pname,pratingp:prating,ptypep:ptype,platp:plat,plongp:plong,paddp:padd})

    .then(function(result){
        res.redirect('/');
       session.close();
        })
        
    .catch(function(error){
        console.log(error);
    });
});

//frnds connect route
app.post('/friends/connect',function(req,res){
    var uid1=req.body.uid1;
    var uid2=req.body.uid2;
    console.log(uid1);
    console.log(uid2);
    session
     .run("MATCH(a:user {uid:$uid1p}),(b:user {uid:$uid2p}) MERGE(a)-[r:friends]->(b) RETURN r",{uid1p:uid1,uid2p:uid2})

    .then(function(result){
        res.redirect('/');
      //  session.close();
        })
        
    .catch(function(error){
        console.log(error);
    });
});
//connect place to place
app.post('/placedist/connect',function(req,res){
    var pid1=req.body.pid1;
    var pid2=req.body.pid2;
    console.log(pid1);
    console.log(pid2);
    session
     .run("MATCH(a:place {pid:$pid1p}),(b:place {pid:$pid2p}) MERGE(a)-[r:distance {dist:distance(point({latitude:toFloat(a.plat),longitude:toFloat(a.plong)}),point({latitude:toFloat(b.plat),longitude:toFloat(b.plong)}))}]->(b) RETURN r",{pid1p:pid1,pid2p:pid2})

    .then(function(result){
        res.redirect('/');
      session.close();
        })
        
    .catch(function(error){
        console.log(error);
    });
});
//connect user to place
app.post('/userratesplace/connect',function(req,res){
    var uid=req.body.uid;
    var pid=req.body.pid;
    var rating =req.body.rating;
    var rid=req.body.rid;
    console.log(uid);
    console.log(pid);
    session
     .run("MATCH(a:user {uid:$uidp}),(b:place {pid:$pidp}) MERGE(a)-[r:rates {rating:$ratingp,rid:$ridp} ]->(b) RETURN r",{uidp:uid,pidp:pid,ratingp:rating,ridp:rid})

    .then(function(result){
        res.redirect('/');
        session.close();
        })
        
    .catch(function(error){
        console.log(error);
    });
});
app.post('/placerecommendation',function(req,res){
    var r=req.body.r;
    var ptype=req.body.ptype;
    //console.log(name);
    session
     .run("MATCH(me:user)-[:friends]->(f),(f)-[r:rates]-(p:place) WHERE r.rating > 3 AND NOT (me)-[:rates]->(p) AND p.ptype=$type AND distance(point({latitude:toFloat(me.ulat),longitude:toFloat(me.ulong)}),point({latitude:toFloat(p.plat),longitude:toFloat(p.plong)})) < $radius RETURN distinct p AS place,count(*) AS count  ORDER BY count DESC LIMIT 10", {radius:r,type:ptype})

    .then(function(result){
        res.redirect('/');
       session.close();
        })

    .catch(function(error){
        console.log(error);
    });
});


app.listen(9000);

console.log('Server started on port 9000');

module.export=app;
