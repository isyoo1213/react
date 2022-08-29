import React, { useState } from "react";

const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id)=>{}
});

export const ProductsContextProvider = (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ])

  const toggleFavorite = (productId) => {
    setProductsList((currentProductList)=>{
      const productIndex = currentProductList.findIndex(
        product => product.id === productId
      );
      const newFavStatus = !currentProductList[productIndex].isFavorite;
      const updatedProducts = [...currentProductList];
      updatedProducts[productIndex] = {
        ...currentProductList[productIndex],
        isFavorite: newFavStatus
      }
      //하드코딩을 피하는 이유는..? + 구조분해할당시 ... 문법을 통해 깊은복사 + 새로운 값 할당하는 부분 확인
  
  
      return updatedProducts;
    })
    //가장 최근의 state로 작업하기 위해 함수형으로 작성
  }

  return (
    <ProductsContext.Provider value={{ products: productsList, toggleFav:toggleFavorite }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
