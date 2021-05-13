import {Feature} from './feature';

export interface Product {
    _id?: string;
    name: string;
    features: Feature[];
}
