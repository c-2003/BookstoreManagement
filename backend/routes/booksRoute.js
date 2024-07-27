import express  from "express";
import { Book } from '../models/bookModel.js'

const app = express();


const router = express.Router();

router.get('/', (req,res) =>{
    Book.find()
    .then(books => { 
        return res.status(200).json({
            count : books.length,
            data : books
        })
    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).send(
            {message : err.message}
        );
    });
});

router.get('/:id', (req,res) =>{
    const id = req.params.id;
    Book.findById(id)
    .then(book => { 
        res.status(200).json(book)
    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).send(
            {message : err.message}
        );
    });
});



router.post('/', (req,res)=>{
    if(
        !req.body.title ||
        !req.body.auther ||
        !req.body.publishYear
    ){
        return res.status(400).send({
            message : 'Send All required fields title, auther, publish year'
        });
    }
    const newBook =  {
        title : req.body.title,
        auther : req.body.auther,
        publishYear : req.body.publishYear,
    };

    Book.create(newBook)
    .then(book =>{
        console.log(book)
        return res.status(200).send(book);
    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).send(
            {message : err.message}
        );
    });
});

router.put('/:id', (req,res)=>{
    // console.log("INside put");
    if(
        !req.body.title ||
        !req.body.auther ||
        !req.body.publishYear
    ){
        return res.status(400).send({
            message : 'Send All required fields title, auther, publish year'
        });
    }

    const { id }= req.params; // const id = req.params.id

    Book.findByIdAndUpdate(id, req.body)
    .then(result =>{
        // console.log(result)
        if(!result){
            return res.status(404).send({message : 'Could not find the book'});
        }
        return res.status(200).send({message : 'Books updated successfully'});
    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).send(
            {message : err.message}
        );
    });
});


router.delete('/:id', (req,res) =>{
    const { id } = req.params;

    Book.findByIdAndDelete(id)
    .then(result=>{
        if(!result){
            return res.status(404).send({message : 'Could not find the book'});
        }
        return res.status(200).send({message : 'Book deleted successfully!'});
    })
    .catch(err =>{
        console.log(err.message);
        return res.status(500).send(
            {message : err.message}
        );
    });
});

export default router;