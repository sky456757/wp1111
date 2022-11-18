import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import mongoose from 'mongoose'
import {check,setCheck} from "./check.js";
const router = Router();
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await deleteDB();
    //await saveCard("Ric","Math",50);
   });
router.delete("/cards", async (req, res)=>{
    await deleteDB();
    res.status(200).send({ message: "Database cleared"});
});
router.post("/card", async (req, res)=>{
    //console.log(req.body.name)
    await saveCard(req.body.name,req.body.subject,req.body.score)
    console.log(check)
    if(check)
        res.status(200).send({ message: "Updating ("+req.body.name+", "+req.body.subject+", "+req.body.score+")",card :1});
    else
        res.status(200).send({ message: "Adding ("+req.body.name+", "+req.body.subject+", "+req.body.score+")",card :1});

});
router.get("/cards", async (req, res)=>{
    console.log(req.query.type[0])
    var type = req.query.type[0];
    var existing = ''
    if(type === "name")
        existing = await ScoreCard.find({ name: req.query.string })
    else
    existing = await ScoreCard.find({ subject: req.query.string })
    if(existing.length > 0)
    {
        console.log(existing)
        res.status(200).send({ messages: existing.map((e)=>("Found card with "+type+":("+ e.name+","+ e.subject+","+ e.score+")"))});
    }
    else
    {
        res.status(200).send({ message: type+" ("+req.query.string+") not found!"});
    }
    //console.log(p.type)

});

const deleteDB = async () => {
    try {
      await ScoreCard.deleteMany({});
      console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
   };
const saveCard = async (name,subject,score) => {
    const existing = await ScoreCard.findOne({name,subject});
    //if (existing) throw new Error(`data ${name+" "+subject} exists!!`); 
    //console.log(existing)
    try {
        if (!existing)
        {
            const newCard = new ScoreCard({name,subject,score});
            console.log("Created Card", newCard);
            setCheck(0);
            newCard.save();
            return 0;
        }
        else
        {
            //const newCard = new ScoreCard({name,subject,score});
            existing.score = score;
            console.log("Update Card", existing);
            setCheck(1);
            existing.save();
            return 1;

        }
      } catch (e) { throw new Error("User creation error: " + e); }

}
/*
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    await deleteDB();
    await saveCard("Ric","Math",50);
    await saveCard("Ric","Math",40);
    await saveCard("Ric","English",40);
    await saveCard("Me","Math",100);
   });*/
export default router;
 