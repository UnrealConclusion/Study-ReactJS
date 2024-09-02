import { memo } from 'react';
import PropTypes from 'prop-types';

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);

ToggleSounds.propTypes = {
  allowSound: PropTypes.bool,
  setAllowSound: PropTypes.func
}