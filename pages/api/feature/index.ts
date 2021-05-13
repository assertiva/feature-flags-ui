import {NextApiRequest, NextApiResponse} from 'next';
import FeatureService from '@services/feature.service';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        FeatureService.save(req.body.name).then(response => {
            res.status(response.status).json(response.data)
        }).catch(error => {
            console.error(error)
            res.status(error.response.status).json(error.response.data)
        })
    }
}
