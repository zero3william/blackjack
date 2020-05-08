import * as React from "react";
import { PixiComponent } from "./Pixi";
import Modal from "./Modal/Modal";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  openModal() {
    this.setState({ show: true });
  }
  closeModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <PixiComponent action={this.props.data.increment} />
        <Modal
          show={this.state.show}
          close={() => {
            this.closeModal();
          }}
        >
          <p>Rect: {this.props.data.counter.rect}</p>
          <p>Ellipse: {this.props.data.counter.ellipse}</p>
          <p>Star: {this.props.data.counter.star}</p>
        </Modal>
        <button onClick={() => this.openModal()}>Show Statistics</button>
      </div>
    );
  }
}

export default Demo;
