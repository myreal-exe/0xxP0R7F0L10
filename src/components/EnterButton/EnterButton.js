// Fonts
import '../../fonts/bitcell_memesbruh03.ttf';
import '../../fonts/BitMap.ttf';
import '../../fonts/bitlow.ttf';
import '../../fonts/bitbox.ttf';
import '../../fonts/BitMicro01.ttf';
import '../../fonts/BitBold.ttf';


import './EnterButton.css';

function EnterButton( { onClick, text }) {
  return (
    <div>
        <button onClick={onClick} className="EnterButton">
        <h2 className="glitch hero layers" data-text={text}>
            <span>{text}</span>
        </h2>
        </button>
    </div>
  );
}

export default EnterButton;
