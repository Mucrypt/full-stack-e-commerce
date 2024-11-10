import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Best Airpodes"}/>
      <HorizontalCardProduct category={"mobiles"} heading={"Best Mobiles Phones"}/>
      <VerticalCardProduct category={"televisions"} heading={"televisions"} />
    </div>
  )
}

export default Home