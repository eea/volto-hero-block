import React from 'react';
import { render, act } from '@testing-library/react';
import { useFirstVisited } from './hooks';

let observerCallback;
let observeMock = jest.fn();
let unobserveMock = jest.fn();
let disconnectMock = jest.fn();
window.IntersectionObserver = jest.fn((callback) => {
  observerCallback = callback;
  return {
    observe: observeMock,
    unobserve: unobserveMock,
    disconnect: disconnectMock,
  };
});

describe('useFirstVisited', () => {
  beforeEach(() => {
    observeMock.mockClear();
    unobserveMock.mockClear();
    disconnectMock.mockClear();
  });

  it('should observe and unobserve the ref element', () => {
    const ref = { current: {} };
    const rootMargin = '10px';

    const TestComponent = () => {
      const intersected = useFirstVisited(ref, rootMargin);
      return <div>{intersected ? 'Intersected' : 'Not Intersected'}</div>;
    };

    const { container, unmount } = render(<TestComponent />);

    // Initial render: Not Intersected
    expect(container.textContent).toBe('Not Intersected');

    // Simulate the element becoming visible in the viewport
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    // Re-render: Intersected
    expect(container.textContent).toBe('Intersected');

    // Unmount the component
    unmount();

    // Observer should be unobserved and disconnected
    expect(unobserveMock).toHaveBeenCalled();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('should stay intersected once it becomes true', () => {
    const ref = { current: {} };

    const TestComponent = () => {
      const intersected = useFirstVisited(ref);
      return <div>{intersected ? 'Intersected' : 'Not Intersected'}</div>;
    };

    const { container } = render(<TestComponent />);

    // Initial render: Not Intersected
    expect(container.textContent).toBe('Not Intersected');

    // Simulate the element becoming visible in the viewport
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    // Re-render: Intersected
    expect(container.textContent).toBe('Intersected');

    // Once intersected is true, it should stay true regardless of further callbacks
    // The hook should not set up a new observer when intersected is already true
    expect(container.textContent).toBe('Intersected');
  });
});
