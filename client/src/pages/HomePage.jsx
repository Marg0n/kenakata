import DisplayProducts from '../components/home/DisplayProducts';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';


const HomePage = () => {
    return (
        <div className='mx-auto space-y-6 font-lato'>
            <Navbar />
            <div className='container mx-auto'>
                <DisplayProducts />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;