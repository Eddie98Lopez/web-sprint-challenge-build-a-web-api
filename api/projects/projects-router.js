// Write your "projects" router here!
// Write your "actions" router here!
const express = require('express')
const { validateProjectId, validateProject } = require('../middleware/middleware')
const router = express.Router()
const Projects = require("./projects-model")
const Act = require('../actions/actions-model')

router.get('/', async (req,res)=>{
    //code goes here
    try{
        const projects = await Projects.get()
        res.status(200).json(projects)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', validateProjectId,async (req,res)=>{
    //code goes here
    try{
        res.status(200).json(req.project)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id/actions',validateProjectId,async(req,res)=>{
    try{
        const actions = await Act.get()
        res.status(200).json(actions)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.put('/:id', validateProjectId, validateProject, async (req,res)=>{
    //code goes here
    try{
        const update = await Projects.update(req.params.id,req.body)
        res.status(200).json(update)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', validateProject,async (req,res)=>{
    //code goes here
    try{
        const newPost = await Projects.insert(req.body)
        res.status(201).json(newPost)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id', validateProjectId,async (req,res)=>{
    //code goes here
    try{
        res.status(200).json(`the project with id: ${req.params.id} has been deleted`)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports = router