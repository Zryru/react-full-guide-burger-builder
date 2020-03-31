import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../axios-orders";
import withErrorHandler from "../../hoc/Layout/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    Axios.get("/orders.json")
      .then(res => {
        console.log("[Orders]", res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders = <Spinner></Spinner>;
    if (this.state.orders.length > 0) {
      orders = this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        ></Order>
      ));
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, Axios);
