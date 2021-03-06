// ------------------------------------
// Actions
// ------------------------------------
// export function increment (value = 1) {
//   return {
//     type    : COUNTER_INCREMENT,
//     payload : value
//   }
// }

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : COUNTER_DOUBLE_ASYNC,
//           payload : getState().counter
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  // increment,
  // doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  // [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  currentTuning: 'standardE',
  tunings: {
    standardE: [
      [
        { value : 'E', frequency: 329.6 },
        { value : 'F', frequency: 349.2 },
        { value : 'F#', frequency: 370 },
        { value : 'G', frequency: 392 },
        { value : 'G#', frequency: 415.3 },
        { value : 'A', frequency: 440 },
        { value : 'A#', frequency: 466.2 },
        { value : 'B', frequency: 493.9 },
        { value : 'C', frequency: 523.3 },
        { value : 'C#', frequency: 554.4 },
        { value : 'D', frequency: 587.3 },
        { value : 'D#', frequency: 622.3 },
        { value : 'E', frequency: 659.3 },
        { value : 'F', frequency: 698.5 },
        { value : 'F#', frequency: 740 },
        { value : 'G', frequency: 784 },
        { value : 'G#', frequency: 830.6 },
        { value : 'A', frequency: 880 },
        { value : 'A#', frequency: 932.3 },
        { value : 'B', frequency: 987.8 },
        { value : 'C', frequency: 1046.5 },
        { value : 'C#', frequency: 1108.7 },
        { value : 'D', frequency: 1174.7 },
        { value : 'D#', frequency: 1244.5 },
        { value : 'E', frequency: 1318.5 }
      ],
      [
        { value : 'B', frequency: 246.9 },
        { value : 'C', frequency: 261.6 },
        { value : 'C#', frequency: 277.2 },
        { value : 'D', frequency: 293.7 },
        { value : 'D#', frequency: 311.1 },
        { value : 'E', frequency: 329.6 },
        { value : 'F', frequency: 349.2 },
        { value : 'F#', frequency: 370 },
        { value : 'G', frequency: 392 },
        { value : 'G#', frequency: 415.3 },
        { value : 'A', frequency: 440 },
        { value : 'A#', frequency: 466 },
        { value : 'B', frequency: 493.9 },
        { value : 'C', frequency: 523.3 },
        { value : 'C#', frequency: 554.4 },
        { value : 'D', frequency: 587.3 },
        { value : 'D#', frequency: 622.3 },
        { value : 'E', frequency: 659.3 },
        { value : 'F', frequency: 698.5 },
        { value : 'F#', frequency: 740 },
        { value : 'G', frequency: 784 },
        { value : 'G#', frequency: 830.6 },
        { value : 'A', frequency: 880 },
        { value : 'A#', frequency: 932.3 },
        { value : 'B', frequency: 987.8 }
      ],
      [
        { value: 'G', frequency: 196 },
        { value: 'G#', frequency: 207.7 },
        { value: 'A', frequency: 220 },
        { value: 'A#', frequency: 233.1 },
        { value: 'B', frequency: 247 },
        { value: 'C', frequency: 261.7 },
        { value: 'C#', frequency: 277.9 },
        { value: 'D', frequency: 293.7 },
        { value: 'D#', frequency: 311.1 },
        { value: 'E', frequency: 329.6 },
        { value: 'F', frequency: 349.2 },
        { value: 'F#', frequency: 370 },
        { value: 'G', frequency: 392 },
        { value: 'G#', frequency: 415.3 },
        { value: 'A', frequency: 440 },
        { value: 'A#', frequency: 466.2 },
        { value: 'B', frequency: 493.9 },
        { value: 'C', frequency: 523.3 },
        { value: 'C#', frequency: 554.4 },
        { value: 'D', frequency: 587.3 },
        { value: 'D#', frequency: 622.3 },
        { value: 'E', frequency: 659.3 },
        { value: 'F', frequency: 698.5 },
        { value: 'F#', frequency: 740 },
        { value: 'G', frequency: 784 }
      ],
      [
        { value : 'D', frequency: 146.83 },
        { value : 'D#', frequency: 155.56 },
        { value : 'E', frequency: 164.81 },
        { value : 'F', frequency: 174.61 },
        { value : 'F#', frequency: 185.00 },
        { value : 'G', frequency: 196.00 },
        { value : 'G#', frequency: 207.65 },
        { value : 'A', frequency: 220.00 },
        { value : 'A#', frequency: 233.08 },
        { value : 'B', frequency: 246.94 },
        { value : 'C', frequency: 261.63 },
        { value : 'C#', frequency: 277.18 },
        { value : 'D', frequency: 293.67 },
        { value : 'D#', frequency: 311.13 },
        { value : 'E', frequency: 329.63 },
        { value : 'F', frequency: 349.23 },
        { value : 'F#', frequency: 369.99 },
        { value : 'G', frequency: 392.00 },
        { value : 'G#', frequency: 415.30 },
        { value : 'A', frequency: 440 },
        { value : 'A#', frequency: 466.16 },
        { value : 'B', frequency: 493.88 },
        { value : 'C', frequency: 523.25 },
        { value : 'C#', frequency: 554.37 },
        { value : 'D', frequency: 587.33 }
      ],
      [
        { value : 'A', frequency: 110.00 },
        { value : 'A#', frequency: 116.54 },
        { value : 'B', frequency: 123.47 },
        { value : 'C', frequency: 130.81 },
        { value : 'C#', frequency: 138.59 },
        { value : 'D', frequency: 146.83 },
        { value : 'D#', frequency: 155.56 },
        { value : 'E', frequency: 164.81 },
        { value : 'F', frequency: 174.61 },
        { value : 'F#', frequency: 185.00 },
        { value : 'G', frequency: 196.00 },
        { value : 'G#', frequency: 207.65 },
        { value : 'A', frequency: 220.00 },
        { value : 'A#', frequency: 233.08 },
        { value : 'B', frequency: 246.94 },
        { value : 'C', frequency: 261.63 },
        { value : 'C#', frequency: 277.18 },
        { value : 'D', frequency: 293.67 },
        { value : 'D#', frequency: 311.13 },
        { value : 'E', frequency: 329.63 },
        { value : 'F', frequency: 349.23 },
        { value : 'F#', frequency: 369.99 },
        { value : 'G', frequency: 392.00 },
        { value : 'G#', frequency: 415.30 },
        { value : 'A', frequency: 440 }
      ],
      [
        { value: 'E', frequency: 82.4 },
        { value: 'F', frequency: 87.3 },
        { value: 'F#', frequency: 92.5 },
        { value: 'G', frequency: 98.0 },
        { value: 'G#', frequency: 103.8 },
        { value: 'A', frequency: 110.0 },
        { value: 'A#', frequency: 116.5 },
        { value: 'B', frequency: 123.5 },
        { value: 'C', frequency: 130.8 },
        { value: 'C#', frequency: 138.6 },
        { value: 'D', frequency: 146.8 },
        { value: 'D#', frequency: 155.6 },
        { value: 'E', frequency: 164.8 },
        { value: 'F', frequency: 174.6 },
        { value: 'F#', frequency: 185.0 },
        { value: 'G', frequency: 196.0},
        { value: 'G#', frequency: 207.65 },
        { value: 'A', frequency: 220.00 },
        { value: 'A#', frequency: 233.08 },
        { value: 'B', frequency: 246.94 },
        { value: 'C', frequency: 261.63 },
        { value: 'C#', frequency: 277.18 },
        { value: 'D', frequency: 293.67 },
        { value: 'D#', frequency: 311.13 },
        { value: 'E', frequency: 329.63 }
      ]
    ]
  },
  activeNotes: {
    frettedNotes: [
      // index 0 = fret position, index 1 = finger position
      [3, 1],
      [3, 1],
      [4, 2],
      [5, 3],
      [5, 4],
      [3, 1]
    ]
  }
}

export default function fretboardMatrixReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}