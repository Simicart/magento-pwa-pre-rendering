import React from 'react';
import Abstract from './Abstract';
import Identify from "../../../../../Helper/Identify";
class Time extends Abstract {
    state = {
        time : null,
    };

    handleChangeTimePicker = (event, time) => {
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
        return null
        // return (
        //     <MuiThemeProvider muiTheme={muiTheme}>
        //         <TimePicker
        //             format="ampm"
        //             hintText={Identify.__('Select time') + ": --:-- --"}
        //             value={this.state.time}
        //             onChange={this.handleChangeTimePicker}
        //             textFieldStyle={{
        //                 fontFamily : 'Montserrat, sans-serif',
        //                 color : 'rgba(0, 0, 0, 0.87)'
        //             }}
        //         />
        //     </MuiThemeProvider>
        //
        // )
    }

    render(){
        return this.renderTimePicker()
    }
}
export default Time;