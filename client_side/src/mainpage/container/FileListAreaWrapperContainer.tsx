import React, { Component } from 'react'
import {connect} from 'react-redux'
import {WholeStateInRedux} from '../../reducers'
import FileListArea from '../components/FileListArea'

interface OwnProps {

}

interface DispatchProps {

}

interface AppStateProps {
  selectedFilesPath: string,
}

type MergedProps = OwnProps & DispatchProps & AppStateProps

class FileListAreaWrapperContainer extends Component<MergedProps> {

  constructor(props: MergedProps) {
    super(props);
  }

  render() {

    const { selectedFilesPath } = this.props
    return (
      <div>
        <FileListArea fileList={selectedFilesPath} />
      </div>
    )
  }
}

const mapStateToProps = ({ selectedFilesPath }: WholeStateInRedux):AppStateProps => {

  return { selectedFilesPath: selectedFilesPath.filePaths}
}

export default connect<AppStateProps, DispatchProps, OwnProps>(mapStateToProps, null)(FileListAreaWrapperContainer)
