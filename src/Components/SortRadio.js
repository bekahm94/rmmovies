import React from 'react';

class SortRadio extends React.Component {
  render(){
    return (
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Sort by Popularity?</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="radio">
                <input type="radio" name="sort" value="Most Popular" checked={this.props.checked === 'Most Popular'} onChange={this.props.handleChange}/>
                  Most Popular
              </label>
              <label className="radio">
                <input type="radio" name="sort" value="Least Popular" checked={this.props.checked === 'Least Popular'} onChange={this.props.handleChange}/>
                  Least Popular
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SortRadio;
