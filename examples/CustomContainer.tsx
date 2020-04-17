import * as React from 'react';
import { List, arrayMove } from '../src/index';

const Basic: React.FC<{
  container: Element;
}> = (props) => {
  const { container } = props;
  const [items, setItems] = React.useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  console.log(container);

  return (
    <div
      style={{
        maxWidth: '300px',
        margin: '0px auto',
        backgroundColor: '#F7F7F7',
        padding: '3em'
      }}
    >
      <div>
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) =>
            setItems(arrayMove(items, oldIndex, newIndex))
          }
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{
                padding: 0,
                cursor: isDragged ? 'grabbing' : undefined
              }}
            >
              {children}
            </ul>
          )}
          renderItem={({ value, props, isDragged, isSelected }) => (
            <li
              {...props}
              style={{
                ...props.style,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
              }}
            >
              {value}
            </li>
          )}
          container={container}
        />
      </div>
    </div>
  );
};

const CustomContainer: React.FC = () => {
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [container, setContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    setContainer(wrapper.current);
  }, [wrapper, container]);

  return (
    <div className="wrapper" ref={wrapper}>
      {container && <Basic container={container} />}
    </div>
  );
};

export default CustomContainer;
