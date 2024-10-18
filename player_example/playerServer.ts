import express, { json } from 'express';
import cors from 'cors';
import RandomPlayer from './RandomPlayer';
const app = express();
const PORT = 3001;

app.use(cors({ origin: '*' }));
app.use(json())

app.post('/compute',(req,res) => {
    res.status(200);
    const move = RandomPlayer.compute(req.body.board,req.body.toPlay);
    res.send(move);
})

app.listen(PORT, () => {
    console.log('Started on port ' + PORT);
})


