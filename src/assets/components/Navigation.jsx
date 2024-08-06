import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { CounterContext } from "../context/CounterContext";

export default function Navigation() {
  const { total, setTotal } = useContext(CounterContext);
  return (
    <div>
      <Navbar className="bg-dark navbar-dark">
        <Container>
          <NavLink to="/Home" className="navbar-brand">
            🍕 Pizzeria Mamma Mia!
          </NavLink>
          <div className="justify-content-end">
            <NavLink to="/Carrito" style={{ paddingRight: "30px" }}>
              🛒$ {total}
            </NavLink>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
