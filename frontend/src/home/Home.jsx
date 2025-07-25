import Banner from '../components/Banner'
import BestSellerBooks from './BestSellBooks'
import FavBook from './FavBook'


const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellerBooks/>
      <FavBook/>
    </div>
  )
}

export default Home
