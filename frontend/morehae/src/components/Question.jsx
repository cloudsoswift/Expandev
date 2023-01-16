const Question = () => {
  return (
    <div className="justify-self-center h-full w-full text-center text-2xl grid">
      <div className="border-2 w-2/3 p-4 rounded-lg shadow-md bg-white">
        웹 페이지는 어떻게 만드는 걸까?
      </div>
      <div className="justify-self-end border-2 w-32 h-32 mt-4 bg-white">
        <img className="align-middle rounded-xl" alt="confused person" src={require('../img/confused.png')} />
      </div>
    </div>
  );
};

export default Question;
