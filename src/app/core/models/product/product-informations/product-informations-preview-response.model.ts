import { ProductInformationsResponse } from '@models/product/product-informations/product-informations-response.model';

export type PartialProductInformationsResponse = Pick<ProductInformationsResponse, 'id' | 'colorList' | 'weightList'>;
