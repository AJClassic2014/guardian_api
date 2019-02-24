 
import React from "react";
//import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
//import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
//import {FlatButton, Toolbar, ToolbarGroup} from "material-ui";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    root: {
      width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
      },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    
  });
 
class Pagination extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
           // page: 1
        }
        this.setPage = this.setPage.bind(this);
    }
 
    setPage = (page) => {
        // this.setState({
        //     page
        // },()=>{this.props.onChange(page)})
        this.props.handlePage(page);
    }
 
    render() {
        const {total, 
            classes,
            currentPage,
            allPages
        } = this.props;
       // const {page} = this.state;
       // const allPages = Math.ceil(total / 10) || 1;
        return (
            allPages > 1 &&
            <Toolbar className={classes.root}>
                    <div style={{color: 'black'}}>
                        {
                            `${(currentPage - 1) * 10 + 1}-${currentPage * 10} of ${total}`
                        }
                    </div>
                    <div style={{marginLeft: '200px'}}>
                        {
                            // <FlatButton primary key="prev" label="上一页" icon={<ChevronLeft/>}
                            //             disabled={page <= 1}
                            //             onClick={() => this.setPage(page - 1)}/>
                             <Button 
                             size="small" 
                             className={classes.margin}  
                             onClick={() => this.setPage(currentPage - 1)}
                             disabled={currentPage <= 1}
                             >
                                        Prev
                            </Button>
                        }
                        {
                            `Current Page：${currentPage}`
                        }
                        {
                            // <FlatButton primary key="next" label="下一页" icon={<ChevronRight/>}
                            //             disabled={page === allPage}
                            //             onClick={() => this.setPage(page + 1)} labelPosition="before"/>
                            <Button 
                            size="small" 
                            className={classes.margin}  
                            onClick={() => this.setPage(currentPage + 1)}
                            disabled={currentPage === allPages}
                            >
                                        Next
                            </Button>
                        }
                    </div>
            </Toolbar>
        )
    }
}
 
//export default Pagination
export default withStyles(styles)(Pagination);
