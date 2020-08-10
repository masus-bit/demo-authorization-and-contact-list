import React, { Fragment, PureComponent } from "react";

import { connect } from "react-redux";

export class Contact extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
    this.onEdit = () => {
      this.setState({
        edit: true,
      });
    };
  }

  render() {
    const { item, contacts, onSave, onDeleteClick, number } = this.props;

    return (
      <Fragment>
        <li className="contacts-item">
          <div className="contact">
            {this.state.edit ? (
              <div className="contact">
                <form
                  action=""
                  className="contact-edit"
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    const name = evt.target.querySelector(`#input-name`).value;
                    const phone = evt.target.querySelector(`#input-phone`)
                      .value;
                    onSave(item, name, phone, item.id, contacts);
                    this.setState({
                      edit: false,
                    });
                  }}
                >
                  <div className="contacts-item--n contacts-item--num">
                    {number + 1}
                  </div>
                  <input
                    className="input-name input-name--edit "
                    id="input-name"
                    type="text"
                    placeholder={item.name}
                    defaultValue={item.name}
                  />
                  <input
                    className="input-phone input-phone--edit "
                    id="input-phone"
                    type="number"
                    placeholder={item.phone}
                    defaultValue={item.phone}
                  />
                  <button className="save-btn save-btn--edit">SAVE</button>
                </form>
              </div>
            ) : (
              <div className="contact">
                <div className="contacts-item--n">{number + 1}</div>
                <div className="contacts-item--name">{item.name}</div>
                <div className="contacts-item--phone">{item.phone}</div>
              </div>
            )}
            <button className="edit-btn" onClick={this.onEdit}>
              EDIT
            </button>
            <button
              className="delete-btn"
              onClick={(evt) => {
                evt.target.textContent = `DELETED`;
                onDeleteClick(item, contacts);
              }}
            >
              DELETE
            </button>
          </div>
        </li>
      </Fragment>
    );
  }
}
