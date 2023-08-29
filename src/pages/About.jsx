import React from "react";
import '../styles/About.scss'

const About = () => {
  return (
    <div className="about">
      <div>
        Hello, this program will help you to easily convert the simplified
        template syntax to full HTML. The program takes the two from one window,
        and then generate HTML display in the second window, according to the to
        the given syntax.
      </div>
      <h4>
        The user enters the input syntax in the format .class{">"}
        element#id,where:
      </h4>
      <ul>
        <li><span>.class</span> - represents class of element</li>
        <li><span>{">"}</span> - level of investment</li>
        <li><span>element</span> - represents name of HTML element</li>
        <li><span>#id</span> - represents element identifier</li>
      </ul>
    </div>
  );
};

export default About;
