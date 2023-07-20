import React from "react";
import { useState } from 'react';

const MoodSelection = () => {
  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['Dance','Happy', 'Sad', 'Energetic', 'Relaxed', 'Work-Out'];

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <div>
      <h2>Select your mood:</h2>
      <ul>
        {moods.map((mood) => (
          <li className="MoodList"
            key={mood}
            onClick={() => handleMoodSelection(mood)}
            type="None"
            style={{fontWeight: selectedMood === mood ? 'bold' : 'normal' }}
          >
            {mood}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodSelection;