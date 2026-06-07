import { Button, Container, Box } from "@mui/material";
import Navbar from "@components/reusableComponents/navbar.jsx"
import Footer from "@components/reusableComponents/footer.jsx"
import HeroSectionComponent from "@components/homePageComponents/heroSectionComponent.jsx"
import BrandsBar from "@components/homePageComponents/brandLine.jsx"
import HappyCustomers from "@components/reusableComponents/сustomersComments.jsx"
import BrowseByStyle from "@components/homePageComponents/dressStyleComponent.jsx"
import ProductSection from "@components/reusableComponents/ProductSection.jsx"

const HomePage = () => {
    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <HeroSectionComponent />
            <BrandsBar />

            <Container maxWidth="xl">
                <Box sx={{ my: 10 }}>
                    <ProductSection
                        title="New Arrivals"
                        category="mens-shirts"
                        skip={0}
                    />

                    <ProductSection
                        title="Top Selling"
                        category="mens-shirts"
                        skip={1}
                    />
                </Box>

                <BrowseByStyle />
                <HappyCustomers />
            </Container>

            <Footer />
        </Box>
    )
};

export default HomePage;