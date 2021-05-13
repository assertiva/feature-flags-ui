import {NextApiRequest, NextApiResponse} from "next";
import ProductService from '@services/product.service';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        ProductService.saveProduct(req.body.name).then(response => {
            res.status(response.status).json(response.data)
        }).catch(error => {
            console.error(error)
            res.status(error.response.status).json(error.response.data)
        })
    }
}
