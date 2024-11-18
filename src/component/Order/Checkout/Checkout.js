import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Form, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import LoadSpinner from './../../spinner/LoadSpinner';
import './Checkout.css';
import { reset } from '../../redux/ActionCreator';

const mapStateToProps = state => {

    return {
        Ingredients: state.Ingredients,
        totalPrice: state.totalPrice,
        purchaseAble: state.purchaseAble,
        token: state.token,
        userId: state.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reset: () => dispatch(reset())
    }
}

const Checkout = ({ Ingredients, totalPrice, purchaseAble, reset ,token , userId }) => {


    const [values, setValues] = useState({
        deliveryAddress: '',
        phone: '',
        Price: totalPrice,
        paymentOption: 'Cash On Delivery',
    })

    const [isLoading, setisLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, isModalMsg] = useState('');
    const navigate = useNavigate()

    const goBack = (event) => {
        event.preventDefault();
        navigate(-1)
    }
    const handleChange = (event) => {

        setValues({
            ...values,
            [event.target.name]: [event.target.value]
        })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setisLoading(true)
        const orders = {
            Ingredients: Ingredients,
            Customer: values,
            Date: new Date(),
            token:token ,
            userId:userId,
        };

        axios.post("https://react-dc1a3-default-rtdb.firebaseio.com/orders.json?auth=" + token, orders)
            .then(response => {
                if (response.status === 200) {
                    setisLoading(false)
                    setModalOpen(true)
                    isModalMsg('Thank you for purchasing!!')
                    reset();
                }

                else {
                    setisLoading(false)
                    setModalOpen(true)
                    isModalMsg('Please try again!!')
                }
            })
            .catch(error => {
                setisLoading(false)
                setModalOpen(true)
                isModalMsg('Please try again!!')
            })

    }

    return (
        <div>
            {isLoading ? <LoadSpinner /> : (
                <Card>
                    <CardHeader>
                        <h3 style={{ marginTop: 20, marginBottom: 20 }}>Price : {totalPrice} bdt</h3>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <label className='form-label'>
                                <b style={{ fontSize: 20 }}>Your Address</b>
                            </label>
                            <textarea
                                className='form-control'
                                name='deliveryAddress'
                                placeholder='Your address please'
                                value={values.deliveryAddress} onChange={handleChange}
                            />
                            <br />
                            <label className='form-label'>
                                <b style={{ fontSize: 20 }}>Your Phone Number</b>
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                name='phone'
                                placeholder='Your phone number'
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <br />
                            <label className='form-label'>
                                <b style={{ fontSize: 20 }}>Payment</b>
                            </label>
                            <select className='form-control' name='paymentOption' value={values.paymentOption} onChange={handleChange}>
                                <option>Cash On Delivery</option>
                                <option>Bkash</option>
                            </select>
                            <br />
                            <div className="d-flex justify-content-end buttons">
                                <button className='btn btn-success' type="submit" style={{ marginRight: 10 }} disabled={!purchaseAble}>Checkout</button>
                                <button className='btn btn-danger' type="button" onClick={goBack}>Cancel</button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            )}

            <Modal onClick={goBack} isOpen={modalOpen}>
                <ModalHeader>
                    update
                </ModalHeader>
                <ModalBody>
                    {modalMsg}
                </ModalBody>
            </Modal>
        </div>
    );
};



export default connect(mapStateToProps, mapDispatchToProps)(Checkout)