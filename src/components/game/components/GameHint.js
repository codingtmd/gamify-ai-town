import "./gamehint.css";

const GameHint = ({ gameSize, hintText }) => {
  const { width, height, multiplier } = gameSize;

  const left = window.innerWidth - width * multiplier;

  const handleButton0Click = () => {
    const customEvent = new CustomEvent("heroRandomMove", {});
    window.dispatchEvent(customEvent);
  };

  const handleButton2Click = () => {
    const customEvent = new CustomEvent("chatHistory", {});
    window.dispatchEvent(customEvent);
  };

  const handleLinkClick = () => {
    window.open("https://github.com/RPGGO-AI/demo-ai-town", "_blank");
  };

  return (
    <div
      className="hintContainer"
      style={{
        top: `${16 * multiplier}px`,
        left: `${16 * multiplier + left / 2}px`,
      }}
    >
      <div
        onClick={handleLinkClick}
        style={{
          width: `${256 * multiplier}px`,
          height: `${16 * multiplier}px`,
          fontSize: `${8 * multiplier}px`,
          cursor: "pointer",
        }}
      >
        {hintText}
      </div>
      <button
        onClick={handleButton0Click}
        className="hintButton"
        style={{
          fontSize: `${6 * multiplier}px`,
          left: `${1 * multiplier}px`,
          top: `${13 * multiplier}px`,
        }}
      >
        Hang out
      </button>
      <button
        onClick={handleButton2Click}
        className="hintButton"
        style={{
          fontSize: `${6 * multiplier}px`,
          left: `${1 * multiplier}px`,
          top: `${41 * multiplier}px`,
        }}
      >
        Conversations
      </button>
    </div>
  );
};

export default GameHint;
