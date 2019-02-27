
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CheckboxList from "./CheckboxList";
import Pagination from "./Pagination";

const styles = () => ({
  root: {
    marginTop: '10px',
  }
});

const ResultList = ({
  classes,
  results,
  pinnedList,
  handlePinnedList,
  currentPage,
  allPages,
  total,
  handlePage,
}) => (
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
  );

export default withStyles(styles)(ResultList);
