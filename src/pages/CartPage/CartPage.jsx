import { Box } from "@mui/material";
import CartPageComponent from "@components/CartPageComponents/CartPageComponent.jsx";
import Navbar from "@components/reusableComponents/navbar.jsx";
import Footer from "@components/reusableComponents/footer.jsx";

const CartPage = () => {
    return (
        <Box>
            <CartPageComponent />
            <Footer />
        </Box>
    );
};

export default CartPage;