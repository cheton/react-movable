import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IBaseItemProps } from './List';

interface IBaseRenderProps {
  ref: React.RefObject<any>;
  style: React.CSSProperties;
}

interface IItemRenderProps extends IBaseRenderProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

interface IItemProps extends IBaseItemProps {
  render: (itemProps: IItemRenderProps) => React.ReactNode;
  renderGhost: (itemProps: IBaseRenderProps) => React.ReactNode;
}

class Item extends React.Component<IItemProps> {
  ghostRef = React.createRef<HTMLElement>();
  itemRef = React.createRef<HTMLElement>();
  componentDidMount() {
    this.props.setItemRef(this.itemRef, this.props.index);
  }
  componentDidUpdate(prevProps: IItemProps) {
    if (this.props.isDragged && !prevProps.isDragged) {
      this.props.setGhostRef(this.ghostRef);
    }
  }
  render() {
    const baseRenderProps = {
      style: {
        userDrag: 'none',
        userSelect: 'none',
        boxSizing: 'border-box'
      } as React.CSSProperties
    };
    const renderItemProps = {
      ...baseRenderProps,
      style: {
        ...baseRenderProps.style,
        visibility: this.props.isDragged ? 'hidden' : undefined
      } as React.CSSProperties,
      ref: this.itemRef,
      onMouseDown: (e: React.MouseEvent) =>
        this.props.onMouseStart(e, this.props.index),
      onTouchStart: (e: React.TouchEvent) =>
        this.props.onTouchStart(e, this.props.index)
    };
    const renderGhostProps = {
      ...baseRenderProps,
      ref: this.ghostRef,
      style: {
        ...baseRenderProps.style,
        display: 'block',
        position: 'fixed',
        top: this.props.ghostItemStyle.top,
        left: this.props.ghostItemStyle.left,
        width: this.props.ghostItemStyle.width,
        height: this.props.ghostItemStyle.height
      } as React.CSSProperties
    };
    return (
      <React.Fragment>
        {this.props.render(renderItemProps)}
        {this.props.isDragged &&
          ReactDOM.createPortal(
            this.props.renderGhost(renderGhostProps),
            document.body
          )}
      </React.Fragment>
    );
  }
}

export default Item;