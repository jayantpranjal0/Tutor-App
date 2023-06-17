import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
const PORT=process.env.PORT || 5000;
const app=express();
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import courseRoutes from './routes/courseRoutes.js';


connectDB();





app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/courses',courseRoutes);
app.get('/',(req,res)=>res.send('Server is Ready'));

app.use(notFound);
app.use(errorHandler);


app.listen(PORT,()=>console.log(`Server started on PORT: ${PORT}`));
