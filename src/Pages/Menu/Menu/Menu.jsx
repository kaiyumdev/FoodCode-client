import React from 'react'
import { Helmet } from 'react-helmet'
import Cover from '../../Shared/Cover/Cover'
import menuImg from "../../../assets/menu/banner3.jpg"
import useMenu from '../../../hooks/useMenu'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === 'dessert');
  const salad = menu.filter((item) => item.category === 'salad');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const offered = menu.filter((item) => item.category === 'offered');


  return (
    <div>
        <Helmet>
            <title>Bistro Boss | Menu</title>
        </Helmet>
        <Cover img={menuImg} title="our menu"></Cover>
        <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
    </div>
  )
}

export default Menu