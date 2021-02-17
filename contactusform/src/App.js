import React, { Component } from "react";
import './App.css';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      messageCategory: null,
      message: null,
      image: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        messageCategory: "",
        message: "",
        image: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        messageCategory: ${this.state.messageCategory}
        message: ${this.state.message}
        image: ${this.state.image}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    console.log("Name: ", name);
    console.log("Value: ", value);

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "Поле 'Фамилия' или поле 'Имя' должно быть заполнено" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? "Поле 'Фамилия' или поле 'Имя' должно быть заполнено" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) && value.length > 0
          ? ""
          : "Введите корректный адрес электронной почты";
        break;
      case "messageCategory":
        formErrors.messageCategory =
          value.length === "default" ? "Введите категорию сообщения" : "";
        break;
        case "message":
          formErrors.message =
            value.length < 10 ? "Сообщение должно содержать не менее 10-ти символов" : "";
          break;
          case "image":
            formErrors.image =
              value.length < 6 ? "Неправильный формат или размер" : "";
            break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Форма обратной связи</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">Имя</label>
            <input type="text" className={formErrors.firstName.length > 0 ? "error" : null} placeholder="Имя" name="firstName" noValidate
                onChange={this.handleChange}/>
            {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Фамилия</label>
            <input type="text" className={formErrors.lastName.length > 0 ? "error" : null} placeholder="Фамилия" name="lastName" noValidate
                onChange={this.handleChange}/>
          {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="email" className={formErrors.email.length > 0 ? "error" : null} placeholder="Email" name="email" noValidate
                onChange={this.handleChange}/>
          {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
          </div>
          <div className="messageCategory">
            <label htmlFor="messageCategory">Категория сообщения</label>
            <select className="" name="messageCategory">
              <option value="default" selected>Выберите категорию</option>
              <option value="criticism">Критика</option>
              <option value="wish">Пожелание</option>
              <option value="question">Вопрос</option>
            </select>
          </div>
          <div className="image">
            <label htmlFor="image">Картинка (jpg, png, до 2 Мб)</label>
            <button type="button" name="image">Загрузить</button>
          </div>
          <div className="message">
            <label htmlFor="message">Сообщение</label>
            <textarea rows="10" cols="30" className={formErrors.email.length > 0 ? "error" : null} placeholder="Сообщение" name="message" noValidate
                  onChange={this.handleChange}/>
            {formErrors.message.length > 0 && (
                <span className="errorMessage">{formErrors.message}</span>
              )}
          </div>
          <div className="send">
            <button type="submit">Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
}

export default App;
