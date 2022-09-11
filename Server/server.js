const express = require("express");
const app = express();
const cors = require('cors');
const knex = require('knex');
const port = 3001;

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '73994812',
    database : 'crud_db'
  }
}); 

async function main() {
    
    app.use(cors())
    app.use(express.json())
    app.options('*', cors());  
    app.use(express.urlencoded ({
    extended: false
    }));

    
    //get name, age, occupation ,id from client and store in postgres database
    app.post('/add', (req, res) => {
        const {name, age, occupation, id} = req.body;
        db('users').insert({
            id: id,
            name: name,
            age: age,
            occupation: occupation
        }).then(data => {
            res.json(data);
        }).catch(err => res.status(400).json('unable to add user'))
    })

    app.post('/get', (req, res) => {
        //get user full according to user id
        const { id } = req.body;
        db.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
    })
        
    app.listen(port, ()=> {
        console.log(`app is running on port ${port}`);
    })
}

main();