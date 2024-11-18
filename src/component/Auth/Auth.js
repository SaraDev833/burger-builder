import React, { useState } from 'react'
import { Formik } from 'formik'
import { auth, AuthFailed, } from '../redux/AuthActionCreator'
import { connect } from 'react-redux'
import { Alert, } from 'reactstrap'
import LoadSpinner from '../spinner/LoadSpinner'

const mapDispatchToProps = dispatch => ({
  auth: (email, password, mode) => dispatch(auth(email, password, mode))
})


const mapStateToProps = state => {
  return {
    AuthLoading: state.AuthLoading,
    AuthFailed: state.AuthFailed,
  }
}
const Auth = ({ auth, AuthLoading, AuthFailed }) => {

  console.log('AuthFailed', AuthFailed)
  const [mode, setmode] = useState('Signup')

  let changeMode = (event) => {
    event.preventDefault();
    setmode(
      mode === "Signup" ? 'Login' : 'Signup'
    )
  }
  let error = null;
  if (AuthFailed !== null) {
    error = <Alert className='alert alert-danger'>{AuthFailed}</Alert>
  }

  return (

    <div>
    {error}
      {AuthLoading ? (
        <LoadSpinner />
      ) : 
      (
        <Formik
      
          initialValues={
            {
              email: "",
              password: "",
              confirmPassword: ""
            }
          }
          
          onSubmit={(values) => {
            auth(values.email, values.password, mode)
          }}

          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "required"
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'invalid email address'
            }
            if (!values.password) {
              errors.password = 'required'
            }
            else if (values.password.length < 8) {
              errors.password = 'passoword must be in 8 characters'
            }
            if (mode === "Signup") {
              if (!values.confirmPassword) {
                errors.confirmPassword = 'required'
              }
              else if (values.password !== values.confirmPassword) {
                errors.password = 'password did not match'
              }
            }
            console.log(errors)
            return errors;

          }}
        >

          {({ values, handleChange, handleSubmit, errors }) => (
            <div className='d-flex justify-content-center ' style={{ alignItems: "center", height: '100vh' }}>

              <form onSubmit={handleSubmit} style={{ width: 500, border: '1px solid gray', padding: 20, borderRadius: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <button onClick={changeMode} style={{ width: '100%', background: 'gray', color: 'white', marginBottom: 20, border: 'transparent', paddingTop: 5, paddingBottom: 5 }}>Switch to {mode === 'Signup' ? 'Login' : 'Signup'}</button>
                <label className='form-label'>Enter your email</label>
                <input name='email' placeholder='enter your email' className='form-control' onChange={handleChange} value={values.email} />
                <span style={{ color: 'red', fontSize: 13, fontWeight: 500 }}>{errors.email}</span>
                <br />
                <label className='form-label'>Enter your password</label>
                <input name='password' placeholder='enter your password' className='form-control' onChange={handleChange} value={values.password} />
                <span style={{ color: 'red', fontSize: 13, fontWeight: 500 }}>{errors.password}</span>
                <br />

                {mode === 'Signup' && (
                  <>

                    <label className='form-label'>Confirm your password</label>
                    <input name='confirmPassword' placeholder='Confirm your password' className='form-control' onChange={handleChange} value={values.confirmPassword} />
                    <span style={{ color: 'red', fontSize: 13, fontWeight: 500 }}>{errors.confirmPassword}</span>
                    <br />
                  </>
                )}


                <button type="submit" className='btn btn-secondary' >
                  {mode === "Signup" ? 'Signup' : 'Login'}
                </button>
                <br />

              </form>
            </div>
          )}

        </Formik>
      )}

    </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)