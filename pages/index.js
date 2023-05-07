import React from 'react'
import { HeroBanner, FooterBanner, Product } from '../components'
import { client } from '../lib/client'


const index = ({ products, bannerData}) => {
  return (
    <main>
     <HeroBanner heroBanner = {bannerData.length && bannerData[0]}
     />
      <div  className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {
          products?.map((product) => (
            <Product key={product._id} product={product} />
          ))
        }
      </div>

      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </main>
  )
}


export const getServerSideProps = async () => {
  // fetching product data from sanity
  const products = await client.fetch(`*[_type == "product"]`)

  // fetching banner data from sanity
  const bannerData = await client.fetch(`*[_type == "banner"]`)

  return {
    props: { products, bannerData }
  }
}


export default index