// pages/shoe/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProducts } from '@/app/lib/firebase/products/read'; // Adjust path as necessary

const ShoePage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the shoe ID from the URL
    const { data, error, isLoading } = useProducts(); // Fetch products
    const [shoe, setShoe] = useState(null);

    useEffect(() => {
        if (data && id) {
            const foundShoe = data.find((shoe) => shoe.id === id); // Find the shoe by ID
            setShoe(foundShoe);
        }
    }, [data, id]);

    if (isLoading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle error state
    }

    if (!shoe) {
        return <div>Shoe not found</div>; // Handle case where shoe is not found
    }

    return (
        <div>
            <h1>{shoe.ProductName}</h1>
            <img src={shoe.ProductImage} alt={shoe.ProductName} />
            <p>Price: {shoe.ProductPrize}</p>
            {/* Additional shoe details here */}
        </div>
    );
};

export default ShoePage;
