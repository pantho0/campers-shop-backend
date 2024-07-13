import express, { Request, Response } from 'express'
const app = express()


app.get('/', (req:Request, res:Response) => {
  res.send('Camp Server is up')
})



export default app;