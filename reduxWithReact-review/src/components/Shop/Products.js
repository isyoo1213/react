import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 1000,
    title: "기본 꽈배기",
    description: "맛있는 못난이 기본 꽈배기",
  },
  {
    id: "p2",
    price: 1500,
    title: "단팥 꽈배기",
    description: "맛있는 못난이 단팥 꽈배기",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
