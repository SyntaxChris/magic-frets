import { connect } from 'react-redux'
import Note from './Note'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const { activeNotes, currentTuning } = state.fretboardMatrix
  const tuning = state.fretboardMatrix.tunings[currentTuning]

  return { activeNotes, tuning }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
