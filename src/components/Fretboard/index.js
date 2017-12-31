import { connect } from 'react-redux'
import Fretboard from './Fretboard'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const { activeNotes, currentTuning } = state.fretboardMatrix
  const tuning = state.fretboardMatrix.tunings[currentTuning]

  return {
    frettedNotes: activeNotes.frettedNotes,
    tuning
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fretboard)
