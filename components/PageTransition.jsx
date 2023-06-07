import { createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const PageTransition = ({ route, children }) => {
  const nodeRef = createRef();
  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={route}
          nodeRef={nodeRef}
          classNames='page'
          timeout={300}>
          <div ref={nodeRef} className='transition-component'>
            {children}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};
