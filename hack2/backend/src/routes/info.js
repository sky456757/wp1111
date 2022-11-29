// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'


exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    let priceFilter = req.query.priceFilter
    let mealFilter  = req.query.mealFilter
    let typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 
    //console.log(priceFilter)
    if (!priceFilter)
        priceFilter = [1,2,3]
    console.log(priceFilter)
    if (!mealFilter)
        mealFilter = ["Breakfast", "Lunch"   , "Dinner"]
    if (!typeFilter)
        typeFilter = ["Chinese"  , "American", "Italian", 
            "Japanese" , "Korean"  , "Thai"]
    for(var i = 0; i< priceFilter.length;i++)
    {
        if(priceFilter[i] == "$")
            priceFilter[i] = 1
        if(priceFilter[i] == "$$")
            priceFilter[i] = 2
        if(priceFilter[i] == "$$$")
            priceFilter[i] = 3
    }
    // TODO Part I-3-a: find the information to all restaurants
    let existing = []
    if(sortBy === "price")
    {
        existing = await Info.find({collection: 'Restaurant'})
        .where('price').in(priceFilter)
        .where('tag').in(mealFilter)
        .where('tag').in(typeFilter)
        .sort({ price : 0 })
        
    }
    else
    {
        existing = await Info.find({collection: 'Restaurant'})
        .where('price').in(priceFilter)
        .where('tag').in(mealFilter)
        .where('tag').in(typeFilter)
        .sort({ distance: 0 })
    }
    existing = await Info.find({collection: 'Restaurant'})
    if(existing === [])
    {
        console.log(existing)
        res.status(403).send({ message: 'error', contents: [] })
    }
    else
    {
        console.log(existing)
        res.status(200).send({ message: 'success', contents: existing })
    }
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    //console.log(id)
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    const existing = await Info.findOne({id: id})
    if(!existing)
    {
        res.status(403).send({ message: 'error', contents: '' })
    }
    else
    {
        res.status(200).send({ message: 'success', contents: existing })
    }
}