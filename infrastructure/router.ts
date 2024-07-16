import {Router} from 'express'

export const router = Router()

//comprobar update player, añadir manejo de errores
router.post('/players', async function(req,res){
    const name = req.body.name
    const db = req.app.get('db')
    const player = await db.models().players.getPlayer(name)
    console.log('playersendpoint')
    if (player.length > 0){
        res.status(400)
        res.end('El nombre de usuario ya existe')
    } else {
        await req.app.get('db').models().players.save(name, new Date())
        res.status(201)
        res.end('Operacion realizada')
    }
})

router.put('/players/:id',async function(req,res){
    const name = req.params.id
    const db = req.app.get('db')
    const player = db.models().players.getPlayer(name)

    if (player.length == 0){
        res.status(400)
        res.end('El nombre de usuario no existe')
    } else {
        const newId = req.body.newId
        const gamesTable = await req.app.get('db').models().Jugada.updatePlayer(name)
        res.status(201)
    }
})

router.get('/players', async function(req, res) {
    const ranking = await req.app.get('db').models().Jugada.ranking()
    const players = ranking.map((elem:any)=>{return {playerId:elem['playerId'], winning_percentage:elem['winning_percentage']}})
    res.send(players)
})

router.get('/games/:id', async function(req, res) {
    const games = await req.app.get('db').models().Jugada.playerGames(req.params.id)
    games['Name'] = req.params.id
    res.send(games);
})

router.post('/games/:id',async function(req,res){
    const game = req.body.gameValues
    await req.app.get('db').models().Jugada.saveGame(game)
    res.status(201)
})

router.delete('/games/:id',async function(req,res){
    await req.app.get('db').models().Jugada.deleteGames(req.params.id)  
})

router.get('/ranking',async function(req,res){
    const ranking = await req.app.get('db').models().Jugada.ranking()
    res.status(200)
    res.send(ranking)    
})

router.get('/ranking/loser',async function(req,res){
    const ranking = await req.app.get('db').models().Jugada.ranking()
    const loser = ranking[ranking.length - 1]
    res.status(200)
    res.send(loser)    
})

router.get('/ranking/winner',async function(req,res){    
    const ranking = await req.app.get('db').models().Jugada.ranking()
    const winner = ranking[0]
    res.status(200)
    res.send(winner)   
})

