import React from 'react';
import {connect} from 'react-redux';

import {changeFind, changeReplace, addReplacement, removeReplacement } from '../actions';

const Replacements = ({ replacements, find, replace, changeFind, changeReplace, addReplacement, removeReplacement }) => {
  return <div>
    <h2>Find/replace</h2>
    <table>
      <thead>
        <tr>
          <th>Find</th>
          <th>Replace</th>
        </tr>
      </thead>
      <tbody>
        {replacements.map((replacement, index) => {
          return <tr key={`replacement-${index}`}>
            <td>{replacement.find}</td>
            <td>{replacement.replace}</td>
            <td><a href="#delete" style={{ color: 'black', textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); removeReplacement(index)}}>X</a></td>
          </tr>
        })}
        <tr>
          <td><input type="text" value={find} onChange={(e) => changeFind(e.target.value)} /></td>
          <td><input type="text" value={replace} onChange={(e) => changeReplace(e.target.value)} /></td>
          <td><button onClick={() => addReplacement()}>Add</button></td>
        </tr>
      </tbody>



    </table>

  </div>
}

const mapStateToProps = (state) => {
  return {
    replacements: state.replacements.replacements,
    find: state.replacements.find,
    replace: state.replacements.replace
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFind: (value) => {
      dispatch(changeFind(value));
    },
    changeReplace: (value) => {
      dispatch(changeReplace(value));
    },
    addReplacement: () => {
      dispatch(addReplacement());
    },
    removeReplacement: (index) => {
      dispatch(removeReplacement(index));
    },
    editReplacement: (index, find, replace) => {

    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Replacements);
