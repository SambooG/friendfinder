const express = require('express');
const path = require('path');
const friends = require("./data/friends");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/survey', (req, res) => res.sendFile(path.join(__dirname + "/public/survey.html")));

app.get("/api/friends", function (req, res){
    res.json(friends)
});
app.post("/api/friends", function (req, res){
    console.log("request.body", req.body);
    const newFriend = findFriend(req.body)
    console.log("NEW FRIEND: ", newFriend);
    res.json(newFriend);
});

function calculateDifference(arrayOne, arrayTwo){
    let score = 0;
    for(let i = 0; i < arrayOne.length; i++){
        let difference = parseInt(arrayOne[i]) - parseInt(arrayTwo[i]);
        score += Math.abs(difference);
    }
    return score;
}
 function findFriend(loner){
     let newFriend = null;
     let lowScore= Infinity;
     friends.forEach(function(friend){
         const score = calculateDifference(friend.scores, loner.scores);
        if (score < lowScore){
            newFriend = friend;
            lowScore = score; 
        }
     })
     return newFriend;
    }

    


app.get('*', (req, res) => res.sendFile(path.join(__dirname + "/public/home.html")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

