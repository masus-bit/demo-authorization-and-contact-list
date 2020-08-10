import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Operations } from "../../reducer/reducer";
import { store } from "../../index.js";
const AuthForm = (props) => {
  const { isAuth, submitHandler } = props;

  return isAuth === true ? (
    <Redirect to="/contacts"></Redirect>
  ) : (
    <Fragment>
      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            const email = evt.target.querySelector(`#user-email`).value;
            const password = evt.target.querySelector(`#user-password`).value;
            submitHandler(email, password);
          }}
        >
          <h1 className="sign-in__title">MEMBER LOGIN</h1>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address - test@test.com
              </label>
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
            </div>
            <div className="sign-in__field">
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password - test
              </label>
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    contacts: state.allContacts,
    isAuth: state.isAuth,
  });
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (email, password) => {
      dispatch(Operations.login(email, password));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
