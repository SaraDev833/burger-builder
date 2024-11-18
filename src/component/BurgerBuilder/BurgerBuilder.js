
import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Ingredient from './Ingredient/Ingredient'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Control from './control/Control'
import Summary from './summary/Summary';
import { Navigate } from 'react-router-dom';
import Checkout from '../Order/Checkout/Checkout';
import { connect } from 'react-redux';
import { add_item, remove_item, updatePurchaseAble } from '../redux/ActionCreator'


const mapStatetoPorps = state => {
  return {
    Ingredients: state.Ingredients,
    totalPrice:state.totalPrice , 
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add_item: (igtype) => dispatch(add_item(igtype)),
    remove_item: (igType) => dispatch(remove_item(igType)),
    updatePurchaseAble: () => dispatch(updatePurchaseAble()),
  }
}

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
    redirect: false,
  }
  addedItem = type => {
    this.props.add_item(type);
    this.props.updatePurchaseAble();
  }
  removeItem = type => {
    this.props.remove_item(type)
    this.props.updatePurchaseAble();
  }

  toggole = () => {

    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }))
  }

  handleCheckout = () => {
    this.setState({
      redirect: true,
    })
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to='/checkout' />;
    }
    return (
      <div className='container'>
        <div style={{ marginBottom: 100, marginTop: 100 }}>
          <Burger ingredients={this.props.Ingredients} />
          <Control addedItem={this.addedItem} removeItem={this.removeItem} price={this.props.totalPrice} isToggole={this.toggole} purchaseAble={this.props.updatePurchaseAble} />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader><h2>Your Order Information</h2></ModalHeader>
          <ModalBody>
            <Summary ingredients={this.props.Ingredients} />
            price:{this.props.totalPrice}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-success' onClick={this.handleCheckout}>Checkout</button>
            <button className='btn btn-danger' onClick={this.toggole}>Close</button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStatetoPorps, mapDispatchToProps)(BurgerBuilder)