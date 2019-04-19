import React from 'react';
import Abstract from './Abstract';
import Identify from "../../../../../Helper/Identify";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider} from '@material-ui/core/styles';
import getPageContext from '../../../../../Helper/PageContext'
let theme = {
    ...getPageContext().theme,
    overrides : {
        ...getPageContext().theme.overrides,
        ...{
            MuiPickersDay: {
                day: {
                    fontSize: 14
                }
            },
            MuiTypography: {
                body1: {
                    fontSize: 16
                }
            },
            MuiPickersToolbarButton : {
                toolbarBtn : {
                    fontSize : 18
                }
            },
            MuiPickersCalendarHeader : {
                dayLabel : {
                    fontSize : 14
                }
            }
        }
    }}
class DateField extends Abstract {

    constructor(props){
        super(props);
        this.state = {
            date : null
        }
    }

    handleChange = (date) => {
        this.setState({
            date: date,
        });
        if(date){
            let key = this.key;
            let value = this.convertDate(date);
            if(this.props.datetime){
                let datetime = this.props.parent.selected[key];
                if(datetime instanceof Object){
                    value = {...datetime,...value};
                }
            }
            this.props.parent.updateOptions(key,value);
        }else{
            this.deleteSelected(this.key);
        }
    };

    convertDate = (date) => {
        let d = date.getDate();
        let m = date.getMonth() + 1;
        m = m < 10 ? "0"+m : m;
        let y = date.getFullYear();
        return {
            year : y,
            month : parseInt(m,10),
            day : d
        }
    };

    formatDate = (date) =>{
        let m = date.getMonth() + 1;
        m = m < 10 ? "0"+m : m;
        if(Identify.isRtl()){
            date = date.getFullYear() + '/' + m + '/' + date.getDate() ;
            return date;
        }
        date = date.getDate() + '/' + m + '/' + date.getFullYear()
        return date;
    };

    renderDate = ()=> {
        let text = Identify.isRtl() ? 'yyyy/mm/dd' : 'dd/mm/yyyy';
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        className={`date-picker`}
                        placeholder={Identify.__('Select date ') + text}
                        style={{
                            fontSize:16,
                        }}
                        value={this.state.date}
                        clearable
                        views={["year", "month", "day"]}
                        animateYearScrolling
                        format={`dd/MM/yyyy`}
                        onChange={this.handleChange}
                        margin="normal"
                        minDate={new Date()}
                    />
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>

        )
    }

    render(){
        return this.renderDate();
    }
}
export default DateField;