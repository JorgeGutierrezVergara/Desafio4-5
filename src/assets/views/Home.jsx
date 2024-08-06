import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { CounterContext } from "../context/CounterContext";

const Home = () => {
  const { carrito, setCarrito } = useContext(CounterContext);

  const [pizzalist, setPizzaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const irAPizza = (pizzaName) => {
    navigate(`/pizza/${pizzaName}`);
  };

  const anadirACarrito = (pizzaName) => {
    const updatedCarrito = carrito.map((pair) => {
      if (pair[0] === pizzaName) {
        return [pair[0], pair[1] + 1];
      }
      return pair;
    });

    setCarrito(updatedCarrito);
  };

  const getPizzas = async () => {
    const url = "/pizzas.json";
    const response = await fetch(url);
    const data = await response.json();
    setPizzaList(data);
    setLoading(false);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/030/674/802/large_2x/product-shots-of-pizza-high-quality-4k-ultra-hd-free-photo.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
            zIndex: 0,
          }}
        ></div>
        <h1 style={{ position: "relative", zIndex: 1 }}>
          ¡Pizzeria Mamma Mia!
        </h1>
        <h3
          style={{
            width: "75%",
            paddingBottom: "25px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            borderBottom: "1px solid grey",
          }}
        >
          Las mejores pizzas
        </h3>
      </div>
      <div style={{ display: "flex", margin: "40px" }}>
        <Row
          xs={1}
          md={2}
          className="g-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {pizzalist.map((pizza) => (
            <Card
              bg="dark"
              text="white"
              style={{
                width: "18rem",
                padding: "0",
                margin: "10px",
              }}
            >
              <Card.Img
                variant="top"
                src={pizza.img}
                style={{
                  opacity: 0.5,
                }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    borderBottom: "1px solid grey",
                    paddingBottom: "15px",
                  }}
                >
                  {pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}
                </Card.Title>
                <Card.Text
                  style={{
                    borderBottom: "1px solid grey",
                    paddingBottom: "15px",
                  }}
                >
                  Ingredientes:
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      🍕
                      {pizza.ingredients[0].charAt(0).toUpperCase() +
                        pizza.ingredients[0].slice(1)}
                    </li>
                    <li>
                      🍕{" "}
                      {pizza.ingredients[1].charAt(0).toUpperCase() +
                        pizza.ingredients[1].slice(1)}
                    </li>
                    <li>
                      🍕{" "}
                      {pizza.ingredients[2].charAt(0).toUpperCase() +
                        pizza.ingredients[2].slice(1)}
                    </li>
                    <li>
                      🍕{" "}
                      {pizza.ingredients[3].charAt(0).toUpperCase() +
                        pizza.ingredients[3].slice(1)}
                    </li>
                  </ul>
                </Card.Text>
                <Card.Footer
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Card.Text style={{ fontSize: "30px" }}>
                    ${pizza.price}
                  </Card.Text>
                  <div>
                    <Button
                      onClick={() => irAPizza(pizza.name)}
                      variant="primary"
                      style={{ marginRight: "6px" }}
                    >
                      Ver más 👀
                    </Button>
                    <Button
                      onClick={() => anadirACarrito(pizza.name)}
                      variant="success"
                      style={{ marginLeft: "6px" }}
                    >
                      Añadir 🛒
                    </Button>
                  </div>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
