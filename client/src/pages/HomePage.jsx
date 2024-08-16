import DisplayProducts from '../components/home/DisplayProducts';
import Navbar from '../components/shared/Navbar';


const HomePage = () => {
    return (
        <div className='container mx-auto space-y-6 font-lato'>
            <Navbar/>
            <DisplayProducts/>
        </div>
    );
};

export default HomePage;