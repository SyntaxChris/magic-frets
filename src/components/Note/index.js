import { connect } from 'react-redux'
import Note from './Note'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const { activeNotes, currentTuning } = state.fretboardMatrix
  const { barredFrets, frettedNotes } = activeNotes
  const tuning = state.fretboardMatrix.tunings[currentTuning]

  return {
    barredFrets,
    frettedNotes,
    tuning
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
