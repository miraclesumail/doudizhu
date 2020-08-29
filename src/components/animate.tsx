import React, { Component, createRef } from "react";
import anime, { AnimeParams } from "animejs";

function animateComp(attributes: AnimeParams, Cmp: React.ComponentType<any>) {
  class Wrapped extends Component<any, any> {
    constructor(props: any) {
      super(props);
    }

    componentDidMount() {
      console.log(this.props);
      const { forwardedRef } = this.props;
      if (forwardedRef) {
        anime({
          targets: forwardedRef.current,
          ...attributes
        });
      }
    }

    public render() {
      const { forwardedRef, ...rest } = this.props;
      return <Cmp {...rest} ref={forwardedRef} />;
    }
  }

  return React.forwardRef((props, ref) => (
    <Wrapped {...props} forwardedRef={ref} />
  ));
}

export default animateComp;
