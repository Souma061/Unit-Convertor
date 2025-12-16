import useCanvasCursor from '../hooks/useCanvasCursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      className='fixed top-0 left-0 pointer-events-none z-50'
      id='canvas'
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default CanvasCursor;
