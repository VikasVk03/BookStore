import Banner from '../components/Banner'
import BestSellerBooks from './BestSellBooks'
import FavBook from './FavBook'
import PromoBanner from './PromoBanner'


const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellerBooks/>
      <FavBook/>
      <PromoBanner/>
    </div>
  )
}

export default Home
