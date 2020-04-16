import React from "react";
import { Container} from "semantic-ui-react";
import "./style.css";
import ParticlesBg from 'particles-bg'


export default function GFGContainer(props) { 
 return (
    <Container className="gfgContainer" {...props}>
      {" "}
      {props.children}
    </Container>
  );
}
