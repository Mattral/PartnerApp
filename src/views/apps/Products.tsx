import React from "react";

const Products = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="relative flex flex-col items-center justify-center gap-4 min-h-[300px] text-white">
      {/* Background Image with Adjusted Height */}
      <div
        className="h-[300px] w-[1500px] rounded-[20px] bg-hero bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/assets/images/hero-background.png')",
          borderRadius: "20px",
          padding: "20px", // Reduced padding to lessen space
          boxSizing: "border-box",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 p-4">
          {/* Text Overlay */}
          <h2
            className="bg-opacity-75 max-w-[270px] rounded py-2 text-left text-base font-normal"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "white",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maxWidth: "fit-content",
            }}
          >
            Upcoming Meeting at: <span style={{ color: "white" }}>{time}</span>
          </h2>
        </div>
        {/* Empty space */}
        <div className="absolute top-[50px]"> <p>_</p></div>
        <div className="absolute top-[120px] left-0 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl" style={{ color: "white", margin: 0 }}>
              {time}
            </h1>
            <p className="text-lg font-medium" style={{ color: "white", margin: 0 }}>
              {date}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold"> </h1>
    </section>
  );
};

export default Products;





/*
'use client';

import { useEffect, useState, ReactElement } from 'react';

// MATERIAL - UI
import { styled, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// PROJECT IMPORTS
import ProductCard from 'components/cards/e-commerce/ProductCard';
import FloatingCart from 'components/cards/e-commerce/FloatingCart';
import SkeletonProductPlaceholder from 'components/cards/skeleton/ProductPlaceholder';

import ProductEmpty from 'sections/apps/e-commerce/products/ProductEmpty';
import ProductsHeader from 'sections/apps/e-commerce/products/ProductsHeader';
import ProductFilterDrawer from 'sections/apps/e-commerce/products/ProductFilterDrawer';

import useConfig from 'hooks/useConfig';
import { resetCart, useGetCart } from 'api/cart';
import { productFilter, useGetProducts } from 'api/products';

// TYPES
import { Products as ProductsTypo, ProductsFilter } from 'types/e-commerce';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }: { theme: Theme; open: boolean; container: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: -drawerWidth,
    ...(container && {
      [theme.breakpoints.only('lg')]: {
        marginLeft: !open ? -240 : 0
      }
    }),
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

// ==============================|| ECOMMERCE - PRODUCTS ||============================== //

const ProductsPage = () => {
  const theme = useTheme();

  // product data
  const { productsLoading, products } = useGetProducts();

  const { cart } = useGetCart();
  const { container } = useConfig();

  useEffect(() => {
    // clear cart if complete order
    if (cart && cart.step > 2) {
      resetCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  // filter
  const initialState: ProductsFilter = {
    search: '',
    sort: 'low',
    gender: [],
    categories: ['all'],
    colors: [],
    price: '',
    rating: 0
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = () => {
    productFilter(filter);
  };

  useEffect(() => {
    if (!productsLoading) {
      filterData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  let productResult: ReactElement | ReactElement[] = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
      <SkeletonProductPlaceholder />
    </Grid>
  ));
  if (!productsLoading && products && products.length > 0) {
    productResult = products.map((product: ProductsTypo, index) => (
      <Grid key={index} item xs={12} sm={6} md={4}>
        <ProductCard
          id={product.id}
          image={product.image}
          name={product.name}
          brand={product.brand}
          offer={product.offer}
          isStock={product.isStock}
          description={product.description}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
          color={product.colors ? product.colors[0] : undefined}
          open={openFilterDrawer}
        />
      </Grid>
    ));
  } else if (!productsLoading && products && products.length === 0) {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ProductEmpty handelFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        initialState={initialState}
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {productResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
      <FloatingCart />
    </Box>
  );
};

export default ProductsPage;
*/