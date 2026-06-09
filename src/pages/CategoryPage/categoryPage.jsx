import Navbar from "@components/reusableComponents/navbar.jsx";
import Footer from "@components/reusableComponents/footer.jsx";
import { Box } from "@mui/material";
import CategoryPageComponent from "@components/CategoryPageComponents/categoryPageComponent.jsx";
const CategoryPage = () => {

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <CategoryPageComponent />
            <Footer />
        </Box>
    );
};

export default CategoryPage;