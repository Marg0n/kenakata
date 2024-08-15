import { useState } from 'react';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

const DisplayProducts = () => {

    const { data: productData = [] } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            const { data } = await axios('/products.json')
            return data
        }
    })

    return (
        <div>
            {productData.length}
        </div>
    );
};

export default DisplayProducts;