import getStripe from "@/utils/getStripe";
import products from "../products.json";

const Product = ({ product }: any) => {
  const handleClick = async (event: any) => {
    event.preventDefault();

    const stripe = await getStripe();

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="product bg-white rounded overflow-hidden shadow-lg m-6 flex flex-col">
      <div className="flex-grow">
        <img
          className="w-full object-cover h-72 w-80"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base text-center">{product.name}</p>
        <p className="text-gray-500 text-base text-center">
          {product.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex-grow-0">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: {(product.price / 100).toFixed(2)}{" "}
          {product.currency.toUpperCase()}
        </span>
        <button
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          role="link"
          onClick={handleClick}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center items-stretch">
      <div id="signInDiv"></div>
      {products.products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
