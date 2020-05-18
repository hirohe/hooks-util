import React, { useEffect } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import useKeyPress from '../es/useKeyPress';

const ENTER_KEY_CODE = 13;

describe('useKeyPress', () => {

  interface TestComponentProps {
    onPressed: () => void;
  }
  const TestComponent: React.FC<TestComponentProps> = ({ onPressed }) => {
    const [enterKeyPressed, unsubscribe] = useKeyPress(ENTER_KEY_CODE);

    useEffect(() => {
      if (enterKeyPressed) onPressed();
    }, [enterKeyPressed]);

    return <div>{enterKeyPressed ? 'pressed' : 'unpressed'}</div>
  }

  it('listen key press event', () => {
    const onPressed = jest.fn();
    const testComponent = render(<TestComponent onPressed={onPressed} />);
    expect(testComponent.getByText('unpressed')).not.toBeNull();

    fireEvent.keyDown(testComponent.container, { keyCode: ENTER_KEY_CODE });
    waitFor(() => {
      expect(onPressed).toBeCalled();
      expect(testComponent.getByText('pressed')).not.toBeNull();
    });
    fireEvent.keyUp(testComponent.container, { keyCode: ENTER_KEY_CODE });
    waitFor(() => {
      expect(testComponent.getByText('unpressed')).not.toBeNull();
    });
  });
});
