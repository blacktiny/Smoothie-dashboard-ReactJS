/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";

import "./Experiments.scss";

import Template from "../../components/Template/Template";
import TemplateD from "../../components/TemplateD/TemplateD";
import Experiments_list from "./Experiments_list";

class Experiments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      approve_count: 3,
      recipe_count: 0,
      recipe_list: []
    };
  }

  onTemplateClicked = title => {
    var recipe_list = this.state.recipe_list.slice();

    var index = recipe_list.indexOf(title);
    if (index !== -1) {
      recipe_list.splice(index, 1);
    } else {
      recipe_list.push(title);
    }

    this.setState({ recipe_list: recipe_list });
  };

  render() {
    const { approve_count } = this.state;
    const { recipe_list } = this.state;
    const recipe_count = recipe_list.length;

    let recipe_output;

    if (approve_count > 0) {
      recipe_output = (
        <div className="list-section-content">
          {Experiments_list.map((prop, key) => {
            return (
              <Template
                onClick={() => this.onTemplateClicked(prop.content.title)}
                key={key}
                content={prop.content}
              />
            );
          })}
        </div>
      );
    } else {
      recipe_output = (
        <div className="blank">
          <img src={require("../../assets/images/blank-template.png")} alt="" />
        </div>
      );
    }
    return (
      <div className="experiment">
        <div className="experiment-approved">
          <div className="experiment-approved-content">
            <div className="welcome">
              <h1 className="text">Welcome to Smoothie !</h1>
            </div>
            <div className="list-section">
              <h4 className="text">
                You currently have{" "}
                <span className="number">{approve_count}</span> approved growth
                Experiments 😊{" "}
              </h4>
              {recipe_output}
            </div>
          </div>
          <div className="experiment-approved-recipe">
            <div className="recipes">
              <p className="recipes-hello">Hello 👋 !</p>
              <h5 className="recipes-title">
                You’ve selected <span className="number">({recipe_count})</span>{" "}
                growth experiments.
              </h5>
              <ul className="recipes-list add-scroll">
                {recipe_list.map((recipe, key) => {
                  return <li className="recipes-list-item" key={key}>{recipe}</li>;
                })}
              </ul>
              <p className="recipes-total">
                TOTAL : <span className="number">({recipe_count})</span>
              </p>
              <span className="recipes-separator" />
              <p className="recipes-success">Thank you ! 🥐</p>
              <form className="recipes-form">
                <button
                  type="button"
                  className="btn-checkout"
                  // onClick={() => this.handleRequest()}
                  disabled={recipe_count < 1}
                >
                  Checkout
                </button>
              </form>
              <img className="recipes-letter" src={require("../../assets/images/recipes/letter.png")} alt="letter" />
            </div>
          </div>
        </div>
        <div className="experiment-all-list">
          <h1 className="text">Growth experiments</h1>
          <div className="list-content">
            {Experiments_list.map((prop, key) => {
              return <TemplateD key={key} content={prop.content} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Experiments;
