import express from 'express';
import {faker} from '@faker-js/faker';

const router = express.Router();

router.get('/productos-test', (req,res) => {
    const productosTest = [];
    for (let index = 0; index < 5; index++) {
        productosTest.push({
            id: index+1,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }
    res.render('test',{productosTest});
})

export default router;