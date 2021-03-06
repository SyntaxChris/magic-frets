import { connect } from 'react-redux'
import FretboardMatrix from './FretboardMatrix'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  return {
    tuning: state.fretboardMatrix.tunings.standardE
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FretboardMatrix)
