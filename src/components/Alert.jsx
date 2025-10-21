// src/components/Alert.jsx


import React, { Component } from 'react';


class Alert extends Component {
 constructor(props) {
   super(props);
   this.color = null;
   this.bgColor = null;
 }


 getStyle = () => {
   return {
     color: this.color,
     backgroundColor: this.bgColor,
     borderWidth: "2px",
     borderStyle: "solid",
     fontWeight: "bolder",
     borderRadius: "7px",
     borderColor: this.color,
     textAlign: "center",
     fontSize: "12px",
     margin: "10px 0",
     padding: "10px"
   };
 }


 render() {
   return (
     <div className="Alert">
       <p style={this.getStyle()}>{this.props.text}</p>
     </div>
   );
 }
}

class InfoAlert extends Alert {
 constructor(props) {
   super(props);
   this.color = 'rgba(170, 37, 206, 1)'; // blue
   this.bgColor = 'rgb(220, 220, 255)'; // light blue
 }
}

class ErrorAlert extends Alert {
 constructor(props) {
   super(props);
   this.color = 'rgba(222, 20, 20, 1)'; // red
   this.bgColor = 'rgba(255, 220, 220, 1)'; // light red
 }
}

class WarningAlert extends Alert {
 constructor(props) {
   super(props);
   this.color = 'rgba(240, 113, 39, 1)'; // orange
   this.bgColor = 'rgba(255, 233, 220, 1)'; // light orange
 }
}

export { InfoAlert, ErrorAlert, WarningAlert };