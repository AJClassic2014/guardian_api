
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CheckboxList from "./CheckboxList";
import Pagination from "./Pagination";

const styles = theme => ({
  root: {
    marginTop: '10px',
  }
});

class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      classes,
      results,
      pinnedList,
      handlePinnedList,
      currentPage,
      allPages,
      total,
      handlePage,
    } = this.props;
    return (
      <div className={classes.root}>
        <CheckboxList
          results={results}
          pinnedList={pinnedList}
          handlePinnedList={handlePinnedList}
        />
        <Pagination
          currentPage={currentPage}
          allPages={allPages}
          total={total}
          handlePage={handlePage}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ResultList);
