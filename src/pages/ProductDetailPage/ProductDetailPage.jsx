import Navbar from "@components/reusableComponents/navbar.jsx";
import Footer from "@components/reusableComponents/footer.jsx";
import { Box, Container } from "@mui/material";
import ProductSection from "@components/reusableComponents/ProductSection.jsx";
import ProductReviews from "@components/productDetailPage/ProductReviews.jsx";
import ProductHero from "@components/productDetailPage/ProductHero.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../constants/API.js";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <Container maxWidth="lg">
                <ProductHero product={product} />
            </Container>
            <Container maxWidth="lg">
                <ProductReviews product={product} />
            </Container>
            <ProductSection
                title="You might also like"
                category="mens-shirts"
                skip={0}
            />
            <Footer />
        </Box>
    );
};

export default ProductDetailPage;