import React, { Component, ReactHTMLElement } from 'react'
import {connect} from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import {WholeStateInRedux} from '../../reducers'
import FileListArea from '../components/FileListArea'
import mainPageActions from '../actions'
import { FilesPathModifierAction } from '../../reducers/__reducers/filePathsReducer'


const { updateFilesPaths } = mainPageActions
interface OwnProps {

}

interface DispatchProps {
  updateFilesPaths: (evtValue:string) => FilesPathModifierAction
}

interface AppStateProps {
  selectedFilesPath: string,
}

type MergedProps = OwnProps & DispatchProps & AppStateProps

class FileListAreaWrapperContainer extends Component<MergedProps> {

  constructor(props: MergedProps) {
    super(props);
  }


  handleOnTextAreaChange = (evt: React.FormEvent<HTMLTextAreaElement>) => {

     this.props.updateFilesPaths(evt.currentTarget.value)
  }

  render() {

    const { selectedFilesPath } = this.props
    return (
      <div>
        <FileListArea fileList={selectedFilesPath} handleTextInputChange={this.handleOnTextAreaChange} />
      </div>
    )
  }
}

const mapStateToProps = ({ selectedFilesPath }: WholeStateInRedux):AppStateProps => {

  return { selectedFilesPath: selectedFilesPath.filePaths}
}

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators(
    {
      updateFilesPaths,
    },
    dispatch)
)

export default connect<AppStateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(FileListAreaWrapperContainer)
