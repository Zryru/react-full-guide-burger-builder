import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  constructor(props) {
    super(props);
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', 1]
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.state = {
      ingredients: ingredients,
      totalPrice: price
    };
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.url + "/contact-data"}
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            ></ContactData>
          )}
          //   component={ContactData}
        ></Route>
      </div>
    );
  }
}

export default Checkout;
