import React from 'react';
import Abstract from './Abstract';
import Identify from "../../../../../Helper/Identify";
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
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
            MuiPickersCalendarHeader : {
                dayLabel : {
                    fontSize : 14
                }
            }
        }
    }}
class Time extends Abstract {
    state = {
        time : null,
    };

    handleChangeTimePicker = (time) => {
        this.setState({time});
        if(time){
            let val = this.convertTime(time);
            let key = this.key;
            if(this.props.datetime){
                let datetime = this.props.parent.selected[key];
                if(datetime instanceof Object){
                    val = {...datetime,...val};
                }
            }
            console.log(val)
            this.updateSelected(key,val);
        }else{
            this.deleteSelected()
        }
    };

    convertTime = (time) => {
      let h = time.getHours();
      let day_part = 'am';
      console.log(h);
      if(h >= 12){
        day_part = 'pm';
        h = h > 12 ? h - 12 : h;
      }
      h = h < 10 ? '0' + h : h.toString();
      let m = time.getMinutes();
      m = m < 10 ? '0' + m : m.toString();
      return {
          hour : h,
          minute : m,
          day_part
      }
    };

    renderTimePicker = () => {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                        className="date-picker"
                        ampm
                        placeholder={Identify.__('Select time') + ": --:-- --"}
                        value={this.state.time}
                        onChange={this.handleChangeTimePicker}
                        format="HH:mm a"
                        margin="normal"
                    />
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        )
    }

    render(){
        return this.renderTimePicker()
    }
}
export default Time;