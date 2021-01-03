import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config() 

connectDB()

const importData = async () => {
    try{
        //the function returns promise, so we use await
        //Deleting everything from database
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        
        //Inserting users into database
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map( product => {
            return {...product, user: adminUser}
        });
        
        //Inserting products into database
        await Product.insertMany(sampleProducts);

        console.log(`Data imported!!!`.green.inverse);
        process.exit(1);
    }
    catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        //the function returns promise, so we use await
        //Deleting everything from database
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log(`Data Destroyed!!!`.red.inverse);
        process.exit(1);
    }
    catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

if (process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}

