const Act = require('../actions/actions-model')
const Projects = require('../projects/projects-model')
//const express = require('express')

const validateActionId = async(req,res,next)=>{

    const id = req.params.id

    try{
        const action = await Act.get(id)
        if(!action){
            res.status(404).json(`The resource with id: ${id} does not exist`)
        }
        else{
            req.action = action
            next()
        }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}
const validateProjectId = async(req,res,next)=>{

    const id = req.params.id

    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json(`The resource with id: ${id} does not exist`)
        }
        else{
            req.project = project
            next()
        }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }

}

const validateAction = async(req,res,next)=>{

    const body = req.body
    if(!body.notes || !body.description || !body["project_id"]){
        res.status(400).json("Notes, description, and project_id are required fields")
    }
    else{
        const project = await Projects.get(body.project_id)
        if(!project){
            res.status(404).json(`The project with project_id: ${body.project_id} ; does not exist`)
        }
        else{next()}
        
    }

}

const validateProject = (req,res,next)=>{
    const project = req.body
    if(!project.description || !project.name){
        res.status(400).json("Project name and description are required")
    }
    else{
        next()
    }
}

module.exports = {validateAction, validateActionId, validateProjectId, validateProject}

