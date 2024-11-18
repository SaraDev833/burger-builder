import React, { useEffect, useState } from 'react'
import { fetchOrders, OrderError } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import Order from './Order';
import { LoadOrders } from './../redux/ActionCreator';
import LoadSpinner from './../spinner/LoadSpinner';



const mapStateToProps = state => {
  return {
    orders: state.orders,
    LoadOrders: state.LoadOrders,
    OrderError: state.OrderError,
    token: state.token,
    userId :state.userId
  }

}
 const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token , userId) => dispatch(fetchOrders(token , userId)),
  }
}

const Orders = ({ orders, LoadOrders, fetchOrders ,OrderError ,token , userId}) => {
//  const [spinner , setspinner] = useState(false)

  
  useEffect(() => {
    fetchOrders(token , userId);
  }, [fetchOrders]);

  let OrderContent = null;

  if (OrderError) {
    OrderContent = <p>Sorry, Failed to load your orders !!</p>
  }

  else {
    if (orders.length === 0) {
      OrderContent = <p>Sorry, no order found!!</p>
    }
    else {
      OrderContent = orders.map(item => (
        <Order key={item.id} order={item} /> // Use the Order component to display each order
    ));
    }
  }
      let values = (   <div>
        <h2 style={{marginTop: 20 , marginBottom:20}}>Your Orders</h2>
           {OrderContent}
      </div>)
  return (
    <span>
          {LoadOrders? <LoadSpinner/> : values}
          </span>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
