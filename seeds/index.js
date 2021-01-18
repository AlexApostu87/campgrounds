const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i< 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60037aaf74ab471160418092',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, necessitatibus corporis eligendi, vero, alias repudiandae dolores inventore excepturi unde porro facilis sequi. Architecto minima natus expedita quo totam aliquam atque?',
            price,
            geometry:  { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                 ] } ,
            images: [
                {
                  url: 'https://res.cloudinary.com/dgnr9ymes/image/upload/v1610889656/YelpCamp/qv5pm6uiogqfknyfoh85.jpg',
                  filename: 'YelpCamp/qv5pm6uiogqfknyfoh85'
                },
                {
                  url: 'https://res.cloudinary.com/dgnr9ymes/image/upload/v1610888542/YelpCamp/fvvuymukccadrofblham.jpg',
                  filename: 'YelpCamp/fvvuymukccadrofblham'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})