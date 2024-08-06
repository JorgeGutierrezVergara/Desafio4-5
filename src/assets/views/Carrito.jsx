import { CounterContext } from "../context/CounterContext";
import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CounterContext);
  const { total, setTotal } = useContext(CounterContext);
  const [pizzalist, setPizzaList] = useState([]);

  const getPizzas = async () => {
    const url = "/pizzas.json";
    const response = await fetch(url);
    const data = await response.json();
    setPizzaList(data);
  };

  const sumarPizza = (pizza) => {
    const updatedCarrito = carrito.map((pair) => {
      if (pair[0] === pizza) {
        return [pair[0], pair[1] + 1];
      }
      return pair;
    });

    setCarrito(updatedCarrito);
  };

  const restarPizza = (pizza) => {
    const updatedCarrito = carrito.map((pair) => {
      if (pair[0] === pizza && pair[1] > 0) {
        return [pair[0], pair[1] - 1];
      }
      return pair;
    });

    setCarrito(updatedCarrito);
  };

  const calcularTotal = () => {
    const total = carrito.reduce((total, pizza) => {
      const pizzaData = pizzalist.find((el) => el.name === pizza[0]);
      return pizzaData ? total + pizzaData.price * pizza[1] : total;
    }, 0);
    setTotal(total);
    return total;
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80vh",
          alignItems: "center",
        }}
      >
        <Card bg="dark" text="light" style={{ width: "700px" }}>
          <h4>Detalle del pedido</h4>
          <ListGroup variant="flush">
            {carrito.map((pizza) => {
              if (pizza[1] !== 0) {
                const pizzaData = pizzalist.find((el) => el.name === pizza[0]);
                return (
                  <ListGroup.Item
                    className="bg-dark text-light"
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={pizza[0]}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {pizzaData ? (
                        <img
                          style={{ width: "70px", paddingRight: "10px" }}
                          src={pizzaData.img}
                          alt={pizza[0]}
                        />
                      ) : (
                        ""
                      )}
                      <p style={{ margin: "0", padding: "0" }}> {pizza[0]}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ margin: "0", padding: "10px" }}>
                        ${pizzaData ? pizzaData.price * pizza[1] : ""}
                      </p>
                      <Button
                        onClick={() => restarPizza(pizza[0])}
                        variant="danger"
                      >
                        -
                      </Button>
                      <p style={{ margin: "0", padding: "10px" }}>{pizza[1]}</p>
                      <Button
                        onClick={() => sumarPizza(pizza[0])}
                        variant="primary"
                      >
                        +
                      </Button>
                    </div>
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
          <div style={{ marginTop: "20px" }}>
            <h4>Total a pagar: ${calcularTotal()}</h4>
            <Button variant="success">Ir a pagar</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Carrito;
