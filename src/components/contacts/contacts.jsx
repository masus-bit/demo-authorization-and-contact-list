import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Contact } from "../contact-item/contact.jsx";
import { store } from "../../index.js";
import { Operations, ActionCreator } from "../../reducer/reducer.js";

export class Contacts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
      isFocused: false,
    };
    (this.onAddClick = () => {
      this.setState({
        isAdd: true,
      });
    }),
      (this.onFocus = () => {
        this.setState({
          isFocused: true,
        });
      });
  }

  render() {
    const {
      isAuth,
      contacts,
      onSave,
      onDeleteClick,
      onSaveAddClick,
      data,
      onInputChange,
    } = this.props;
    const typeOfData = () => {
      if (this.state.isFocused === true) {
        return data;
      } else {
        return contacts;
      }
    };
    return isAuth === false ? (
      <Redirect to="/"></Redirect>
    ) : (
      <Fragment>
        <div className="contacts">
          <div className="contacts-board">
            <ul className="contacts-list">
              <div className="search-container">
                <form action="#" className="search-form">
                  <input
                    type="text"
                    className="search-by-name"
                    id="search-by-name"
                    onChange={(evt) => {
                      if (evt.target.value.length > 0) {
                        this.setState({
                          isFocused: true,
                        });
                      } else {
                        this.setState({
                          isFocused: false,
                        });
                      }
                      const value = evt.target.value;
                      onInputChange(value, contacts);
                    }}
                    placeholder="Name"
                  />
                </form>
              </div>
              <button className="add" onClick={this.onAddClick}>
                ADD CONTACT
              </button>
              {this.state.isAdd === false ? (
                <div className="empty"></div>
              ) : (
                <form
                  className="add-contact"
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    const name = evt.target.querySelector(`#input-name`).value;
                    const phone = evt.target.querySelector(`#input-phone`)
                      .value;
                    onSaveAddClick(contacts.length + 1, name, phone, contacts);
                    this.setState({
                      isAdd: false,
                    });
                  }}
                >
                  <input
                    className="input-name"
                    id="input-name"
                    type="text"
                    placeholder="name"
                  />
                  <input
                    className="input-phone"
                    id="input-phone"
                    type="number"
                    placeholder="phone"
                  />
                  <button type="submit" className="add-save-btn">
                    SAVE
                  </button>
                </form>
              )}
              {typeOfData().map((item, index) => (
                <Contact
                  number={index}
                  key={item.id}
                  item={item}
                  contacts={contacts}
                  onSave={onSave}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuth: state.isAuth,
    contacts: state.allContacts,
    data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (contact, name, phone, id, contacts) => {
      store.dispatch(Operations.saveChanges(contact, name, phone));
      dispatch(ActionCreator.saveStoreChanges(id, name, phone, contacts));
    },
    onDeleteClick: (contact, contacts) => {
      store.dispatch(Operations.deleteContact(contact));
      dispatch(ActionCreator.deleteStoreContact(contact, contacts));
    },
    onSaveAddClick: (id, name, phone, contacts) => {
      store.dispatch(Operations.addContact(id, name, phone, contacts));
      dispatch(ActionCreator.addStoreContact(id, name, phone, contacts));
    },
    onInputChange: (inputValue, contacts) => {
      dispatch(ActionCreator.search(inputValue, contacts));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
