const express = require('express');

const uuid = require('uuid');

const members = require('../../members');

const route = express.Router();

// Gets all members
route.get('/', (req, res) => res.json(members));

// Gets single member
route.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

// Create member
route.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.send(members);
});

route.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name;

                res.json({ msg: 'Member updated', member});
            }
        })
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

route.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        let data = members.filter(member => member.id !== parseInt(req.params.id));

        res.json({msg: 'Member deleted', members: data});
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = route;