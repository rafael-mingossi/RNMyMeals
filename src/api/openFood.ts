import {useQuery, UseQueryResult} from '@tanstack/react-query';

interface ProductInfo {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  sodium: number;
  fibre: number;
  carbohydrates: number;
  serv_size: string;
  serv_unit: string;
  image: string;
}

interface ApiResponse {
  status: number;
  product: {
    product_name: string;
    nutriments: {
      'energy-kcal_100g': number;
      proteins_100g: number;
      fat_100g: number;
      carbohydrates_100g: number;
      sodium_100g: number;
      fiber_100g: number;
    };
    product_quantity: string;
    product_quantity_unit: string;
    image_front_url: string;
  };
}

const fetchProductInfo = async (barcode: string): Promise<ProductInfo> => {
  const response = await fetch(
    `https://au.openfoodfacts.org/api/v0/product/${barcode}.json`,
  );
  const data: ApiResponse = await response.json();
  if (data.status !== 1) {
    throw new Error('Product not found');
  }
  return {
    name: data.product.product_name,
    calories: data.product.nutriments['energy-kcal_100g'],
    protein: data.product.nutriments.proteins_100g,
    fat: data.product.nutriments.fat_100g,
    carbohydrates: data.product.nutriments.carbohydrates_100g,
    serv_size: data.product.product_quantity,
    serv_unit: data.product.product_quantity_unit,
    image: data.product.image_front_url,
    sodium: data.product.nutriments.sodium_100g,
    fibre: data.product.nutriments.sodium_100g,
  };
};

export const useProductInfo = (
  barcode: string | null,
): UseQueryResult<ProductInfo, Error> => {
  return useQuery({
    queryKey: ['productInfo', barcode],
    queryFn: async () => {
      if (!barcode) {
        throw new Error('No barcode provided');
      }
      return await fetchProductInfo(barcode);
    },
    enabled: !!barcode, // Only run the query when barcode is truthy
  });
};
