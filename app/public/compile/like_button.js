'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    // return (
    //     <h1>Hello, world</h1>
    // );
    return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
      );
  }
}
// 
// const domContainer = document.querySelector('#like_button_container');
// const root = ReactDOM.createRoot(domContainer);
// const LikeButton = <h1>Hello, world</h1>;
// root.render(LikeButton);

// const domContainer = document.querySelector('#like_button_container');
const domContainer = document.querySelectorAll('.bpChart');
// const LikeButton = <h1>Hello, world</h1>;
domContainer.forEach(i => {
    const root = ReactDOM.createRoot(i);
    root.render(e(LikeButton));
})