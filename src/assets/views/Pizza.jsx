import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CounterContext } from "../context/CounterContext";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState([]);
  const [loading, setLoading] = useState(true);
  const { carrito, setCarrito } = useContext(CounterContext);

  const getPizza = async () => {
    const url = "/pizzas.json";
    const response = await fetch(url);
    const pizzas = await response.json();
    const pizza = pizzas.filter((pizza) => pizza.name === id)[0];
    setPizza(pizza);
    setLoading(false);
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

  useEffect(() => {
    getPizza();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundImage: `url(${pizza.img})`,
            height: "450px",
            backgroundSize: "cover",
            width: "450px",
          }}
        ></div>
        <Card
          bg="dark"
          text="white"
          style={{ height: "450px", width: "550px" }}
        >
          <Card.Body>
            <Card.Title
              style={{
                borderBottom: "1px solid grey",
                paddingBottom: "15px",
              }}
            >
              {pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}
            </Card.Title>
            <Card.Text>
              <p>{pizza.desc}</p>
              <h6>Ingredientes:</h6>
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
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h3>${pizza.price}</h3>
              <Button
                onClick={() => anadirACarrito(pizza.name)}
                variant="success"
                style={{}}
              >
                Añadir 🛒
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default Pizza;
