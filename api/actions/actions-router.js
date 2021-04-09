// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const mw = require('../middleware/middleware')
const Act = require("./actions-model")


router.get('/', async (req,res)=>{
    //code goes here
    try{
        const actions = await Act.get()
        res.status(200).json(actions)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', mw.validateActionId ,async (req,res)=>{
    //code goes here
    try{
        res.status(200).json(req.action)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id', mw.validateActionId, mw.validateAction,  async (req,res)=>{
    //code goes here
    const {id} = req.params
    const {body} = req

    try{
        const update = await Act.update(id,body)

        res.status(200).json(update)
    }
    catch(err){
        res.status(500).json({message:"whats wrong"})
    }
})

router.post('/', mw.validateAction, async (req,res)=>{
    //code goes here
    try{
        const newAction = await Act.insert(req.body)
        res.status(201).json(newAction)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id', mw.validateActionId, async (req,res)=>{
    //code goes here
    try{
        res.status(200).json(`Action with id: ${req.params.id} has been deleted`)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})



module.exports = router