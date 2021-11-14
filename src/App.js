import "./App.css";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChatSquareQuoteFill } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    quotes: [],
    num: Math.floor(Math.random() * 103),
  };
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then((res) =>
        this.setState(() => ({
          quotes: res.quotes,
        }))
      );
  }

  render() {
    return this.state.quotes[this.state.num] !== undefined ? (
      <div>
        <Card id="quote-box">
          <Card.Header>Quote</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <ChatSquareQuoteFill />
              <p id="text">{this.state.quotes[this.state.num].quote}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title" id="author">
                  {this.state.quotes[this.state.num].author}
                </cite>
              </footer>
            </blockquote>
          </Card.Body>

          <a
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
              '"' +
                this.state.quotes[this.state.num].quote +
                '" ' +
                this.state.quotes[this.state.num].author
            )}`}
            rel="noreferrer"
          >
            <Button style={{ backgroundColor: "#55ACEE" }}>
              <Twitter />
            </Button>
          </a>

          <Button
            onClick={() => {
              this.setState(() => ({ num: Math.floor(Math.random() * 103) }));
            }}
            variant="danger"
            id="new-quote"
          >
            Next
          </Button>
        </Card>
      </div>
    ) : (
      <div></div>
    );
  }
}
