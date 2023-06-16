import { Component } from "react";

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // You can handle the error here, e.g., log the error to an error tracking service
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
